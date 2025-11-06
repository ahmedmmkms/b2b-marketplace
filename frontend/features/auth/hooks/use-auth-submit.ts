'use client';

import { useState } from 'react';
import { useRouter } from '@/libs/i18n/routing';
import {
  useLogin,
  useRegister,
  getMe,
  type JwtResponse,
  type LoginRequest,
  type RegisterRequest
} from '@/libs/api/generated';
import { useAuthStore } from '@/libs/store/auth-store';
import { persistSession } from '@/libs/utils/session';

type Mode = 'login' | 'register';

export const useAuthSubmit = (mode: Mode) => {
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSuccess = async (data: JwtResponse) => {
    if (!data.token) {
      setErrorMessage('Missing authentication token');
      return;
    }
    await persistSession(data.token);
    setToken(data.token);
    try {
      const profile = await getMe();
      setUser(profile);
    } catch {
      setUser(null);
    }
    router.replace('/');
  };

  const loginMutation = useLogin({
    onSuccess: handleSuccess,
    onError: (error) => setErrorMessage(error instanceof Error ? error.message : 'Login failed')
  });

  const registerMutation = useRegister({
    onSuccess: handleSuccess,
    onError: (error) => setErrorMessage(error instanceof Error ? error.message : 'Registration failed')
  });

  const mutateAsync = async (values: LoginRequest | RegisterRequest) => {
    setErrorMessage(null);
    if (mode === 'login') {
      await loginMutation.mutateAsync(values as LoginRequest);
    } else {
      await registerMutation.mutateAsync(values as RegisterRequest);
    }
  };

  return {
    mutateAsync,
    isPending: loginMutation.isPending || registerMutation.isPending,
    errorMessage
  };
};
