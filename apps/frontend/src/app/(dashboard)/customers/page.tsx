'use client';

import CustomerModal from '@/components/features/CustomerModal';
import { customersService } from '@/services/customers.service';
import { Customer } from '@/types/customers';
import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
        null,
    );

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const data = search
                ? await customersService.search(search)
                : await customersService.findAll();
            setCustomers(data);
        } catch (error) {
            console.error('Failed to fetch customers', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchCustomers();
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this customer?')) {
            await customersService.remove(id);
            fetchCustomers();
        }
    };

    const handleEdit = (customer: Customer) => {
        setSelectedCustomer(customer);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setSelectedCustomer(null);
        setIsModalOpen(true);
    };

    const handleSave = async (data: any) => {
        if (selectedCustomer) {
            await customersService.update(selectedCustomer.id, data);
        } else {
            await customersService.create(data);
        }
        fetchCustomers();
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
                <button
                    onClick={handleAdd}
                    className="flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Customer
                </button>
            </div>

            <div className="relative max-w-md">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Search customers..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Phone
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Status
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-6 py-4 text-center text-sm text-gray-500"
                                >
                                    Loading...
                                </td>
                            </tr>
                        ) : customers.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-6 py-4 text-center text-sm text-gray-500"
                                >
                                    No customers found.
                                </td>
                            </tr>
                        ) : (
                            customers.map((customer) => (
                                <tr key={customer.id}>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            {customer.firstName}{' '}
                                            {customer.lastName}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        {customer.email}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        {customer.phone}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${customer.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                        >
                                            {customer.isActive
                                                ? 'Active'
                                                : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium space-x-2">
                                        <button
                                            onClick={() => handleEdit(customer)}
                                            className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(customer.id)
                                            }
                                            className="text-red-600 hover:text-red-900 inline-flex items-center"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <CustomerModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedCustomer(null);
                }}
                onSave={handleSave}
                customer={selectedCustomer}
            />
        </div>
    );
}
