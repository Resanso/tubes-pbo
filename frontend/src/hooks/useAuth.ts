import { useMutation } from '@tanstack/react-query';
import { userApi } from '@/api/user.api';
import { useAuth } from '@/contexts/AuthContext';
import type { LoginRequest, RegisterRequest } from '@/types/user.types';

export function useLogin() {
  const { login } = useAuth();
  return useMutation({
    mutationFn: (data: LoginRequest) => userApi.login(data),
    onSuccess: (res) => login(res.token, res.customer),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterRequest) => userApi.register(data),
  });
}
