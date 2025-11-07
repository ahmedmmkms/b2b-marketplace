import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { useProducts, axiosInstance } from '@/libs/api';

const createWrapper = () => {
  const queryClient = new QueryClient();
  const QueryClientTestWrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  QueryClientTestWrapper.displayName = 'QueryClientTestWrapper';
  return QueryClientTestWrapper;
};

describe('useProducts', () => {
  beforeEach(() => {
    vi.spyOn(axiosInstance, 'request').mockResolvedValue({
      data: {
        items: [
          {
            id: 'prod-1',
            name: 'Test Product',
            vendorId: 'vendor-1',
            sku: 'SKU-1',
          },
        ],
        meta: { page: 1, pageSize: 20, totalItems: 1, totalPages: 1 },
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches products with query params', async () => {
    const wrapper = createWrapper();
    const { result } = renderHook(() => useProducts({ q: 'steel', page: 1, pageSize: 20 }), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.data?.items?.length).toBe(1);
    });

    expect(axiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'GET',
        params: { q: 'steel', page: 1, pageSize: 20 },
      }),
    );
  });
});
