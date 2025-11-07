import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from '@/libs/i18n';

const middleware = createMiddleware({
  defaultLocale,
  locales,
  localePrefix: 'as-needed',
});

export default middleware;

export const config = {
  matcher: ['/((?!_next|api|_vercel|.*\\..*).*)'],
};
