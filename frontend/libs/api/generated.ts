import {
  useQuery,
  useMutation,
  type UseQueryOptions,
  type UseMutationOptions
} from '@tanstack/react-query';
import client from './client';
import type { components } from './types';

type Schemas = components['schemas'];
type ApiFeatureFlag = Schemas['FeatureFlag'];
type ApiUser = Schemas['User'];

export type JwtResponse = Schemas['JwtResponse'];
export type LoginRequest = Schemas['LoginRequest'];
export type RegisterRequest = Schemas['RegisterRequest'];
export type Product = Schemas['Product'];
export type Quote = Schemas['Quote'];
export type QuoteCreate = Schemas['QuoteCreate'];
export type RFQ = Schemas['RFQ'];
export type RFQCreate = Schemas['RFQCreate'];
export type RFQLine = Schemas['RFQLine'];
export type RFQLineCreate = Schemas['RFQLineCreate'];
export type Order = Schemas['Order'];
export type Wallet = Schemas['Wallet'];
export type Payment = Schemas['Payment'];

export type FeatureFlag = {
  key: string;
  enabled: boolean;
  description?: string;
  value?: ApiFeatureFlag['value'];
};

export type PaginatedProducts = Schemas['PaginatedProducts'] & {
  totalPages?: number;
};

export type User = ApiUser & {
  roles: string[];
  organization?: { id: string };
};

export type OrderCreate = {
  quoteId: string;
};

export type WalletTopUpRequest = {
  amount: number;
  currency?: string;
};

const normalizeFeatureFlag = (flag: ApiFeatureFlag): FeatureFlag => {
  const value = (flag.value ?? {}) as { enabled?: boolean; description?: string };
  return {
    key: flag.key ?? '',
    enabled: Boolean(value.enabled),
    description: typeof value.description === 'string' ? value.description : undefined,
    value: flag.value
  };
};

const normalizeUser = (user: ApiUser): User => ({
  ...user,
  roles: user.role ? [user.role] : ['guest'],
  organization: user.orgId ? { id: user.orgId } : undefined
});

const keys = {
  me: ['me'] as const,
  featureFlags: ['feature-flags'] as const,
  products: (params?: Record<string, unknown>) => ['products', params] as const,
  product: (id: string) => ['product', id] as const,
  rfq: (id: string) => ['rfq', id] as const,
  rfqs: ['rfqs'] as const,
  quotes: (rfqId: string) => ['quotes', rfqId] as const,
  orders: ['orders'] as const,
  order: (id: string) => ['order', id] as const,
  wallet: (orgId: string) => ['wallet', orgId] as const
};

export const queryKeys = keys;

export const getFeatureFlags = async (): Promise<FeatureFlag[]> => {
  const { data } = await client.get<ApiFeatureFlag[]>('/flags', {
    headers: { Authorization: '' }
  });
  return data
    .map(normalizeFeatureFlag)
    .filter((flag) => flag.key.length > 0);
};

export const getMe = async (config?: { headers?: Record<string, string> }): Promise<User> => {
  const { data } = await client.get<ApiUser>('/users/me', config);
  return normalizeUser(data);
};

export const getProducts = async (params?: {
  page?: number;
  pageSize?: number;
  q?: string;
  category?: string;
}): Promise<PaginatedProducts> => {
  const { data } = await client.get<Schemas['PaginatedProducts']>('/products', { params });
  const totalItems = data.total ?? 0;
  const pageSize = data.pageSize ?? params?.pageSize ?? 1;
  const totalPages = pageSize > 0 ? Math.max(1, Math.ceil(totalItems / pageSize)) : 1;
  return {
    ...data,
    totalPages
  };
};

export const getProduct = async (id: string): Promise<Product> => {
  const { data } = await client.get<Product>(`/products/${id}`);
  return data;
};

export const createRfq = async (payload: RFQCreate): Promise<RFQ> => {
  const { data } = await client.post<RFQ>('/rfqs', payload);
  return data;
};

export const getRfq = async (id: string): Promise<RFQ> => {
  const { data } = await client.get<RFQ>(`/rfqs/${id}`);
  return data;
};

export const addRfqLine = async ({
  rfqId,
  payload
}: {
  rfqId: string;
  payload: RFQLineCreate;
}): Promise<RFQLine> => {
  const { data } = await client.post<RFQLine>(`/rfqs/${rfqId}/lines`, payload);
  return data;
};

export const issueRfq = async (rfqId: string): Promise<RFQ> => {
  const { data } = await client.post<RFQ>(`/rfqs/${rfqId}/issue`);
  return data;
};

export const listQuotes = async (rfqId: string): Promise<Quote[]> => {
  const { data } = await client.get<Quote[]>(`/rfqs/${rfqId}/quotes`);
  return data;
};

export const createQuote = async ({
  rfqId,
  payload
}: {
  rfqId: string;
  payload: QuoteCreate;
}): Promise<Quote> => {
  const { data } = await client.post<Quote>(`/rfqs/${rfqId}/quotes`, payload);
  return data;
};

export const acceptQuote = async ({
  rfqId,
  quoteId
}: {
  rfqId: string;
  quoteId: string;
}): Promise<Quote> => {
  const { data } = await client.post<Quote>(`/rfqs/${rfqId}/quotes/${quoteId}/accept`);
  return data;
};

