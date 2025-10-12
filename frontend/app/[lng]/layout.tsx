// app/[lng]/layout.tsx
import { notFound } from 'next/navigation';
import { languages } from '../../libs/i18n/settings';
import ClientProvider from '../client-provider';
import NavigationHeader from '../../components/NavigationHeader';
import { getMessages } from 'next-intl/server';

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default async function LocaleLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  // Ensure that the incoming locale is valid
  if (!languages.includes(lng as any)) {
    notFound();
  }

  // Load messages for the current locale using next-intl's getMessages
  const messages = await getMessages({ locale: lng });

  return (
    <html lang={lng} dir={lng === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <ClientProvider locale={lng} messages={messages}>
          <NavigationHeader locale={lng as 'en' | 'ar'} />
          <main>
            {children}
          </main>
        </ClientProvider>
      </body>
    </html>
  );
}

