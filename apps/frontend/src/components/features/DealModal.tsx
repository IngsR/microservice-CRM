'use client';

import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Modal from '@/components/organisms/Modal';
import { CreateDealDto, Deal, UpdateDealDto } from '@/types/deals';
import { useEffect, useState } from 'react';

interface DealModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: CreateDealDto | UpdateDealDto) => Promise<void>;
    deal?: Deal | null;
}

export default function DealModal({
    isOpen,
    onClose,
    onSave,
    deal,
}: DealModalProps) {
    const [formData, setFormData] = useState<CreateDealDto>({
        title: '',
        description: '',
        status: 'NEW',
        value: 0,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (deal) {
            setFormData({
                title: deal.title,
                description: deal.description,
                status: deal.status,
                value: deal.value,
            });
        } else {
            setFormData({
                title: '',
                description: '',
                status: 'NEW',
                value: 0,
            });
        }
    }, [deal, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave(formData);
            onClose();
        } catch (error) {
            console.error('Failed to save deal', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'value' ? Number(value) : value,
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={deal ? 'Edit Deal' : 'Add Deal'}
            size="lg"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Deal Title
                    </label>
                    <Input
                        name="title"
                        type="text"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enterprise Software License"
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
                        required
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Deal details..."
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            <option value="NEW">New</option>
                            <option value="NEGOTIATION">Negotiation</option>
                            <option value="WON">Won</option>
                            <option value="LOST">Lost</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Value ($)
                        </label>
                        <Input
                            name="value"
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            value={formData.value}
                            onChange={handleChange}
                            placeholder="10000"
                        />
                    </div>
                </div>

                <div className="flex gap-3 pt-4">
                    <Button type="submit" disabled={loading} className="flex-1">
                        {loading
                            ? 'Saving...'
                            : deal
                              ? 'Update Deal'
                              : 'Add Deal'}
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
