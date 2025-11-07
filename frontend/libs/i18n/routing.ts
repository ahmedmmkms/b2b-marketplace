import { createNavigation } from 'next-intl/navigation';
import { defaultLocale, locales } from './config';

export const localePathnames = {
  '/': '/',
  '/catalog': '/catalog',
  '/product/[id]': '/product/[id]',
  '/rfq': '/rfq',
  '/rfq/new': '/rfq/new',
  '/quotes': '/quotes',
  '/orders': '/orders',
  '/orders/[orderId]': '/orders/[orderId]',
  '/supplier/quotes/inbox': '/supplier/quotes/inbox',
  '/wallet': '/wallet',
  '/admin/dashboard': '/admin/dashboard',
  '/admin/users': '/admin/users',
  '/admin/feature-flags': '/admin/feature-flags',
  '/auth/signin': '/auth/signin',
  '/auth/register': '/auth/register',
};

export const { Link, redirect, useRouter, usePathname } = createNavigation({
  locales,
  localePrefix: 'as-needed',
  defaultLocale,
  pathnames: localePathnames,
});
