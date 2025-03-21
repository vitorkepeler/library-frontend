import { z } from 'zod';
import { loginSchema } from '@/models/Auth.ts';
import { login } from '@/services/auth.service.ts';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/components/AuthProvider.tsx';
import { useNavigate } from 'react-router-dom';

export function useLoginMutation() {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password }: z.infer<typeof loginSchema>) => {
      return login(email, password);
    },
    onSuccess: (data) => {
      setToken(data.token);
      navigate('/', { replace: true });
    },
  });
}