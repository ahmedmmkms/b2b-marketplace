// libs/api/payments/service.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { API_ENDPOINTS } from '../../config/api';

// Placeholder types - in a real implementation these would come from validation schemas
export type Payment = {
  id: string;
  orderId: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  method: 'credit_card' | 'bank_transfer' | 'wallet' | 'other';
  reference: string;
  createdAt: string;
  updatedAt: string;
};

// API functions using the centralized API configuration
const fetchPayments = async (): Promise<Payment[]> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.PAYMENTS}/payments`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch payments: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching payments:', error);
    // Return mock data in case of error for development
    return [
      {
        id: 'payment-1',
        orderId: 'order-1',
        amount: 1250.75,
        status: 'completed',
        method: 'credit_card',
        reference: 'ref-12345',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'payment-2',
        orderId: 'order-2',
        amount: 890.50,
        status: 'pending',
        method: 'bank_transfer',
        reference: 'ref-67890',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }
};

const fetchPaymentById = async (id: string): Promise<Payment> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.PAYMENTS}/payments/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Payment with id ${id} not found`);
      }
      throw new Error(`Failed to fetch payment: ${response.status} ${response.statusText}`);
    }
    
    const payment = await response.json();
    return payment;
  } catch (error) {
    console.error(`Error fetching payment with id ${id}:`, error);
    throw error;
  }
};

const createPayment = async (paymentData: Omit<Payment, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Payment> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.PAYMENTS}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create payment: ${response.status} ${response.statusText}`);
    }
    
    const newPayment = await response.json();
    return newPayment;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};

// React Query hooks
export const usePayments = () => {
  return useQuery<Payment[], Error>({
    queryKey: ['payments'],
    queryFn: fetchPayments,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const usePayment = (id: string) => {
  return useQuery<Payment, Error>({
    queryKey: ['payment', id],
    queryFn: () => fetchPaymentById(id),
    enabled: !!id, // Only run query if id is provided
  });
};

export const useCreatePayment = () => {
  return useMutation({
    mutationFn: (paymentData: Omit<Payment, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => createPayment(paymentData),
  });
};