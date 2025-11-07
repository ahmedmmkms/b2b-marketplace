'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/libs/i18n/routing';

const localeLabels: Record<string, string> = {
  en: 'English',
  ar: 'العربية',
};

export const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const changeLanguage = (nextLocale: string) => {
    if (nextLocale === locale) return;
    startTransition(() => {
      router.replace(pathname as Parameters<typeof router.replace>[0], { locale: nextLocale });
    });
  };

  return (
    <select
      className="rounded-md border border-input bg-background px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      value={locale}
      onChange={(event) => changeLanguage(event.target.value)}
      aria-label="Change language"
    >
      {Object.entries(localeLabels).map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};
