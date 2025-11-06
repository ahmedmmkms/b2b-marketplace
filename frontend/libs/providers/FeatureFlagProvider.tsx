// libs/providers/FeatureFlagProvider.tsx
'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { getAllFeatureFlags, FeatureFlags } from '../config/featureFlags';

interface FeatureFlagContextType {
  flags: FeatureFlags;
  updateFlag: (flag: keyof FeatureFlags, value: boolean) => void;
}

const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(undefined);

export function FeatureFlagProvider({ children }: { children: ReactNode }) {
  const [flags, setFlags] = useState<FeatureFlags>(getAllFeatureFlags());

  // In a real implementation, this might fetch flags from an API
  useEffect(() => {
    setFlags(getAllFeatureFlags());
  }, []);

  const updateFlag = (flag: keyof FeatureFlags, value: boolean) => {
    setFlags(prev => ({
      ...prev,
      [flag]: value
    }));
  };

  return (
    <FeatureFlagContext.Provider value={{ flags, updateFlag }}>
      {children}
    </FeatureFlagContext.Provider>
  );
}

export function useFeatureFlagContext() {
  const context = useContext(FeatureFlagContext);
  if (context === undefined) {
    throw new Error('useFeatureFlagContext must be used within a FeatureFlagProvider');
  }
  return context;
}

// Custom hook for easy access to a specific flag
export function useFeatureFlag(flag: keyof FeatureFlags): boolean {
  const context = useFeatureFlagContext();
  return context.flags[flag];
}

// Higher-order component to conditionally render based on feature flag
export function withFeatureFlag<T extends Record<string, unknown>>(
  WrappedComponent: React.ComponentType<T>,
  flag: keyof FeatureFlags
) {
  return function WithFeatureFlagComponent(props: T) {
    const isEnabled = useFeatureFlag(flag);
    
    if (!isEnabled) {
      return null; // or some fallback component
    }
    
    return <WrappedComponent {...props} />;
  };
}
