import api from '@/lib/api';
import { LoginDto, LoginResponse } from '@/types/auth';

export const authService = {
    login: async (data: LoginDto): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>('/auth/login', data);
        return response.data;
    },
};
