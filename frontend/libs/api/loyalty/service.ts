// libs/api/loyalty/service.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { API_ENDPOINTS } from '../../config/api';

// Placeholder types - in a real implementation these would come from validation schemas
export type LoyaltyProgram = {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
};

export type LoyaltyTier = {
  id: string;
  programId: string;
  name: string;
  minPoints: number;
  benefits: string[];
};

export type LoyaltyAccount = {
  id: string;
  userId: string;
  programId: string;
  tierId: string;
  points: number;
  tierName: string;
  tierBenefits: string[];
  joinedAt: string;
  updatedAt: string;
};

export type LoyaltyTransaction = {
  id: string;
  accountId: string;
  type: 'earned' | 'redeemed' | 'expired';
  points: number;
  balanceAfter: number;
  description: string;
  reference: string;
  createdAt: string;
};

// API functions using the centralized API configuration
const fetchLoyaltyPrograms = async (): Promise<LoyaltyProgram[]> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.LOYALTY}/programs`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch loyalty programs: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching loyalty programs:', error);
    // Return mock data in case of error for development
    return [
      {
        id: 'prog-1',
        name: 'Standard Loyalty Program',
        description: 'Our standard loyalty program with point-based rewards',
        isActive: true,
        createdAt: new Date().toISOString()
      }
    ];
  }
};

const fetchLoyaltyAccount = async (userId: string): Promise<LoyaltyAccount> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.LOYALTY}/accounts/${userId}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Loyalty account for user ${userId} not found`);
      }
      throw new Error(`Failed to fetch loyalty account: ${response.status} ${response.statusText}`);
    }
    
    const account = await response.json();
    return account;
  } catch (error) {
    console.error(`Error fetching loyalty account for user ${userId}:`, error);
    throw error;
  }
};

const fetchLoyaltyAccountTransactions = async (accountId: string): Promise<LoyaltyTransaction[]> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.LOYALTY}/accounts/${accountId}/transactions`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch loyalty transactions: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching loyalty transactions for account ${accountId}:`, error);
    // Return mock data in case of error for development
    return [
      {
        id: 'lt-1',
        accountId,
        type: 'earned',
        points: 100,
        balanceAfter: 100,
        description: 'Purchase completed',
        reference: 'ord-1',
        createdAt: new Date().toISOString()
      },
      {
        id: 'lt-2',
        accountId,
        type: 'earned',
        points: 50,
        balanceAfter: 150,
        description: 'Referral bonus',
        reference: 'ref-1',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 1 day ago
      }
    ];
  }
};

// React Query hooks
export const useLoyaltyPrograms = () => {
  return useQuery<LoyaltyProgram[], Error>({
    queryKey: ['loyaltyPrograms'],
    queryFn: fetchLoyaltyPrograms,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useLoyaltyAccount = (userId: string) => {
  return useQuery<LoyaltyAccount, Error>({
    queryKey: ['loyaltyAccount', userId],
    queryFn: () => fetchLoyaltyAccount(userId),
    enabled: !!userId, // Only run query if userId is provided
  });
};

export const useLoyaltyAccountTransactions = (accountId: string) => {
  return useQuery<LoyaltyTransaction[], Error>({
    queryKey: ['loyaltyTransactions', accountId],
    queryFn: () => fetchLoyaltyAccountTransactions(accountId),
    enabled: !!accountId, // Only run query if accountId is provided
  });
};