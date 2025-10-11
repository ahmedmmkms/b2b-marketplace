// libs/config/api.ts
// API Configuration

// Default base URL for the backend API
const API_URL_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

// API endpoints configuration using the base URL
export const API_ENDPOINTS = {
  // Base URL
  BASE: API_URL_BASE,

  // Module-specific endpoints
  CATALOG: `${API_URL_BASE}/catalog`,
  RFQ: `${API_URL_BASE}/rfq`,
  QUOTES: `${API_URL_BASE}/quotes`,
  ORDERS: `${API_URL_BASE}/orders`,
  PAYMENTS: `${API_URL_BASE}/payments`,
  INVOICING: `${API_URL_BASE}/invoicing`,
  WALLET: `${API_URL_BASE}/wallet`,
  LOYALTY: `${API_URL_BASE}/loyalty`,
  IDENTITY: `${API_URL_BASE}/identity`,
} as const;

// Type for API endpoints
export type ApiEndpoint = keyof typeof API_ENDPOINTS;