'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

const WalletPage = () => {
  const [balance, setBalance] = useState(0);
  const [topupAmount, setTopupAmount] = useState('');

  const handleTopup = () => {
    // In a real implementation, this would call the topup API
    alert(`Initiating top-up for amount: ${topupAmount}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">My Wallet</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Wallet Balance</h2>
          <div className="text-4xl font-bold text-green-600 mb-6">
            ${balance.toFixed(2)}
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Add Funds</label>
              <input
                type="number"
                value={topupAmount}
                onChange={(e) => setTopupAmount(e.target.value)}
                placeholder="Amount to add"
                className="w-full p-2 border rounded"
              />
            </div>
            <Button onClick={handleTopup} className="w-full">
              Top Up Wallet
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <div className="text-center py-8 text-gray-500">
            No transactions yet. After making payments, transactions will appear here.
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;