import type { Locale } from './locales';

export async function getMessages(locale: Locale) {
  switch (locale) {
    case 'en':
      return (await import('../../messages/en.json')).default;
    case 'ar':
      return (await import('../../messages/ar.json')).default;
    default:
      return (await import('../../messages/en.json')).default;
  }
}
