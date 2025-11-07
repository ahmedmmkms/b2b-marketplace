import type { GetProductsParams } from '@/libs/api';

type UUID = string;

export const queryKeys = {
  me: () => ['auth', 'me'] as const,
  featureFlags: () => ['ops', 'feature-flags'] as const,
  products: (params: GetProductsParams = {}) => ['catalog', 'products', params] as const,
  product: (id: UUID) => ['catalog', 'product', id] as const,
  rfq: (id: UUID) => ['rfq', id] as const,
  rfqQuotes: (rfqId: UUID) => ['rfq', rfqId, 'quotes'] as const,
  orders: () => ['orders'] as const,
  order: (orderId: UUID) => ['orders', orderId] as const,
  wallet: () => ['wallet'] as const,
};
