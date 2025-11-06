import { describe, expect, it, vi, beforeEach, type Mock } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAuthSubmit } from '../hooks/use-auth-submit';
import * as session from '@/libs/utils/session';
import * as generated from '@/libs/api/generated';

vi.mock('@/libs/api/generated', () => ({
  useLogin: vi.fn(),
  useRegister: vi.fn(),
  getMe: vi.fn()
}));

vi.mock('@/libs/utils/session', () => ({
  persistSession: vi.fn()
}));

vi.mock('@/libs/store/auth-store', () => {
  const state = {
    setToken: vi.fn(),
    setUser: vi.fn()
  };
  return {
    useAuthStore: vi.fn((selector?: (s: typeof state) => unknown) =>
      selector ? selector(state) : state
    ),
    getAuthToken: vi.fn()
  };
});

vi.mock('@/libs/i18n/routing', () => ({
  useRouter: () => ({
    replace: vi.fn()
  })
}));

describe('useAuthSubmit', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('stores session on login', async () => {
    const mutateMock = vi.fn().mockResolvedValue({ token: 'token', expiresIn: 3600 });
    (generated.useLogin as unknown as Mock).mockImplementation((options?: any) => ({
      mutateAsync: async (...args: unknown[]) => {
        const result = await mutateMock(...args);
        await options?.onSuccess?.(result);
        return result;
      },
      isPending: false
    }));
    (generated.useRegister as unknown as Mock).mockImplementation(() => ({
      mutateAsync: vi.fn(),
      isPending: false
    }));
    (generated.getMe as unknown as Mock).mockResolvedValue({ id: '123', email: 'user@test.com' });

    const { result } = renderHook(() => useAuthSubmit('login'));

    await act(async () => {
      await result.current.mutateAsync({ email: 'user@test.com', password: 'secret123' });
    });

    expect(mutateMock).toHaveBeenCalled();
    expect(session.persistSession).toHaveBeenCalledWith('token');
    expect(generated.getMe).toHaveBeenCalled();
  });
});
