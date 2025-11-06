// app/[lng]/catalog/__tests__/CatalogPage.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi } from 'vitest';
import CatalogPage from '../page';

// Mock next-intl client hook
vi.mock('next-intl', () => ({
  useTranslations: vi.fn((namespace: string) => {
    const translations: Record<string, string> = {
      'catalog.title': 'Product Catalog',
      'catalog.publicDisabled': 'Public browsing disabled',
      'common.actions.signin': 'Sign In'
    };
    return (key: string) => translations[`${namespace}.${key}`] || key;
  })
}));

// Mock next-intl
vi.mock('next-intl/server', async () => ({
  getTranslations: vi.fn(async ({ namespace }: { namespace: string }) => (key: string) => {
    const translations: Record<string, string> = {
      'Catalog.title': 'Product Catalog',
      'Catalog.search': 'Search products...',
      'Catalog.categories': 'Categories',
      'Catalog.products': 'Products',
      'Catalog.product_details': 'Product Details',
      'Catalog.add_to_cart': 'Add to Cart',
      'Catalog.out_of_stock': 'Out of Stock'
    };
    return translations[`${namespace}.${key}`] || key;
  }),
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
  useSearchParams: vi.fn(),
  useParams: vi.fn(() => ({ lng: 'en' })),
  usePathname: vi.fn(),
  useRouter: vi.fn(),
}));

vi.mock('@/libs/i18n/routing', () => ({
  Link: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
  usePathname: vi.fn(),
  useRouter: vi.fn(() => ({ push: vi.fn(), replace: vi.fn() })),
  useLocale: vi.fn(() => 'en')
}));

// Mock the API service
vi.mock('@/libs/api/generated', () => ({
  useProducts: vi.fn(() => ({
    data: {
      items: [
        {
          id: 'prod-1',
          name: 'Industrial Drill',
          description: 'High-powered industrial drill for heavy-duty applications',
          price: 249.99,
          category: 'Tools',
          currency: 'SAR'
        }
      ],
      totalPages: 1
    },
    isFetching: false,
    isError: false,
    isLoading: false
  }))
}));

vi.mock('@/libs/store/feature-flag-store', () => ({
  useFeatureFlagStore: vi.fn((selector: any) =>
    selector
      ? selector({
          isEnabled: () => true,
          hydrate: vi.fn()
        })
      : { isEnabled: () => true }
  )
}));

describe('CatalogPage', () => {
  it('renders the catalog page with products', async () => {
    const queryClient = new QueryClient();
    // Since the component is async, we need to handle it properly
    render(
      <QueryClientProvider client={queryClient}>
        <CatalogPage />
      </QueryClientProvider>
    );
    
    // Check if the catalog title is present
    const titles = await screen.findAllByText('Product Catalog');
    expect(titles.length).toBeGreaterThan(0);
    
    // Check if a product is displayed
    expect(screen.getByText('Industrial Drill')).toBeInTheDocument();
    expect(screen.getByText('Tools')).toBeInTheDocument();
    expect(screen.getByText('249.99 SAR')).toBeInTheDocument();
    expect(screen.getByText('Page 1 / 1')).toBeInTheDocument();
  });
});
