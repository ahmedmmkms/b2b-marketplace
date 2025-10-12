// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { i18n } from './libs/i18n/i18n-config';

export default createMiddleware({
  locales: i18n.locales,
  defaultLocale: i18n.defaultLocale,
  localeDetection: true
});

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|favicon.ico|api|trpc).*)',
    // Optional: only run on root (/) and internal pages (/dashboard)
    // '/',
  ],
};