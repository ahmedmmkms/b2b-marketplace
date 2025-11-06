import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { AppProviders } from '../providers';
import { getMessages } from '@/libs/i18n/get-messages';
import { Locale, locales, isRTL } from '@/libs/i18n/locales';
import { getFeatureFlags, getMe } from '@/libs/api/generated';
import { cookies } from 'next/headers';
import { Inter, Cairo } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const cairo = Cairo({ subsets: ['arabic'], variable: '--font-cairo', display: 'swap' });

type LayoutProps = {
  children: ReactNode;
  params: {
    lng: Locale;
  };
};

export async function generateStaticParams() {
  return locales.map((lng) => ({ lng }));
}

async function loadUser() {
  const token = cookies().get('auth-token')?.value;
  if (!token) return null;
  try {
    return await getMe({ headers: { Authorization: `Bearer ${token}` } });
  } catch {
    return null;
  }
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { lng } = params;

  if (!locales.includes(lng)) {
    notFound();
  }

  const [messages, featureFlags, user] = await Promise.all([
    getMessages(lng),
    getFeatureFlags().catch(() => []),
    loadUser()
  ]);

  const direction = isRTL(lng) ? 'rtl' : 'ltr';
  const t = await getTranslations({ locale: lng, namespace: 'meta' });

  return (
    <html
      lang={lng}
      dir={direction}
      className={`${inter.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <head>
        <title>{t('title')}</title>
        <meta name="description" content={t('description')} />
      </head>
      <body data-locale={lng} data-direction={direction}>
        <NextIntlClientProvider locale={lng} messages={messages}>
          <AppProviders user={user} featureFlags={featureFlags}>
            {children}
          </AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
