import { create } from 'zustand';
import type { FeatureFlag } from '../api/generated';

interface FeatureFlagState {
  flags: Record<string, FeatureFlag>;
  hydrate: (flags: FeatureFlag[]) => void;
  isEnabled: (flag: string) => boolean;
}

export const useFeatureFlagStore = create<FeatureFlagState>((set, get) => ({
  flags: {},
  hydrate: (flags) =>
    set({
      flags: flags.reduce((acc, flag) => {
        if (!flag.key) {
          return acc;
        }
        acc[flag.key] = flag;
        return acc;
      }, {} as Record<string, FeatureFlag>)
    }),
  isEnabled: (flag) => get().flags[flag]?.enabled ?? false
}));
