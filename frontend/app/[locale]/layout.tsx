import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import '@/styles/globals.css';
import { APP_NAME } from '@/libs/config/env';
import { defaultLocale, getDirection, isLocale, locales } from '@/libs/i18n';
import { QueryProvider } from '@/app/query-provider';
import { ThemeProvider } from '@/components/common/theme-provider';
import { Toaster } from '@/components/common/toast';
import { AppBootstrap } from '@/app/providers';
import { cairo, heading, inter } from '@/libs/config/fonts';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: APP_NAME,
  description:
    'Centralized procurement workflows for GCC & MENA enterprises with bilingual buyer and supplier journeys.',
};

type LocaleLayoutProps = {
  children: ReactNode;
  params: { locale?: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const locale = params.locale ?? defaultLocale;

  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html
      lang={locale}
      dir={getDirection(locale)}
      className={`${inter.variable} ${cairo.variable} ${heading.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <QueryProvider>
              <AppBootstrap>{children}</AppBootstrap>
              <Toaster />
            </QueryProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
