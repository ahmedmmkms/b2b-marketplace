// libs/api/orders/service.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { API_ENDPOINTS } from '../../config/api';

// Placeholder types - in a real implementation these would come from validation schemas
export type Order = {
  id: string;
  rfqId: string;
  quoteId: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
};

// API functions using the centralized API configuration
const fetchOrders = async (): Promise<Order[]> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.ORDERS}/orders`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    // Return mock data in case of error for development
    return [
      {
        id: 'order-1',
        rfqId: 'rfq-1',
        quoteId: 'quote-1',
        totalAmount: 1250.75,
        status: 'processing',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'order-2',
        rfqId: 'rfq-2',
        quoteId: 'quote-2',
        totalAmount: 890.50,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }
};

const fetchOrderById = async (id: string): Promise<Order> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.ORDERS}/orders/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Order with id ${id} not found`);
      }
      throw new Error(`Failed to fetch order: ${response.status} ${response.statusText}`);
    }
    
    const order = await response.json();
    return order;
  } catch (error) {
    console.error(`Error fetching order with id ${id}:`, error);
    throw error;
  }
};

const createOrder = async (orderData: Omit<Order, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.ORDERS}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create order: ${response.status} ${response.statusText}`);
    }
    
    const newOrder = await response.json();
    return newOrder;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// React Query hooks
export const useOrders = () => {
  return useQuery<Order[], Error>({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useOrder = (id: string) => {
  return useQuery<Order, Error>({
    queryKey: ['order', id],
    queryFn: () => fetchOrderById(id),
    enabled: !!id, // Only run query if id is provided
  });
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (orderData: Omit<Order, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => createOrder(orderData),
  });
};