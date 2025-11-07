import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from '@/libs/i18n';

export default createMiddleware({
  defaultLocale,
  locales,
  localePrefix: 'as-needed',
});

export const config = {
  matcher: ['/', '/(en|ar)/:path*'],
};
