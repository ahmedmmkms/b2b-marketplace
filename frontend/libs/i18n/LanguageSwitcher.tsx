'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

import { Button } from '@/libs/ui/button';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const toggleLocale = () => {
    // Simple toggle between Arabic and English
    const newLocale = locale === 'en' ? 'ar' : 'en';
    
    // Replace the locale in the pathname
    const newPathname = pathname.replace(
      new RegExp(`^/${locale}`),
      newLocale === 'en' ? '' : `/${newLocale}`
    );
    
    router.replace(newPathname);
  };

  return (
    <Button onClick={toggleLocale} variant="outline" size="sm">
      {locale === 'en' ? 'العربية' : 'English'}
    </Button>
  );
}