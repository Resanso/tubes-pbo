import apiClient from './axios.config';
import type { AuthResponse, Customer, LoginRequest, RegisterRequest } from '@/types/user.types';

export const userApi = {
  register: (data: RegisterRequest) =>
    apiClient.post<Customer>('/users/register', data).then((r) => r.data),

  login: (data: LoginRequest) =>
    apiClient.post<AuthResponse>('/users/login', data).then((r) => r.data),

  getById: (id: number) =>
    apiClient.get<Customer>(`/users/${id}`).then((r) => r.data),
};
