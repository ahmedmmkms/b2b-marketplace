import { create } from 'zustand';
import type { FeatureFlag } from '@/libs/api';

type FeatureFlagValueType = FeatureFlag['value'] | boolean | number | string | undefined;
type FeatureFlagMap = Record<string, FeatureFlagValueType>;

interface FeatureFlagsState {
  flags: FeatureFlagMap;
  updateFlags: (flags: FeatureFlag[]) => void;
  setFlag: (key: string, value: FeatureFlagValueType) => void;
  getFlag: <T = unknown>(key: string, fallback?: T) => T | FeatureFlagValueType;
}

const normalizeFlags = (flags: FeatureFlag[]): FeatureFlagMap =>
  flags.reduce<FeatureFlagMap>((acc, flag) => {
    if (!flag.key) {
      return acc;
    }
    acc[flag.key] = flag.value ?? true;
    return acc;
  }, {});

export const useFeatureFlagsStore = create<FeatureFlagsState>((set, get) => ({
  flags: {},
  updateFlags: (flags) => set({ flags: normalizeFlags(flags) }),
  setFlag: (key, value) => set((state) => ({ flags: { ...state.flags, [key]: value } })),
  getFlag: <T = unknown>(key: string, fallback?: T) => {
    const value = get().flags[key];
    return (value ?? fallback) as T | FeatureFlagValueType;
  },
}));

export const isFeatureEnabled = (key: string, fallback = false): boolean => {
  const value = useFeatureFlagsStore.getState().flags[key];
  if (typeof value === 'boolean') {
    return value;
  }
  if (value == null) {
    return fallback;
  }
  if (typeof value === 'object') {
    return true;
  }
  return Boolean(value);
};
