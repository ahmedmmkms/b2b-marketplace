// libs/api/rfq/service.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { API_ENDPOINTS } from '../../config/api';

// Placeholder types - in a real implementation these would come from validation schemas
export type Rfq = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  expiresAt: string;
  status: 'draft' | 'sent' | 'answered' | 'closed';
};

// API functions using the centralized API configuration
const fetchRfqs = async (): Promise<Rfq[]> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.RFQ}/rfqs`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch RFQs: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching RFQs:', error);
    // Return mock data in case of error for development
    return [
      {
        id: 'rfq-1',
        title: 'Sample RFQ 1',
        description: 'This is a sample RFQ',
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        status: 'sent'
      },
      {
        id: 'rfq-2',
        title: 'Sample RFQ 2',
        description: 'This is another sample RFQ',
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
        status: 'draft'
      }
    ];
  }
};

const fetchRfqById = async (id: string): Promise<Rfq> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.RFQ}/rfqs/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`RFQ with id ${id} not found`);
      }
      throw new Error(`Failed to fetch RFQ: ${response.status} ${response.statusText}`);
    }
    
    const rfq = await response.json();
    return rfq;
  } catch (error) {
    console.error(`Error fetching RFQ with id ${id}:`, error);
    throw error;
  }
};

const createRfq = async (rfqData: Omit<Rfq, 'id' | 'createdAt' | 'status'>): Promise<Rfq> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.RFQ}/rfqs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rfqData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create RFQ: ${response.status} ${response.statusText}`);
    }
    
    const newRfq = await response.json();
    return newRfq;
  } catch (error) {
    console.error('Error creating RFQ:', error);
    throw error;
  }
};

// React Query hooks
export const useRfqs = () => {
  return useQuery<Rfq[], Error>({
    queryKey: ['rfqs'],
    queryFn: fetchRfqs,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useRfq = (id: string) => {
  return useQuery<Rfq, Error>({
    queryKey: ['rfq', id],
    queryFn: () => fetchRfqById(id),
    enabled: !!id, // Only run query if id is provided
  });
};

export const useCreateRfq = () => {
  return useMutation({
    mutationFn: (rfqData: Omit<Rfq, 'id' | 'createdAt' | 'status'>) => createRfq(rfqData),
  });
};