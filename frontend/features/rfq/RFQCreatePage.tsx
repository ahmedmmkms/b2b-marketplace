'use client';

import React, { useState } from 'react';
import RFQCreateForm from './RFQCreateForm';
import { RFQCreate, RFQ } from './types';
import { rfqApi } from './api';

interface RFQCreatePageProps {
  onCreateSuccess?: (rfq: RFQ) => void;
}

const RFQCreatePage: React.FC<RFQCreatePageProps> = ({ onCreateSuccess }) => {
  const [currentRFQ, setCurrentRFQ] = useState<RFQ | null>(null);
  const [isIssued, setIsIssued] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateRFQ = async (rfqData: RFQCreate) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newRFQ = await rfqApi.createRFQ(rfqData);
      setCurrentRFQ(newRFQ);
      
      if (onCreateSuccess) {
        onCreateSuccess(newRFQ);
      }
    } catch (err: any) {
      setError(err.message);
      console.error('Error creating RFQ:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIssueRFQ = async () => {
    if (!currentRFQ) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      await rfqApi.issueRFQ(currentRFQ.id);

      // Update the current RFQ status
      setCurrentRFQ({ ...currentRFQ, status: 'issued' });
      setIsIssued(true);
    } catch (err: any) {
      setError(err.message);
      console.error('Error issuing RFQ:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isIssued && currentRFQ) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-green-600 mb-4">RFQ Issued Successfully!</h2>
          <p className="mb-4">Your RFQ "{currentRFQ.title}" has been issued and is now available for vendors to quote.</p>
          <p className="text-gray-600">RFQ ID: {currentRFQ.id}</p>
          
          <div className="mt-6">
            <button
              onClick={() => {
                setCurrentRFQ(null);
                setIsIssued(false);
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Another RFQ
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {!currentRFQ ? (
        <RFQCreateForm onSubmit={handleCreateRFQ} />
      ) : (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">RFQ Created Successfully</h2>
          
          <div className="mb-6 p-4 border rounded">
            <h3 className="font-bold mb-2">RFQ Details</h3>
            <p><span className="font-medium">Title:</span> {currentRFQ.title}</p>
            <p><span className="font-medium">Status:</span> <span className="capitalize">{currentRFQ.status}</span></p>
            <p><span className="font-medium">Lines:</span> {currentRFQ.lines.length}</p>
            {currentRFQ.notes && (
              <p><span className="font-medium">Notes:</span> {currentRFQ.notes}</p>
            )}
          </div>
          
          <div className="mb-6">
            <h3 className="font-bold mb-2">Requirements</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UOM</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target Price</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentRFQ.lines.map((line, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{line.description}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{line.quantity}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{line.uom}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                        {line.targetPrice ? `$${line.targetPrice.toFixed(2)}` : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setCurrentRFQ(null);
              }}
              disabled={isLoading}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              Edit RFQ
            </button>
            <button
              onClick={handleIssueRFQ}
              disabled={isLoading || currentRFQ.lines.length === 0}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              {isLoading ? 'Issuing...' : 'Issue RFQ'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RFQCreatePage;