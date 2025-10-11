// libs/api/catalog/service.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productSchema } from '../../validation/schemas';
import { z } from 'zod';
import { API_ENDPOINTS } from '../../config/api';

// Define the product type based on the schema
export type Product = z.infer<typeof productSchema>;

// API functions using the centralized API configuration
const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.CATALOG}/products`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return mock data in case of error for development
    return [
      {
        id: 'prod-1',
        name: 'Sample Product 1',
        description: 'This is a sample product',
        price: 99.99,
        category: 'Electronics',
        inStock: true,
        quantity: 10
      },
      {
        id: 'prod-2',
        name: 'Sample Product 2',
        description: 'This is another sample product',
        price: 149.99,
        category: 'Home & Garden',
        inStock: false,
        quantity: 0
      }
    ];
  }
};

const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.CATALOG}/products/${id}`);
    
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
export const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
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