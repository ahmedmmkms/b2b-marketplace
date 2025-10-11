// libs/i18n/settings.ts

export const languages = [
  'en',
  'ar'
];

export type Language = (typeof languages)[number];

export const defaultLanguage: Language = 'en';

// Define a list of namespaces that will be loaded for each language
export const namespaces = [
  'HomePage',
  'Navigation',
  'Catalog',
  'RFQ',
  'Orders',
  'Invoices',
  'Wallet',
  'Loyalty',
  'Common'
];