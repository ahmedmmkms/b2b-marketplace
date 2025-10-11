// app/[lng]/catalog/__tests__/CatalogPage.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CatalogPage from '../page';

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

// Mock the API service
vi.mock('../../../../libs/api/catalog/service', () => ({
  useProducts: vi.fn(() => ({ 
    data: [
      {
        id: 'prod-1',
        name: 'Industrial Drill',
        description: 'High-powered industrial drill for heavy-duty applications',
        price: 249.99,
        category: 'Tools',
        inStock: true,
        quantity: 15
      }
    ], 
    isLoading: false, 
    isError: false 
  })),
}));

describe('CatalogPage', () => {
  it('renders the catalog page with products', async () => {
    // Since the component is async, we need to handle it properly
    const CatalogPageWithParams = () => <CatalogPage params={{ lng: 'en' }} />;
    
    render(<CatalogPageWithParams />);
    
    // Check if the catalog title is present
    expect(await screen.findByText('Product Catalog')).toBeInTheDocument();
    
    // Check if a product is displayed
    expect(screen.getByText('Industrial Drill')).toBeInTheDocument();
    expect(screen.getByText('High-powered industrial drill for heavy-duty applications')).toBeInTheDocument();
    expect(screen.getByText('249.99 SAR')).toBeInTheDocument();
    expect(screen.getByText('In Stock')).toBeInTheDocument();
  });
});