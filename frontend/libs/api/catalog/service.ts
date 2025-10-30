// libs/api/catalog/service.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { API_ENDPOINTS } from '../../config/api';

// Define the product type based on the OpenAPI specification
export type Product = {
  id: string;
  vendorId: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  referencePrice: number;
  mediaUrls?: string[];
  attributes?: Record<string, any>;
};

// Define the PaginatedProducts type based on the OpenAPI specification
export type PaginatedProducts = {
  items: Product[];
  page: number;
  pageSize: number;
  total: number;
};

// API functions using the centralized API configuration
const fetchProducts = async (params?: { q?: string; category?: string; page?: number; pageSize?: number }): Promise<PaginatedProducts> => {
  try {
    const url = new URL(`${API_ENDPOINTS.BASE}/products`);
    
    if (params) {
      if (params.q) url.searchParams.append('q', params.q);
      if (params.category) url.searchParams.append('category', params.category);
      if (params.page) url.searchParams.append('page', params.page.toString());
      if (params.pageSize) url.searchParams.append('pageSize', params.pageSize.toString());
    }
    
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return mock data in case of error for development
    return {
      items: [
        {
          id: 'prod-1',
          vendorId: 'vendor-1',
          sku: 'SKU001',
          name: 'Sample Product 1',
          description: 'This is a sample product',
          category: 'Electronics',
          referencePrice: 99.99,
          mediaUrls: ['https://via.placeholder.com/300x200'],
          attributes: { brand: 'Acme', model: 'X1' }
        },
        {
          id: 'prod-2',
          vendorId: 'vendor-2',
          sku: 'SKU002',
          name: 'Sample Product 2',
          description: 'This is another sample product',
          category: 'Home & Garden',
          referencePrice: 149.99,
          mediaUrls: ['https://via.placeholder.com/300x200'],
          attributes: { color: 'Red', size: 'Large' }
        }
      ],
      page: 1,
      pageSize: 20,
      total: 2
    };
  }
};

const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.BASE}/products/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Product with id ${id} not found`);
      }
      throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`);
    }
    
    const product = await response.json();
    return product;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

// React Query hooks
export const useProducts = (params?: { q?: string; category?: string; page?: number; pageSize?: number }) => {
  return useQuery<PaginatedProducts, Error>({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProduct = (id: string) => {
  return useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id, // Only run query if id is provided
  });
};

// Other catalog-related hooks would go here...