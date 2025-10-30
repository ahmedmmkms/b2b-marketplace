// tests/catalog-components.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CatalogList from '@/components/CatalogList';
import ProductDetail from '@/components/ProductDetail';
import { useProducts, useProduct } from '@/libs/api/catalog/service';

// Mock the API hooks
jest.mock('@/libs/api/catalog/service', () => ({
  useProducts: jest.fn(),
  useProduct: jest.fn(),
}));

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('Catalog Components', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('CatalogList', () => {
    it('should render loading state initially', () => {
      (useProducts as jest.Mock).mockReturnValue({
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

      (useProducts as jest.Mock).mockReturnValue({
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
      (useProducts as jest.Mock).mockReturnValue({
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
      (useProduct as jest.Mock).mockReturnValue({
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

      (useProduct as jest.Mock).mockReturnValue({
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
      (useProduct as jest.Mock).mockReturnValue({
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