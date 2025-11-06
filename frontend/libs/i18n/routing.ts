import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { defaultLocale, locales } from './locales';

export const routing = {
  locales,
  defaultLocale,
  pathnames: {
    '/': '/',
    '/catalog': '/catalog',
    '/product/[id]': '/product/[id]',
    '/rfq': '/rfq',
    '/rfq/new': '/rfq/new',
    '/quotes': '/quotes',
    '/supplier/quotes/inbox': '/supplier/quotes/inbox',
    '/orders': '/orders',
    '/orders/[orderId]': '/orders/[orderId]',
    '/wallet': '/wallet',
    '/auth/signin': '/auth/signin',
    '/auth/register': '/auth/register',
    '/admin/dashboard': '/admin/dashboard',
    '/admin/users': '/admin/users',
    '/admin/feature-flags': '/admin/feature-flags'
  }
} as const;

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation(routing);
