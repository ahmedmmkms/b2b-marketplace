'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/libs/i18n/routing';
import type { Locale } from '@/libs/i18n/locales';
import { cn } from '@/libs/utils/cn';

export const LanguageSwitcher = () => {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('common.language');

  const switchLocale = (nextLocale: Locale) => {
    router.replace(pathname ?? '/', { locale: nextLocale });
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-slate-200 p-1">
      {(['en', 'ar'] as const).map((code) => (
        <button
          key={code}
          onClick={() => switchLocale(code)}
          className={cn(
            'rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-colors',
            locale === code ? 'bg-primary text-white' : 'text-slate-500 hover:text-primary'
          )}
          type="button"
        >
          {t(code)}
        </button>
      ))}
    </div>
  );
};
