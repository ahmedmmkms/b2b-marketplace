// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { i18nRouter } from 'next-i18n-router';
import { i18n } from './libs/i18n/i18n-config';

export function middleware(request: NextRequest) {
  return i18nRouter(request, i18n);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) and internal pages (/dashboard)
    // '/:path*',
  ],
};