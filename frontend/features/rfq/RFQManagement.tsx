'use client';

import React, { useState } from 'react';
import RFQCreatePage from './RFQCreatePage';
import QuotesView from './QuotesView';
import { RFQ } from './types';

const RFQManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'quotes'>('create');
  const [selectedRFQId, setSelectedRFQId] = useState<string | null>(null);

  const handleRFQCreated = (rfq: RFQ) => {
    setSelectedRFQId(rfq.id);
    setActiveTab('quotes');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex border-b mb-4">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'create'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('create')}
        >
          Create RFQ
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'quotes'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('quotes')}
          disabled={!selectedRFQId}
        >
          View Quotes
        </button>
      </div>

      {activeTab === 'create' && <RFQCreatePage onCreateSuccess={handleRFQCreated} />}
      
      {activeTab === 'quotes' && selectedRFQId && (
        <QuotesView rfqId={selectedRFQId} />
      )}
      
      {activeTab === 'quotes' && !selectedRFQId && (
        <div className="text-center py-8 text-gray-500">
          <p>Please create an RFQ first or enter an RFQ ID to view quotes</p>
          <button
            onClick={() => setActiveTab('create')}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create New RFQ
          </button>
        </div>
      )}
    </div>
  );
};

export default RFQManagement;