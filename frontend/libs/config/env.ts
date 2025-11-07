export const APP_NAME = 'B2B Marketplace';

export const DEFAULT_LOCALE = 'en';

export const SUPPORTED_LOCALES = ['en', 'ar'] as const;

export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

export const RTL_LOCALES = new Set<AppLocale>(['ar']);

export const getLocaleDirection = (locale: string): 'ltr' | 'rtl' =>
  RTL_LOCALES.has(locale as AppLocale) ? 'rtl' : 'ltr';

export const getEnv = () => ({
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api.example.com',
  appBaseUrl: process.env.NEXT_PUBLIC_APP_BASE_URL ?? 'http://localhost:3000',
});
