'use client';

import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Modal from '@/components/organisms/Modal';
import {
    CreateCustomerDto,
    Customer,
    UpdateCustomerDto,
} from '@/types/customers';
import { useEffect, useState } from 'react';

interface CustomerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: CreateCustomerDto | UpdateCustomerDto) => Promise<void>;
    customer?: Customer | null;
}

export default function CustomerModal({
    isOpen,
    onClose,
    onSave,
    customer,
}: CustomerModalProps) {
    const [formData, setFormData] = useState<CreateCustomerDto>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        description: '',
        isActive: true,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (customer) {
            setFormData({
                firstName: customer.firstName,
                lastName: customer.lastName,
                email: customer.email,
                phone: customer.phone,
                address: customer.address || '',
                description: customer.description || '',
                isActive: customer.isActive,
            });
        } else {
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: '',
                description: '',
                isActive: true,
            });
        }
    }, [customer, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave(formData);
            onClose();
        } catch (error) {
            console.error('Failed to save customer', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]:
                type === 'checkbox'
                    ? (e.target as HTMLInputElement).checked
                    : value,
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={customer ? 'Edit Customer' : 'Add Customer'}
            size="lg"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name
                        </label>
                        <Input
                            name="firstName"
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="John"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name
                        </label>
                        <Input
                            name="lastName"
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Doe"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <Input
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                    </label>
                    <Input
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
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
                        placeholder="123 Main St, City, State"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                    </label>
                    <textarea
                        name="description"
                        className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        rows={3}
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Additional notes..."
                    />
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="isActive"
                        id="isActive"
                        checked={formData.isActive}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                        htmlFor="isActive"
                        className="ml-2 text-sm text-gray-700"
                    >
                        Active Customer
                    </label>
                </div>

                <div className="flex gap-3 pt-4">
                    <Button type="submit" disabled={loading} className="flex-1">
                        {loading
                            ? 'Saving...'
                            : customer
                              ? 'Update Customer'
                              : 'Add Customer'}
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
