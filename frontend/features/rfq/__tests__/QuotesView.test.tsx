import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import QuotesView from './QuotesView';
import { quoteApi } from './api';

// Mock the API module
jest.mock('./api', () => ({
  quoteApi: {
    getQuotesForRFQ: jest.fn(),
    acceptQuote: jest.fn(),
  }
}));

// Mock localStorage
const mockLocalStorage = (() => {
  let store: any = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: any) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

describe('QuotesView', () => {
  const rfqId = 'test-rfq-id';

  beforeEach(() => {
    jest.clearAllMocks();
    (quoteApi.getQuotesForRFQ as jest.MockedFunction<any>).mockResolvedValue([
      {
        id: 'quote1',
        rfqId,
        vendorId: 'vendor1',
        currency: 'USD',
        status: 'submitted',
        subtotal: 1000,
        taxTotal: 100,
        grandTotal: 1100,
        lines: [
          {
            id: 'line1',
            rfqLineId: 'rfqLine1',
            productId: 'prod1',
            description: 'Test Product 1',
            quantity: 10,
            uom: 'units',
            unitPrice: 100,
            lineTotal: 1000,
            moq: 5,
            leadTimeDays: 10
          }
        ]
      },
      {
        id: 'quote2',
        rfqId,
        vendorId: 'vendor2',
        currency: 'USD',
        status: 'submitted',
        subtotal: 950,
        taxTotal: 95,
        grandTotal: 1045,
        lines: [
          {
            id: 'line2',
            rfqLineId: 'rfqLine1',
            productId: 'prod1',
            description: 'Test Product 1',
            quantity: 10,
            uom: 'units',
            unitPrice: 95,
            lineTotal: 950,
            moq: 3,
            leadTimeDays: 7
          }
        ]
      }
    ]);
  });

  it('should fetch and display quotes', async () => {
    render(<QuotesView rfqId={rfqId} />);

    // Check for the spinner element in the loading state
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('vendor1')).toBeInTheDocument();
      expect(screen.getByText('vendor2')).toBeInTheDocument();
    });

    // Check that the vendors are displayed in the table
    expect(screen.getByText('vendor1')).toBeInTheDocument();
    expect(screen.getByText('vendor2')).toBeInTheDocument();
    
    // Check that pricing information is displayed
    expect(screen.getByText('$1,000.00')).toBeInTheDocument(); // subtotal for vendor1
    expect(screen.getByText('$1,100.00')).toBeInTheDocument(); // grandTotal for vendor1
    expect(screen.getByText('$950.00')).toBeInTheDocument(); // subtotal for vendor2
    expect(screen.getByText('$1,045.00')).toBeInTheDocument(); // grandTotal for vendor2
    
    // Check MOQ and lead time are displayed
    expect(screen.getByText('MOQ: 5')).toBeInTheDocument();
    expect(screen.getByText('Lead: 10 days')).toBeInTheDocument();
    expect(screen.getByText('MOQ: 3')).toBeInTheDocument();
    expect(screen.getByText('Lead: 7 days')).toBeInTheDocument();
  });

  it('should handle accepting a quote', async () => {
    (quoteApi.acceptQuote as jest.MockedFunction<any>).mockResolvedValue(undefined);
    
    render(<QuotesView rfqId={rfqId} />);

    await waitFor(() => {
      expect(screen.getByText('Accept Quote')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Accept Quote'));

    // Simulate the confirm dialog returning true
    Object.defineProperty(window, 'confirm', {
      writable: true,
      value: jest.fn(() => true)
    });

    // Click the accept button again after setting up the confirm mock
    fireEvent.click(screen.getByText('Accept Quote'));

    await waitFor(() => {
      expect(quoteApi.acceptQuote).toHaveBeenCalledWith(rfqId, 'quote1');
    });
  });
});