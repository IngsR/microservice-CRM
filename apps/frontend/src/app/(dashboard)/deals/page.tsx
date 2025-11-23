'use client';

import DealModal from '@/components/features/DealModal';
import { dealsService } from '@/services/deals.service';
import { Deal } from '@/types/deals';
import { DollarSign, Edit, Plus, Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DealsPage() {
    const [deals, setDeals] = useState<Deal[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

    const fetchDeals = async () => {
        try {
            setLoading(true);
            const data = search
                ? await dealsService.search(search)
                : await dealsService.findAll();
            setDeals(data);
        } catch (error) {
            console.error('Failed to fetch deals', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchDeals();
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this deal?')) {
            await dealsService.remove(id);
            fetchDeals();
        }
    };

    const handleEdit = (deal: Deal) => {
        setSelectedDeal(deal);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setSelectedDeal(null);
        setIsModalOpen(true);
    };

    const handleSave = async (data: any) => {
        if (selectedDeal) {
            await dealsService.update(selectedDeal.id, data);
        } else {
            await dealsService.create(data);
        }
        fetchDeals();
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'WON':
                return 'bg-green-100 text-green-800';
            case 'LOST':
                return 'bg-red-100 text-red-800';
            case 'NEGOTIATION':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-blue-100 text-blue-800';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Deals</h1>
                <button
                    onClick={handleAdd}
                    className="flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Deal
                </button>
            </div>

            <div className="relative max-w-md">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Search deals..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {loading ? (
                    <p className="text-gray-500">Loading deals...</p>
                ) : deals.length === 0 ? (
                    <p className="text-gray-500">No deals found.</p>
                ) : (
                    deals.map((deal) => (
                        <div
                            key={deal.id}
                            className="overflow-hidden rounded-lg bg-white shadow"
                        >
                            <div className="p-5">
                                <div className="flex items-center justify-between">
                                    <span
                                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(deal.status)}`}
                                    >
                                        {deal.status}
                                    </span>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEdit(deal)}
                                            className="text-gray-400 hover:text-indigo-600"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(deal.id)
                                            }
                                            className="text-gray-400 hover:text-red-600"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                                        {deal.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                                        {deal.description}
                                    </p>
                                </div>
                                <div className="mt-4 flex items-center text-sm font-medium text-gray-900">
                                    <DollarSign className="mr-1 h-4 w-4 text-gray-400" />
                                    {new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    }).format(deal.value)}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <DealModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedDeal(null);
                }}
                onSave={handleSave}
                deal={selectedDeal}
            />
        </div>
    );
}
