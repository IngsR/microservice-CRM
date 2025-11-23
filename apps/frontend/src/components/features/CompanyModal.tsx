'use client';

import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Modal from '@/components/organisms/Modal';
import { Company, CreateCompanyDto, UpdateCompanyDto } from '@/types/companies';
import { useEffect, useState } from 'react';

interface CompanyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: CreateCompanyDto | UpdateCompanyDto) => Promise<void>;
    company?: Company | null;
}

export default function CompanyModal({
    isOpen,
    onClose,
    onSave,
    company,
}: CompanyModalProps) {
    const [formData, setFormData] = useState<CreateCompanyDto>({
        name: '',
        industry: '',
        website: '',
        address: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (company) {
            setFormData({
                name: company.name,
                industry: company.industry,
                website: company.website || '',
                address: company.address || '',
            });
        } else {
            setFormData({
                name: '',
                industry: '',
                website: '',
                address: '',
            });
        }
    }, [company, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave(formData);
            onClose();
        } catch (error) {
            console.error('Failed to save company', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={company ? 'Edit Company' : 'Add Company'}
            size="lg"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                    </label>
                    <Input
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Acme Corp"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Industry
                    </label>
                    <Input
                        name="industry"
                        type="text"
                        required
                        value={formData.industry}
                        onChange={handleChange}
                        placeholder="Technology, Healthcare, etc."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Website
                    </label>
                    <Input
                        name="website"
                        type="url"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://example.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                    </label>
                    <Input
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="123 Business Ave, City, State"
                    />
                </div>

                <div className="flex gap-3 pt-4">
                    <Button type="submit" disabled={loading} className="flex-1">
                        {loading
                            ? 'Saving...'
                            : company
                              ? 'Update Company'
                              : 'Add Company'}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        className="flex-1"
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
