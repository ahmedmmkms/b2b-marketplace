import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { JwtResponse, User } from '@/libs/api';

type AuthJwtResponse = JwtResponse & {
  refreshToken?: string;
  expiresIn?: number;
};

export interface AuthState {
  accessToken?: string;
  refreshToken?: string;
  tokenType?: string;
  expiresAt?: number;
  user?: User;
  setCredentials: (payload: AuthJwtResponse) => void;
  setUser: (user?: User) => void;
  clear: () => void;
  isAuthenticated: () => boolean;
}

const ONE_HOUR = 60 * 60 * 1000;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: undefined,
      refreshToken: undefined,
      tokenType: 'Bearer',
      expiresAt: undefined,
      user: undefined,
      setCredentials: (payload: AuthJwtResponse) => {
        const expiresAt =
          payload.expiresIn != null ? Date.now() + payload.expiresIn * 1000 : Date.now() + ONE_HOUR;
        set({
          accessToken: payload.token,
          refreshToken: payload.refreshToken,
          tokenType: payload.type ?? 'Bearer',
          expiresAt,
        });
      },
      setUser: (user?: User) => set({ user }),
      clear: () =>
        set({
          accessToken: undefined,
          refreshToken: undefined,
          tokenType: 'Bearer',
          expiresAt: undefined,
          user: undefined,
        }),
      isAuthenticated: () => {
        const { accessToken, expiresAt } = get();
        if (!accessToken) {
          return false;
        }
        if (!expiresAt) {
          return true;
        }
        return Date.now() < expiresAt;
      },
    }),
    {
      name: 'b2b-auth',
      version: 1,
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        tokenType: state.tokenType,
        expiresAt: state.expiresAt,
        user: state.user,
      }),
      skipHydration: true,
    },
  ),
);

export const getAccessToken = (): string | undefined => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    return accessToken;
  }

  if (typeof window === 'undefined') {
    return undefined;
  }

  try {
    const token = window.localStorage.getItem('b2b-auth');
    if (!token) {
      return undefined;
    }
    const parsed = JSON.parse(token) as { state?: { accessToken?: string } };
    return parsed?.state?.accessToken ?? undefined;
  } catch {
    return undefined;
  }
};
