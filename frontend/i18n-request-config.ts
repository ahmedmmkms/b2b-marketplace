import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

export const locales = ['en', 'ar'] as const;
export const defaultLocale = 'en';

type SupportedLocale = (typeof locales)[number];

export default getRequestConfig(async ({requestLocale}) => {
  const resolvedLocale = (await requestLocale) ?? defaultLocale;

  if (!locales.includes(resolvedLocale as SupportedLocale)) {
    notFound();
  }

  const locale = resolvedLocale as SupportedLocale;

  try {
    return {
      locale,
      messages: (await import(`./messages/${locale}.json`)).default
    };
  } catch (error) {
    console.warn(`Failed to load messages for locale "${locale}":`, error);
    return {
      locale,
      messages: {}
    };
  }
});
