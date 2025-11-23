import api from '@/lib/api';
import {
    CreateCustomerDto,
    Customer,
    UpdateCustomerDto,
} from '@/types/customers';

export const customersService = {
    findAll: async () => {
        const response = await api.get<Customer[]>('/customers');
        return response.data;
    },

    findOne: async (id: number) => {
        const response = await api.get<Customer>(`/customers/${id}`);
        return response.data;
    },

    create: async (data: CreateCustomerDto) => {
        const response = await api.post<Customer>('/customers', data);
        return response.data;
    },

    update: async (id: number, data: UpdateCustomerDto) => {
        const response = await api.patch<Customer>(`/customers/${id}`, data);
        return response.data;
    },

    remove: async (id: number) => {
        const response = await api.delete(`/customers/${id}`);
        return response.data;
    },

    search: async (keyword: string) => {
        const response = await api.get<Customer[]>(
            `/customers/search?keyword=${keyword}`,
        );
        return response.data;
    },
};
