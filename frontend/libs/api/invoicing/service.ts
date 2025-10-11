// libs/api/invoicing/service.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { API_ENDPOINTS } from '../../config/api';

// Placeholder types - in a real implementation these would come from validation schemas
export type Invoice = {
  id: string;
  orderId: string;
  amount: number;
  vatAmount: number;
  status: 'draft' | 'issued' | 'paid' | 'overdue' | 'cancelled';
  issueDate: string;
  dueDate: string;
  reference: string;
  createdAt: string;
};

// API functions using the centralized API configuration
const fetchInvoices = async (): Promise<Invoice[]> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.INVOICING}/invoices`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch invoices: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching invoices:', error);
    // Return mock data in case of error for development
    return [
      {
        id: 'invoice-1',
        orderId: 'order-1',
        amount: 1250.75,
        vatAmount: 187.61, // 15% VAT
        status: 'issued',
        issueDate: new Date().toISOString(),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        reference: 'INV-001',
        createdAt: new Date().toISOString()
      },
      {
        id: 'invoice-2',
        orderId: 'order-2',
        amount: 890.50,
        vatAmount: 133.58, // 15% VAT
        status: 'draft',
        issueDate: new Date().toISOString(),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        reference: 'INV-002',
        createdAt: new Date().toISOString()
      }
    ];
  }
};

const fetchInvoiceById = async (id: string): Promise<Invoice> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.INVOICING}/invoices/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Invoice with id ${id} not found`);
      }
      throw new Error(`Failed to fetch invoice: ${response.status} ${response.statusText}`);
    }
    
    const invoice = await response.json();
    return invoice;
  } catch (error) {
    console.error(`Error fetching invoice with id ${id}:`, error);
    throw error;
  }
};

const createInvoice = async (invoiceData: Omit<Invoice, 'id' | 'status' | 'createdAt'>): Promise<Invoice> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.INVOICING}/invoices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoiceData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create invoice: ${response.status} ${response.statusText}`);
    }
    
    const newInvoice = await response.json();
    return newInvoice;
  } catch (error) {
    console.error('Error creating invoice:', error);
    throw error;
  }
};

// React Query hooks
export const useInvoices = () => {
  return useQuery<Invoice[], Error>({
    queryKey: ['invoices'],
    queryFn: fetchInvoices,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useInvoice = (id: string) => {
  return useQuery<Invoice, Error>({
    queryKey: ['invoice', id],
    queryFn: () => fetchInvoiceById(id),
    enabled: !!id, // Only run query if id is provided
  });
};

export const useCreateInvoice = () => {
  return useMutation({
    mutationFn: (invoiceData: Omit<Invoice, 'id' | 'status' | 'createdAt'>) => createInvoice(invoiceData),
  });
};