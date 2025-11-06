// app/client-provider.tsx
'use client';

import { NextIntlClientProvider } from 'next-intl';
import { ReactNode, useEffect, useState } from 'react';
import { QueryProvider } from './query-provider';
import { FeatureFlagProvider } from '../libs/providers/FeatureFlagProvider';
import { A11yProvider } from '../libs/providers/A11yProvider';

export default function ClientProvider({
  children,
  locale,
  messages
}: {
  children: ReactNode;
  locale: string;
  messages: Record<string, any>;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>; // Render without provider during SSR
  }

  return (
    <A11yProvider>
      <FeatureFlagProvider>
        <QueryProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </QueryProvider>
      </FeatureFlagProvider>
    </A11yProvider>
  );
}
