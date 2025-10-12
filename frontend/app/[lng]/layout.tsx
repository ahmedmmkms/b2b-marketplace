// app/[lng]/layout.tsx
import { notFound } from 'next/navigation';
import { languages } from '../../libs/i18n/settings';
import ClientProvider from '../client-provider';
import NavigationHeader from '../../components/NavigationHeader';

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

  // Load messages for the current locale using static imports
  let messages;
  try {
    if (lng === 'en') {
      const enMessages = await import('../../messages/en.json');
      messages = enMessages.default;
    } else if (lng === 'ar') {
      const arMessages = await import('../../messages/ar.json');
      messages = arMessages.default;
    } else {
      // If we reach here, the locale is not supported
      notFound();
    }
  } catch (error) {
    console.error(`Failed to load messages for locale: ${lng}`, error);
    notFound();
  }

  return (
    <html lang={lng} dir={lng === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <ClientProvider locale={lng} messages={messages}>
          <NavigationHeader />
          <main>
            {children}
          </main>
        </ClientProvider>
      </body>
    </html>
  );
}