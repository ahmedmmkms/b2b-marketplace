// libs/i18n/i18n-config.ts
import {getRequestConfig} from 'next-intl/server';
import {defaultLanguage, languages, namespaces} from './settings';

export const i18n = {
  defaultLocale: defaultLanguage,
  locales: languages,
  namespaces
};

// Use the default locale or the first locale that matches the user's browser
// locale from the list of supported locales.
export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming locale is valid
  if (!i18n.locales.includes(locale as any)) {
    locale = i18n.defaultLocale;
  }

  // Load the translation files for the locale
  return {
    messages: {
      ...(await import(`../messages/${locale}.json`)).default,
    },
  };
});