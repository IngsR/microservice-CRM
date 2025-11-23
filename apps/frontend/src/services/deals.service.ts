import api from '@/lib/api';
import { CreateDealDto, Deal, UpdateDealDto } from '@/types/deals';

export const dealsService = {
    findAll: async () => {
        const response = await api.get<Deal[]>('/deals');
        return response.data;
    },

    findOne: async (id: number) => {
        const response = await api.get<Deal>(`/deals/${id}`);
        return response.data;
    },

    create: async (data: CreateDealDto) => {
        const response = await api.post<Deal>('/deals', data);
        return response.data;
    },

    update: async (id: number, data: UpdateDealDto) => {
        const response = await api.patch<Deal>(`/deals/${id}`, data);
        return response.data;
    },

    remove: async (id: number) => {
        const response = await api.delete(`/deals/${id}`);
        return response.data;
    },

    search: async (keyword: string) => {
        const response = await api.get<Deal[]>(
            `/deals/search?keyword=${keyword}`,
        );
        return response.data;
    },
};
