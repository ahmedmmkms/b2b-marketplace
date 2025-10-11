// tests/setup.ts
import '@testing-library/jest-dom/vitest';

// Mock Next.js modules
vi.mock('next/router', async () => {
  const actual = await vi.importActual('next/router');
  return {
    ...actual,
    useRouter: () => ({
      query: {},
      pathname: '',
      asPath: '',
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    }),
  };
});

vi.mock('next/headers', () => ({
  headers: vi.fn(() => new Map()),
}));

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      query: {},
      pathname: '',
      asPath: '',
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      get: vi.fn(),
    })),
    useParams: vi.fn(() => ({})),
    usePathname: vi.fn(),
    redirect: vi.fn(),
    permanentRedirect: vi.fn(),
    notFound: vi.fn(),
  };
});

vi.mock('next-intl', async () => {
  const actual = await vi.importActual('next-intl');
  return {
    ...actual,
    useTranslations: vi.fn(() => (key: string) => key),
    useLocale: vi.fn(() => 'en'),
    getTranslations: vi.fn(async ({ namespace }) => (key: string) => `${namespace}.${key}`),
    usePathname: vi.fn(() => '/'),
    useSearchParams: vi.fn(() => new URLSearchParams()),
    useLocalizePath: vi.fn(() => (path: string) => path),
  };
});

vi.mock('next-intl/server', async () => {
  const actual = await vi.importActual('next-intl/server');
  return {
    ...actual,
    getTranslations: vi.fn(async ({ namespace }) => (key: string) => `${namespace}.${key}`),
  };
});