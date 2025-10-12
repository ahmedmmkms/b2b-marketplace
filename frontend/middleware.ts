// middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // The locales you want to support
  locales: ['en', 'ar'],
  
  // The default locale
  defaultLocale: 'en',

  // When true, the locale detection and setting is done
  // automatically by next-intl middleware
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