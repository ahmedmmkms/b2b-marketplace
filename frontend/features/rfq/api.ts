// API utility for RFQ and Quotes
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// RFQ API functions
export const rfqApi = {
  // Create a new RFQ
  createRFQ: async (rfqData: any): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/rfqs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming JWT token stored in localStorage
      },
      body: JSON.stringify(rfqData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to create RFQ');
    }

    return await response.json();
  },

  // Get an RFQ by ID
  getRFQ: async (rfqId: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/rfqs/${rfqId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to fetch RFQ');
    }

    return await response.json();
  },

  // Add a line to an RFQ
  addRFQLine: async (rfqId: string, lineData: any): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/rfqs/${rfqId}/lines`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(lineData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to add RFQ line');
    }

    return await response.json();
  },

  // Issue an RFQ (transition from draft to issued)
  issueRFQ: async (rfqId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/rfqs/${rfqId}/issue`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to issue RFQ');
    }
  }
};

// Quote API functions
export const quoteApi = {
  // Submit a quote for an RFQ
  submitQuote: async (rfqId: string, quoteData: any): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/rfqs/${rfqId}/quotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(quoteData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to submit quote');
    }

    return await response.json();
  },

  // Get all quotes for an RFQ
  getQuotesForRFQ: async (rfqId: string): Promise<any[]> => {
    const response = await fetch(`${API_BASE_URL}/rfqs/${rfqId}/quotes`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to fetch quotes');
    }

    const data = await response.json();
    // Sort by grandTotal ascending (as specified in the requirements)
    return data.sort((a: any, b: any) => a.grandTotal - b.grandTotal);
  },

  // Accept a quote
  acceptQuote: async (rfqId: string, quoteId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/rfqs/${rfqId}/quotes/${quoteId}/accept`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to accept quote');
    }
  }
};