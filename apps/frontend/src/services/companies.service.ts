import api from '@/lib/api';
import { Company, CreateCompanyDto, UpdateCompanyDto } from '@/types/companies';

export const companiesService = {
    findAll: async () => {
        const response = await api.get<Company[]>('/companies');
        return response.data;
    },

    findOne: async (id: number) => {
        const response = await api.get<Company>(`/companies/${id}`);
        return response.data;
    },

    create: async (data: CreateCompanyDto) => {
        const response = await api.post<Company>('/companies', data);
        return response.data;
    },

    update: async (id: number, data: UpdateCompanyDto) => {
        const response = await api.patch<Company>(`/companies/${id}`, data);
        return response.data;
    },

    remove: async (id: number) => {
        const response = await api.delete(`/companies/${id}`);
        return response.data;
    },

    search: async (keyword: string) => {
        const response = await api.get<Company[]>(
            `/companies/search?keyword=${keyword}`,
        );
        return response.data;
    },
};
