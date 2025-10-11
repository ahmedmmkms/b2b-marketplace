// components/__tests__/NavigationHeader.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NavigationHeader from '../NavigationHeader';

// Mock next-intl
vi.mock('next-intl', () => ({
  useLocale: () => 'en',
}));

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async (args: any) => (key: string) => key),
}));

vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(),
  useParams: vi.fn(() => ({ lng: 'en' })),
  usePathname: vi.fn(),
  useRouter: vi.fn(),
}));

describe('NavigationHeader', () => {
  it('renders the header with navigation links', () => {
    render(<NavigationHeader />);
    
    // Check if the main header element is present
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    
    // Check if logo is present
    const logo = screen.getByText('P4 Marketplace');
    expect(logo).toBeInTheDocument();
    
    // Check if navigation links are present
    expect(screen.getByText('Catalog')).toBeInTheDocument();
    expect(screen.getByText('RFQ')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByText('Invoices')).toBeInTheDocument();
    expect(screen.getByText('Wallet')).toBeInTheDocument();
    expect(screen.getByText('Loyalty')).toBeInTheDocument();
    
    // Check if language switcher is present
    expect(screen.getByRole('button', { name: /English|العربية/ })).toBeInTheDocument();
    
    // Check if sign in button is present
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });
});