// src/app/core/feature-flags/types/feature-flag.types.ts

export interface FeatureFlag {
  key: string;
  enabled: boolean;
  rolloutPercentage?: number; // 0-100 percentage
  description: string;
  dependencies?: string[]; // Other flags this flag depends on
  tags?: string[]; // For categorization
}

export interface FeatureFlagsConfig {
  [key: string]: FeatureFlag;
}

export enum FeatureFlagName {
  CATALOG_PUBLIC_BROWSE = 'catalog.publicBrowse',
  SEARCH_ENABLED = 'search.enabled',
  RFQ_ENABLED = 'rfq.enabled',
  ORDERS_CHECKOUT = 'orders.checkout',
  PAYMENTS_GATEWAY1 = 'payments.gateway1',
  WALLET_BASIC = 'wallet.basic',
  INVOICE_VAT = 'invoice.vat',
  LOYALTY_CORE = 'loyalty.core',
  CREDIT_CONTROLS = 'credit.controls'
}