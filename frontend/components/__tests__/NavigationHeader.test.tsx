// components/__tests__/NavigationHeader.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NavigationHeader from '../NavigationHeader';

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
}));

describe('NavigationHeader', () => {
  it('renders the header with navigation links', () => {
    render(<NavigationHeader locale="en" />);
    
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
    
    // Locale indicator should be visible
    expect(screen.getByText('English')).toBeInTheDocument();
    
    // Check if sign in button is present
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });
});