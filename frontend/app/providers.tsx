'use client';

import { useBootstrapFeatureFlags } from '@/libs/utils/feature-flags';

export const AppBootstrap = ({ children }: { children: React.ReactNode }) => {
  useBootstrapFeatureFlags();
  return <>{children}</>;
};
