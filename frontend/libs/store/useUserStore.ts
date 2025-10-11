// libs/store/useUserStore.ts
import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (userData) => set({ user: userData, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));