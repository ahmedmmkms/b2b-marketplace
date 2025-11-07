import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { locales, isLocale } from '@/libs/i18n';

type LocaleLayoutProps = {
  children: ReactNode;
  params: { lng: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ lng: locale }));
}

export default function LocaleLayout({ children, params: { lng } }: LocaleLayoutProps) {
  if (!isLocale(lng)) {
    notFound();
  }

  setRequestLocale(lng);

  return <>{children}</>;
}
