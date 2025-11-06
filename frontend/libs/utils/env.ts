export const getEnv = (key: string, fallback?: string): string => {
  const value =
    process.env[key] ??
    (typeof window !== 'undefined'
      ? (window as unknown as Record<string, string | undefined>)[key]
      : undefined);
  if (value === undefined || value === '') {
    if (fallback !== undefined) {
      return fallback;
    }
    throw new Error(`Missing environment variable ${key}`);
  }
  return value;
};

export const getApiBaseUrl = (): string =>
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api.example.com';
