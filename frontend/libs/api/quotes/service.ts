// libs/api/quotes/service.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { API_ENDPOINTS } from '../../config/api';

// Placeholder types - in a real implementation these would come from validation schemas
export type Quote = {
  id: string;
  rfqId: string;
  vendorId: string;
  totalAmount: number;
  expiryDate: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  createdAt: string;
};

// API functions using the centralized API configuration
const fetchQuotes = async (): Promise<Quote[]> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.QUOTES}/quotes`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch quotes: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching quotes:', error);
    // Return mock data in case of error for development
    return [
      {
        id: 'quote-1',
        rfqId: 'rfq-1',
        vendorId: 'vendor-1',
        totalAmount: 1250.75,
        expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
        status: 'sent',
        createdAt: new Date().toISOString()
      },
      {
        id: 'quote-2',
        rfqId: 'rfq-2',
        vendorId: 'vendor-2',
        totalAmount: 890.50,
        expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        status: 'draft',
        createdAt: new Date().toISOString()
      }
    ];
  }
};

const fetchQuoteById = async (id: string): Promise<Quote> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.QUOTES}/quotes/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Quote with id ${id} not found`);
      }
      throw new Error(`Failed to fetch quote: ${response.status} ${response.statusText}`);
    }
    
    const quote = await response.json();
    return quote;
  } catch (error) {
    console.error(`Error fetching quote with id ${id}:`, error);
    throw error;
  }
};

const createQuote = async (quoteData: Omit<Quote, 'id' | 'createdAt' | 'status'>): Promise<Quote> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.QUOTES}/quotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quoteData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create quote: ${response.status} ${response.statusText}`);
    }
    
    const newQuote = await response.json();
    return newQuote;
  } catch (error) {
    console.error('Error creating quote:', error);
    throw error;
  }
};

// React Query hooks
export const useQuotes = () => {
  return useQuery<Quote[], Error>({
    queryKey: ['quotes'],
    queryFn: fetchQuotes,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useQuote = (id: string) => {
  return useQuery<Quote, Error>({
    queryKey: ['quote', id],
    queryFn: () => fetchQuoteById(id),
    enabled: !!id, // Only run query if id is provided
  });
};

export const useCreateQuote = () => {
  return useMutation({
    mutationFn: (quoteData: Omit<Quote, 'id' | 'createdAt' | 'status'>) => createQuote(quoteData),
  });
};