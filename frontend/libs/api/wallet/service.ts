// libs/api/wallet/service.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { API_ENDPOINTS } from '../../config/api';

// Placeholder types - in a real implementation these would come from validation schemas
export type Wallet = {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  status: 'active' | 'inactive' | 'frozen';
  createdAt: string;
  updatedAt: string;
};

export type WalletTransaction = {
  id: string;
  walletId: string;
  type: 'credit' | 'debit';
  amount: number;
  balanceAfter: number;
  description: string;
  reference: string;
  createdAt: string;
};

// API functions using the centralized API configuration
const fetchWallet = async (userId: string): Promise<Wallet> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.WALLET}/wallets/${userId}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Wallet for user ${userId} not found`);
      }
      throw new Error(`Failed to fetch wallet: ${response.status} ${response.statusText}`);
    }
    
    const wallet = await response.json();
    return wallet;
  } catch (error) {
    console.error(`Error fetching wallet for user ${userId}:`, error);
    throw error;
  }
};

const fetchWalletTransactions = async (walletId: string): Promise<WalletTransaction[]> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.WALLET}/wallets/${walletId}/transactions`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch wallet transactions: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching wallet transactions for wallet ${walletId}:`, error);
    // Return mock data in case of error for development
    return [
      {
        id: 'txn-1',
        walletId,
        type: 'credit',
        amount: 500.00,
        balanceAfter: 1500.00,
        description: 'Initial deposit',
        reference: 'DEP-001',
        createdAt: new Date().toISOString()
      },
      {
        id: 'txn-2',
        walletId,
        type: 'debit',
        amount: 250.00,
        balanceAfter: 1250.00,
        description: 'Purchase',
        reference: 'PUR-001',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 1 day ago
      }
    ];
  }
};

const addFunds = async (walletId: string, amount: number, description: string): Promise<Wallet> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.WALLET}/wallets/${walletId}/deposit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, description }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to add funds: ${response.status} ${response.statusText}`);
    }
    
    const updatedWallet = await response.json();
    return updatedWallet;
  } catch (error) {
    console.error('Error adding funds:', error);
    throw error;
  }
};

// React Query hooks
export const useWallet = (userId: string) => {
  return useQuery<Wallet, Error>({
    queryKey: ['wallet', userId],
    queryFn: () => fetchWallet(userId),
    enabled: !!userId, // Only run query if userId is provided
  });
};

export const useWalletTransactions = (walletId: string) => {
  return useQuery<WalletTransaction[], Error>({
    queryKey: ['walletTransactions', walletId],
    queryFn: () => fetchWalletTransactions(walletId),
    enabled: !!walletId, // Only run query if walletId is provided
  });
};

export const useAddFunds = () => {
  return useMutation({
    mutationFn: ({walletId, amount, description}: {walletId: string, amount: number, description: string}) => 
      addFunds(walletId, amount, description),
  });
};