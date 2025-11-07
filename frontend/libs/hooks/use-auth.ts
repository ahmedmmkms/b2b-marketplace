'use client';

import { useEffect } from 'react';
import { useMe } from '@/libs/api';
import { useAuthStore } from '@/libs/store/auth-store';

export const useAuth = () => {
  const { user, setUser, clear, isAuthenticated } = useAuthStore();
  const enabled = isAuthenticated();

  const query = useMe({
    query: {
      enabled,
    },
  });

  useEffect(() => {
    if (!enabled) {
      clear();
    }
  }, [enabled, clear]);

  useEffect(() => {
    if (query.data) {
      setUser(query.data);
    }
  }, [query.data, setUser]);

  useEffect(() => {
    if (query.isError) {
      clear();
    }
  }, [query.isError, clear]);

  return {
    user: user ?? query.data,
    isAuthenticated: enabled,
    isLoading: query.isLoading,
    refetch: query.refetch,
  };
};
