'use client';

import CompanyModal from '@/components/features/CompanyModal';
import { companiesService } from '@/services/companies.service';
import { Company } from '@/types/companies';
import { Edit, Globe, Plus, Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CompaniesPage() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(
        null,
    );

    const fetchCompanies = async () => {
        try {
            setLoading(true);
            const data = search
                ? await companiesService.search(search)
                : await companiesService.findAll();
            setCompanies(data);
        } catch (error) {
            console.error('Failed to fetch companies', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchCompanies();
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this company?')) {
            await companiesService.remove(id);
            fetchCompanies();
        }
    };

    const handleEdit = (company: Company) => {
        setSelectedCompany(company);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setSelectedCompany(null);
        setIsModalOpen(true);
    };

    const handleSave = async (data: any) => {
        if (selectedCompany) {
            await companiesService.update(selectedCompany.id, data);
        } else {
            await companiesService.create(data);
        }
        fetchCompanies();
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
                <button
                    onClick={handleAdd}
                    className="flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Company
                </button>
            </div>

            <div className="relative max-w-md">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Search companies..."
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
                                Industry
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Website
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
                                    colSpan={4}
                                    className="px-6 py-4 text-center text-sm text-gray-500"
                                >
                                    Loading...
                                </td>
                            </tr>
                        ) : companies.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-6 py-4 text-center text-sm text-gray-500"
                                >
                                    No companies found.
                                </td>
                            </tr>
                        ) : (
                            companies.map((company) => (
                                <tr key={company.id}>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            {company.name}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {company.address}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        {company.industry}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        {company.website && (
                                            <a
                                                href={company.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center text-indigo-600 hover:text-indigo-900"
                                            >
                                                <Globe className="mr-1 h-4 w-4" />
                                                Visit
                                            </a>
                                        )}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium space-x-2">
                                        <button
                                            onClick={() => handleEdit(company)}
                                            className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(company.id)
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

            <CompanyModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedCompany(null);
                }}
                onSave={handleSave}
                company={selectedCompany}
            />
        </div>
    );
}
