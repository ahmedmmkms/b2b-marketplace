import { describe, expect, it, beforeEach } from 'vitest';
import { useAuthStore } from '../auth-store';

describe('auth store', () => {
  beforeEach(() => {
    useAuthStore.setState({
      accessToken: undefined,
      refreshToken: undefined,
      tokenType: 'Bearer',
      expiresAt: undefined,
      user: undefined,
    });
  });

  it('stores credentials and reports authentication status', () => {
    expect(useAuthStore.getState().isAuthenticated()).toBe(false);
    useAuthStore.getState().setCredentials({
      token: 'jwt-token',
      type: 'Bearer',
      id: 'user-1',
      role: 'buyer',
      refreshToken: 'refresh-token',
      expiresIn: 3600,
    });

    expect(useAuthStore.getState().accessToken).toBe('jwt-token');
    expect(useAuthStore.getState().isAuthenticated()).toBe(true);
  });

  it('clears credentials', () => {
    useAuthStore.getState().setCredentials({
      token: 'jwt-token',
      type: 'Bearer',
      id: 'user-1',
      role: 'buyer',
      refreshToken: 'refresh-token',
      expiresIn: 3600,
    });
    useAuthStore.getState().clear();

    expect(useAuthStore.getState().accessToken).toBeUndefined();
    expect(useAuthStore.getState().isAuthenticated()).toBe(false);
  });
});
