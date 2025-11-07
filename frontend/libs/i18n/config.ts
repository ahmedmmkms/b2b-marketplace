import { DEFAULT_LOCALE, SUPPORTED_LOCALES, RTL_LOCALES } from '@/libs/config/env';

export const locales = SUPPORTED_LOCALES;
export const defaultLocale = DEFAULT_LOCALE;

export type Locale = (typeof locales)[number];

export const isLocale = (value: string | undefined): value is Locale =>
  value != null && locales.includes(value as Locale);

export const getDirection = (locale: string): 'ltr' | 'rtl' =>
  RTL_LOCALES.has(locale as Locale) ? 'rtl' : 'ltr';
