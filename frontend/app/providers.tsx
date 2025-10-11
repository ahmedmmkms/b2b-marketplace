// app/providers.tsx
'use client';

import { NextIntlClientProvider, useMessages } from 'next-intl';
import { ReactNode } from 'react';

export function I18nProvider({
  children,
  locale,
  messages
}: {
  children: ReactNode;
  locale: string;
  messages: Record<string, any>;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}