export const createOrder = async (payload: OrderCreate): Promise<Order> => {
  const { data } = await client.post<Order>('/orders', payload);
  return data;
};

export const getOrder = async (orderId: string): Promise<Order> => {
  const { data } = await client.get<Order>(`/orders/${orderId}`);
  return data;
};

export const payOrderWithWallet = async ({
  orderId
}: {
  orderId: string;
}): Promise<Payment> => {
  const { data } = await client.post<Payment>(`/orders/${orderId}/pay/wallet`);
  return data;
};

export const getWallet = async (orgId: string): Promise<Wallet> => {
  const { data } = await client.get<Wallet>(`/wallets/${orgId}`);
  return data;
};

export const topUpWallet = async ({
  orgId,
  payload
}: {
  orgId: string;
  payload: WalletTopUpRequest;
}): Promise<Wallet> => {
  const { data } = await client.post<Wallet>(`/wallets/${orgId}/topups`, payload);
  return data;
};

export const login = async (payload: LoginRequest): Promise<JwtResponse> => {
  const { data } = await client.post<JwtResponse>('/auth/login', payload, {
    headers: { Authorization: '' }
  });
  return data;
};

export const register = async (payload: RegisterRequest): Promise<JwtResponse> => {
  const { data } = await client.post<JwtResponse>('/auth/register', payload, {
    headers: { Authorization: '' }
  });
  return data;
};

export const useFeatureFlags = (options?: UseQueryOptions<FeatureFlag[]>) =>
  useQuery({
    queryKey: keys.featureFlags,
    queryFn: getFeatureFlags,
    staleTime: 1000 * 60 * 5,
    ...options
  });

export const useMe = (options?: UseQueryOptions<User>) =>
  useQuery({
    queryKey: keys.me,
    queryFn: () => getMe(),
    staleTime: 1000 * 60,
    ...options
  });

export const useProducts = (
  params: Parameters<typeof getProducts>[0],
  options?: UseQueryOptions<PaginatedProducts>
) =>
  useQuery({
    queryKey: keys.products(params),
    queryFn: () => getProducts(params),
    keepPreviousData: true,
    ...options
  });

export const useProduct = (id: string, options?: UseQueryOptions<Product>) =>
  useQuery({
    queryKey: keys.product(id),
    queryFn: () => getProduct(id),
    enabled: Boolean(id),
    ...options
  });

export const useCreateRfq = (options?: UseMutationOptions<RFQ, unknown, RFQCreate>) =>
  useMutation({
    mutationFn: createRfq,
    ...options
  });

export const useAddRfqLine = (
  options?: UseMutationOptions<RFQLine, unknown, { rfqId: string; payload: RFQLineCreate }>
) =>
  useMutation({
    mutationFn: addRfqLine,
    ...options
  });

export const useIssueRfq = (
  options?: UseMutationOptions<RFQ, unknown, { rfqId: string }>
) =>
  useMutation({
    mutationFn: ({ rfqId }) => issueRfq(rfqId),
    ...options
  });

export const useListQuotes = (rfqId: string, options?: UseQueryOptions<Quote[]>) =>
  useQuery({
    queryKey: keys.quotes(rfqId),
    queryFn: () => listQuotes(rfqId),
    enabled: Boolean(rfqId),
    ...options
  });

export const useCreateQuote = (
  options?: UseMutationOptions<Quote, unknown, { rfqId: string; payload: QuoteCreate }>
) =>
  useMutation({
    mutationFn: createQuote,
    ...options
  });

export const useAcceptQuote = (
  options?: UseMutationOptions<Quote, unknown, { rfqId: string; quoteId: string }>
) =>
  useMutation({
    mutationFn: acceptQuote,
    ...options
  });

export const useCreateOrder = (options?: UseMutationOptions<Order, unknown, OrderCreate>) =>
  useMutation({
    mutationFn: createOrder,
    ...options
  });

export const useOrder = (orderId: string, options?: UseQueryOptions<Order>) =>
  useQuery({
    queryKey: keys.order(orderId),
    queryFn: () => getOrder(orderId),
    enabled: Boolean(orderId),
    ...options
  });

export const usePayOrderWithWallet = (
  options?: UseMutationOptions<Payment, unknown, { orderId: string }>
) =>
  useMutation({
    mutationFn: payOrderWithWallet,
    ...options
  });

export const useWallet = (orgId: string, options?: UseQueryOptions<Wallet>) =>
  useQuery({
    queryKey: keys.wallet(orgId),
    queryFn: () => getWallet(orgId),
    enabled: Boolean(orgId),
    ...options
  });

export const useTopUpWallet = (
  options?: UseMutationOptions<Wallet, unknown, { orgId: string; payload: WalletTopUpRequest }>
) =>
  useMutation({
    mutationFn: topUpWallet,
    ...options
  });

export const useLogin = (
  options?: UseMutationOptions<JwtResponse, unknown, LoginRequest>
) =>
  useMutation({
    mutationFn: login,
    ...options
  });

export const useRegister = (
  options?: UseMutationOptions<JwtResponse, unknown, RegisterRequest>
) =>
  useMutation({
    mutationFn: register,
    ...options
  });
