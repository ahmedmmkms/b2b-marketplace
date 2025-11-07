import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import '@/styles/globals.css';
import { APP_NAME } from '@/libs/config/env';
import { getDirection, isLocale, defaultLocale } from '@/libs/i18n';
import { QueryProvider } from '@/app/query-provider';
import { ThemeProvider } from '@/components/common/theme-provider';
import { Toaster } from '@/components/common/toast';
import { inter, cairo, heading } from '@/libs/config/fonts';
import { AppBootstrap } from '@/app/providers';

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'Digital B2B Marketplace for the MENA region connecting buyers and suppliers.',
};

type RootLayoutProps = {
  children: React.ReactNode;
  params: { lng?: string };
};

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const locale = params.lng ?? defaultLocale;

  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = (await import(`../messages/${locale}.json`)).default;

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
