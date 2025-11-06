'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CheckoutSuccessPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // After countdown, redirect to order details
      if (orderId) {
        window.location.href = `/orders/${orderId}`;
      }
    }
  }, [timeLeft, orderId]);

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <div className="mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h1 className="text-2xl font-bold mt-4">Payment Successful!</h1>
        <p className="text-gray-600 mt-2">
          Your order has been confirmed and payment has been processed.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Confirmation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <p className="text-lg">
              Order ID: <span className="font-mono font-semibold">{orderId}</span>
            </p>
            <p className="text-gray-600 mt-2">
              The payment has been processed successfully. You will receive a confirmation email shortly.
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <Link href={`/orders/${orderId}`} passHref>
              <Button className="w-full">
                View Order Details
              </Button>
            </Link>
            
            <Link href="/orders" passHref>
              <Button variant="outline" className="w-full">
                View All Orders
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 text-sm text-gray-500">
        Redirecting to order details in {timeLeft}s...
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;