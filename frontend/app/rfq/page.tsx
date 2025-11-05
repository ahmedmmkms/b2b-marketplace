'use client';

import React from 'react';
import RFQManagement from '@/features/rfq/RFQManagement';

const RFQPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">RFQ Management</h1>
          <p className="mt-2 text-gray-600">
            Create requests for quotations and manage vendor responses
          </p>
        </div>
        <RFQManagement />
      </div>
    </div>
  );
};

export default RFQPage;