'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  // In a real implementation, fetch orders from API
  // For now, we'll show a message explaining the flow

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Process Flow</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded">
            <div className="text-2xl font-bold text-blue-600">1</div>
            <div>RFQ</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded">
            <div className="text-2xl font-bold text-blue-600">2</div>
            <div>Quote</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded">
            <div className="text-2xl font-bold text-blue-600">3</div>
            <div>Accept</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded">
            <div className="text-2xl font-bold text-blue-600">4</div>
            <div>Order</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded">
            <div className="text-2xl font-bold text-green-600">5</div>
            <div>Pay</div>
          </div>
        </div>
        
        <div className="text-gray-600">
          <p>To test the checkout flow:</p>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>Accept a quote from the quotes section</li>
            <li>After accepting, you&apos;ll be able to create an order</li>
            <li>Then proceed to checkout using the &quot;Checkout&quot; button</li>
            <li>Complete payment using your wallet</li>
          </ol>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        {orders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No orders yet. After accepting a quote, orders will appear here.
            <div className="mt-4">
              <Link href="/quotes" passHref>
                <Button variant="outline">
                  Browse Quotes
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {/* Orders list would be rendered here in a real implementation */}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
