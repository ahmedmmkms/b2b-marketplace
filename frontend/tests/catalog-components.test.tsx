// tests/catalog-components.test.tsx
import React, { type ReactNode } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest';
import CatalogList from '@/components/CatalogList';
import ProductDetail from '@/components/ProductDetail';
import { useProducts, useProduct } from '@/libs/api/catalog/service';
import { useRouter, useParams } from 'next/navigation';
import { FeatureFlagProvider } from '@/libs/providers/FeatureFlagProvider';

// Mock the API hooks
vi.mock('@/libs/api/catalog/service', () => ({
  useProducts: vi.fn(),
  useProduct: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useParams: vi.fn()
}));

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: ReactNode }) => (
  <FeatureFlagProvider>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </FeatureFlagProvider>
);

const mockedUseRouter = vi.mocked(useRouter);
const mockedUseParams = vi.mocked(useParams);

const createMockRouter = (): ReturnType<typeof useRouter> =>
  ({
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
    push: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
  }) as unknown as ReturnType<typeof useRouter>;

describe('Catalog Components', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseRouter.mockReturnValue(createMockRouter());
    mockedUseParams.mockReturnValue({ id: '1' });
  });

  describe('CatalogList', () => {
    it('should render loading state initially', () => {
      (useProducts as Mock).mockReturnValue({
        data: undefined,
        isLoading: true,
        isError: false,
      });

      render(<CatalogList />, { wrapper });

      expect(screen.getByRole('status')).toBeInTheDocument(); // Loading spinner
    });

    it('should render products when data is available', async () => {
      const mockProducts = {
        items: [
          {
            id: '1',
            vendorId: 'vendor-1',
            sku: 'SKU001',
            name: 'Test Product',
            description: 'Test Description',
            category: 'Electronics',
            referencePrice: 99.99,
            mediaUrls: ['https://example.com/image.jpg'],
            attributes: { color: 'red' },
          },
          {
            id: '2',
            vendorId: 'vendor-2',
            sku: 'SKU002',
            name: 'Test Product 2',
            description: 'Test Description 2',
            category: 'Home',
            referencePrice: 149.99,
            mediaUrls: ['https://example.com/image2.jpg'],
            attributes: { size: 'large' },
          },
        ],
        page: 1,
        pageSize: 20,
        total: 2,
      };

      (useProducts as Mock).mockReturnValue({
        data: mockProducts,
        isLoading: false,
        isError: false,
      });

      render(<CatalogList />, { wrapper });

      // Wait for the products to render
      await waitFor(() => {
        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('Test Product 2')).toBeInTheDocument();
      });
    });

    it('should render error state when API fails', async () => {
      (useProducts as Mock).mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: true,
      });

      render(<CatalogList />, { wrapper });

      await waitFor(() => {
        expect(screen.getByText('Error Loading Products')).toBeInTheDocument();
      });
    });
  });

  describe('ProductDetail', () => {
    it('should render loading state initially', () => {
      (useProduct as Mock).mockReturnValue({
        data: undefined,
        isLoading: true,
        isError: false,
      });

      render(<ProductDetail />, { wrapper });

      expect(screen.getByRole('status')).toBeInTheDocument(); // Loading spinner
    });

    it('should render product details when data is available', async () => {
      const mockProduct = {
        id: '1',
        vendorId: 'vendor-1',
        sku: 'SKU001',
        name: 'Test Product',
        description: 'Test Description',
        category: 'Electronics',
        referencePrice: 99.99,
        mediaUrls: ['https://example.com/image.jpg'],
        attributes: { color: 'red' },
      };

      (useProduct as Mock).mockReturnValue({
        data: mockProduct,
        isLoading: false,
        isError: false,
      });

      render(<ProductDetail />, { wrapper });

      await waitFor(() => {
        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
        expect(screen.getByText('$99.99')).toBeInTheDocument();
        expect(screen.getByText('Electronics')).toBeInTheDocument();
      });
    });

    it('should render error state when product is not found', async () => {
      (useProduct as Mock).mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: true,
      });

      render(<ProductDetail />, { wrapper });

      await waitFor(() => {
        expect(screen.getByText('Product Not Found')).toBeInTheDocument();
      });
    });
  });
});
