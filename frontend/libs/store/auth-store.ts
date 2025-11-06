import { create } from 'zustand';
import type { User } from '../api/generated';

interface AuthState {
  token: string | null;
  user: User | null;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  hydrate: (user: User | null) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
  hydrate: (user) => set({ user }),
  clear: () => set({ token: null, user: null })
}));

export const getAuthToken = () => useAuthStore.getState().token;
