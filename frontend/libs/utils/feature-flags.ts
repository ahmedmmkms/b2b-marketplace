import { useEffect } from 'react';
import { useFeatureFlags } from '@/libs/api';
import { useFeatureFlagsStore } from '@/libs/store/feature-flags-store';

const defaultFlags = {
  'catalog.publicBrowse': true,
  'search.enabled': true,
  'rfq.enabled': true,
  'wallet.basic': false,
} as const;

type DefaultFlagKeys = keyof typeof defaultFlags;

export const useFeatureFlag = <
  TDefault extends boolean | number | string | Record<string, unknown>,
>(
  key: string,
  fallback?: TDefault,
) => {
  const store = useFeatureFlagsStore();
  const value = store.flags[key];
  if (value == null) {
    return fallback ?? (defaultFlags[key as DefaultFlagKeys] as TDefault | undefined);
  }
  return value as TDefault;
};

export const useBootstrapFeatureFlags = (): void => {
  const { data } = useFeatureFlags({
    query: {
      staleTime: 5 * 60 * 1000,
    },
  });

  useEffect(() => {
    if (data) {
      useFeatureFlagsStore.getState().updateFlags(data);
    }
  }, [data]);
};
