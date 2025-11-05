'use client';

import React, { useState, useEffect } from 'react';
import { Quote } from './types';
import { quoteApi } from './api';

interface QuotesViewProps {
  rfqId: string;
}

const QuotesView: React.FC<QuotesViewProps> = ({ rfqId }) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [acceptedQuoteId, setAcceptedQuoteId] = useState<string | null>(null);
  const [acceptingQuoteId, setAcceptingQuoteId] = useState<string | null>(null);

  useEffect(() => {
    fetchQuotes();
  }, [rfqId]);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const data = await quoteApi.getQuotesForRFQ(rfqId);
      setQuotes(data);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching quotes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptQuote = async (quoteId: string) => {
    if (!window.confirm('Are you sure you want to accept this quote? This action cannot be undone.')) {
      return;
    }

    setAcceptingQuoteId(quoteId);
    setError(null);

    try {
      await quoteApi.acceptQuote(rfqId, quoteId);

      setAcceptedQuoteId(quoteId);
      // Update the status of all quotes to reflect accepted/rejected
      setQuotes(prevQuotes => 
        prevQuotes.map(quote => ({
          ...quote,
          status: quote.id === quoteId ? 'accepted' : 'rejected'
        }))
      );
    } catch (err: any) {
      setError(err.message);
      console.error('Error accepting quote:', err);
    } finally {
      setAcceptingQuoteId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Quotes for RFQ</h2>
      
      {acceptedQuoteId && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Awarded: {quotes.find(q => q.id === acceptedQuoteId)?.vendorId}
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {quotes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No quotes available for this RFQ yet
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {quotes.map((quote) => (
                <React.Fragment key={quote.id}>
                  <tr className="border-t-2 border-gray-300">
                    <td className="px-4 py-2 whitespace-nowrap" colSpan={6}>
                      <div className="font-bold text-lg">{quote.vendorId}</div>
                    </td>
                  </tr>
                  {quote.lines.map((line, lineIndex) => (
                    <tr key={`${quote.id}-${lineIndex}`} className={lineIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      {lineIndex === 0 ? (
                        <>
                          <td rowSpan={quote.lines.length} className="px-4 py-2 align-top">
                            <div className="font-medium">Quote #{quote.id.substring(0, 8)}</div>
                            <div className="text-sm text-gray-500">Valid until: {quote.validUntil ? new Date(quote.validUntil).toLocaleDateString() : 'N/A'}</div>
                          </td>
                          <td rowSpan={quote.lines.length} className="px-4 py-2 align-top">
                            <div>${quote.subtotal.toFixed(2)}</div>
                          </td>
                          <td rowSpan={quote.lines.length} className="px-4 py-2 align-top">
                            <div>${quote.taxTotal.toFixed(2)}</div>
                          </td>
                          <td rowSpan={quote.lines.length} className="px-4 py-2 align-top">
                            <div className="font-bold">${quote.grandTotal.toFixed(2)}</div>
                          </td>
                          <td rowSpan={quote.lines.length} className="px-4 py-2 align-top">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${quote.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                                quote.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                                quote.status === 'submitted' ? 'bg-blue-100 text-blue-800' : 
                                'bg-gray-100 text-gray-800'}`}>
                              {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                            </span>
                          </td>
                          <td rowSpan={quote.lines.length} className="px-4 py-2 align-top">
                            {quote.status !== 'accepted' && !acceptedQuoteId && (
                              <button
                                onClick={() => handleAcceptQuote(quote.id)}
                                disabled={acceptingQuoteId === quote.id}
                                className={`px-3 py-1 rounded text-sm ${
                                  acceptingQuoteId === quote.id
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-green-500 hover:bg-green-700 text-white'
                                }`}
                              >
                                {acceptingQuoteId === quote.id ? 'Accepting...' : 'Accept Quote'}
                              </button>
                            )}
                            {quote.status === 'accepted' && (
                              <span className="text-green-600 font-medium">Awarded</span>
                            )}
                          </td>
                        </>
                      ) : null}
                      <td className="px-4 py-2">
                        <div className="font-medium">{line.description}</div>
                      </td>
                      <td className="px-4 py-2">
                        <div>{line.quantity} {line.uom}</div>
                        <div className="text-sm text-gray-500">${line.unitPrice.toFixed(2)}/unit</div>
                      </td>
                      <td className="px-4 py-2">
                        <div>${line.lineTotal.toFixed(2)}</div>
                      </td>
                      <td className="px-4 py-2">
                        <div>MOQ: {line.moq || '-'}</div>
                        <div>Lead: {line.leadTimeDays || '-'} days</div>
                      </td>
                      <td className="px-4 py-2">
                        {/* Empty cell to align with header */}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default QuotesView;