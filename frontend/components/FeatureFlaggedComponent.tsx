// components/FeatureFlaggedComponent.tsx
import React, { type ReactNode } from 'react';
import { useFeatureFlag } from '../libs/providers/FeatureFlagProvider';

interface FeatureFlaggedComponentProps {
  flag: string;
  children: ReactNode;
  fallback?: ReactNode;
}

export default function FeatureFlaggedComponent({
  flag,
  children,
  fallback = null
}: FeatureFlaggedComponentProps) {
  // Type assertion since we're receiving the flag as a string prop
  const isEnabled = useFeatureFlag(flag as any);

  if (!isEnabled) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
