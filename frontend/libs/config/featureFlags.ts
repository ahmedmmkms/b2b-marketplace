// libs/config/featureFlags.ts
export interface FeatureFlags {
  'catalog.publicBrowse': boolean;
  'search.enabled': boolean;
  'rfq.enabled': boolean;
  'quote.vendorConsole': boolean;
  'orders.checkout': boolean;
  'payments.gateway1': boolean;
  'wallet.basic': boolean;
  'invoice.vat': boolean;
  'loyalty.core': boolean;
  'credit.controls': boolean;
}

// Default feature flags - these can be overridden by environment variables or API
const defaultFlags: FeatureFlags = {
  'catalog.publicBrowse': true,
  'search.enabled': true,
  'rfq.enabled': true,
  'quote.vendorConsole': false,
  'orders.checkout': false,
  'payments.gateway1': false,
  'wallet.basic': true,
  'invoice.vat': false,
  'loyalty.core': true,
  'credit.controls': false,
};

// Function to get feature flag value
export const getFeatureFlag = (flag: keyof FeatureFlags): boolean => {
  // First check environment variables
  const envValue = process.env[`FEATURE_${flag.toUpperCase().replace(/\./g, '_')}`];
  if (envValue !== undefined) {
    return envValue.toLowerCase() === 'true';
  }
  
  // Fallback to default value
  return defaultFlags[flag] || false;
};

// Function to get all feature flags
export const getAllFeatureFlags = (): FeatureFlags => {
  const flags: Partial<FeatureFlags> = {};
  
  // Check each flag in defaultFlags against environment variables
  Object.keys(defaultFlags).forEach(key => {
    const flagKey = key as keyof FeatureFlags;
    const envValue = process.env[`FEATURE_${key.toUpperCase().replace(/\./g, '_')}`];
    
    if (envValue !== undefined) {
      flags[flagKey] = envValue.toLowerCase() === 'true';
    } else {
      flags[flagKey] = defaultFlags[flagKey];
    }
  });
  
  return flags as FeatureFlags;
};

// React hook for using feature flags
export const useFeatureFlag = (flag: keyof FeatureFlags): boolean => {
  // In a real implementation, this would use a state management solution
  // to allow for dynamic updates to feature flags
  return getFeatureFlag(flag);
};