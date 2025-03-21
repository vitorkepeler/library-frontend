import { AxiosResponse } from 'axios';
import { AuthResponse } from '@/models/Auth.ts';
import api from '@/utils/api.ts';

export async function login(email: string, password: string) {
  const response: AxiosResponse<AuthResponse> = await api.post('/auth/login', { email, password });

  return response.data;
}