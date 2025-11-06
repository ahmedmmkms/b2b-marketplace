'use client';

import { ReactNode, useEffect } from 'react';
import { QueryProvider } from './query-provider';
import { ThemeProvider } from 'next-themes';
import { usePathname } from '@/libs/i18n/routing';
import { useAuthStore } from '@/libs/store/auth-store';
import type { FeatureFlag, User } from '@/libs/api/generated';
import { useFeatureFlagStore } from '@/libs/store/feature-flag-store';
import { AppShell } from '@/components/common/AppShell';
import { ToastViewport } from '@/components/common/Toast';
import { subscribeToAppEvent } from '@/libs/utils/events';
import { useToast } from '@/components/ui/use-toast';

interface AppProvidersProps {
  children: ReactNode;
  user: User | null;
  featureFlags: FeatureFlag[];
}

export const AppProviders = ({ children, user, featureFlags }: AppProvidersProps) => {
  const pathname = usePathname();
  const hydrateUser = useAuthStore((state) => state.hydrate);
  const hydrateFlags = useFeatureFlagStore((state) => state.hydrate);
  const { toast } = useToast();

  useEffect(() => {
    hydrateUser(user ?? null);
    hydrateFlags(featureFlags ?? []);
  }, [user, featureFlags, hydrateUser, hydrateFlags]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    return subscribeToAppEvent('http:error', ({ message }) => {
      toast({
        variant: 'destructive',
        title: message
      });
    });
  }, [toast]);

  const isAuthRoute = pathname?.startsWith('/auth') ?? false;

  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
      <QueryProvider>
        <AppShell showChrome={!isAuthRoute}>{children}</AppShell>
      </QueryProvider>
      <ToastViewport />
    </ThemeProvider>
  );
};
