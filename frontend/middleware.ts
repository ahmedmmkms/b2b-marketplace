import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n/routing';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed' // Remove prefix for default locale
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    '/',
    '/(ar|en)/:path*',
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};