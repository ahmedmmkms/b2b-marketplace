'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface OrderSummary {
  id: string;
  quoteId: string;
  subtotal: number;
  taxTotal: number;
  grandTotal: number;
  currency: string;
  items: OrderItem[];
}

interface WalletBalance {
  id: string;
  orgId: string;
  currency: string;
  balance: number;
}

const CheckoutPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const quoteId = searchParams.get('quoteId'); // In case we need to create an order from a quote
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);

  // Create order from quote if we have a quote ID but no order ID
  useEffect(() => {
    const createOrderFromQuote = async () => {
      if (quoteId && !orderId && !createdOrderId) {
        try {
          const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quoteId }),
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to create order from quote');
          }
          
          const orderData = await response.json();
          setCreatedOrderId(orderData.id);
        } catch (err: any) {
          setError(err.message || 'Failed to create order from quote');
        }
      }
    };

    if (quoteId && !orderId) {
      createOrderFromQuote();
    }
  }, [quoteId, orderId, createdOrderId]);

  // Fetch order details - using either the provided orderId or the one created from quote
  const effectiveOrderId = orderId || createdOrderId;
  
  const { data: order, isLoading: isOrderLoading, error: orderError } = useQuery<OrderSummary>({
    queryKey: ['order', effectiveOrderId],
    queryFn: async () => {
      if (!effectiveOrderId) throw new Error('Order ID is required');
      
      const response = await fetch(`/api/orders/${effectiveOrderId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch order');
      }
      return response.json();
    },
    enabled: !!effectiveOrderId,
  });

  // Fetch current user profile to get orgId
  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await fetch('/api/users/me');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch user profile');
      }
      return response.json();
    },
  });

  // Fetch wallet balance
  const { data: wallet, isLoading: isWalletLoading } = useQuery<WalletBalance>({
    queryKey: ['wallet', user?.orgId],
    queryFn: async () => {
      if (!user?.orgId) {
        throw new Error('Organization ID not available');
      }
      
      const response = await fetch(`/api/wallets/${user.orgId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch wallet balance');
      }
      return response.json();
    },
    enabled: !!user?.orgId,
  });

  const isLoading = isOrderLoading || isUserLoading || isWalletLoading;

  // Handle payment processing
  const handlePayWithWallet = async () => {
    if (!order || !effectiveOrderId) return;
    
    setPaymentStatus('processing');
    setError(null);
    
    try {
      // Generate a unique idempotency key for this payment attempt
      // Using a combination of order ID and timestamp to ensure uniqueness
      const idempotencyKey = `pay_${effectiveOrderId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const response = await fetch(`/api/orders/${effectiveOrderId}/pay/wallet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idempotencyKey }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Payment failed' }));
        throw new Error(errorData.detail || 'Payment failed');
      }
      
      const paymentResult = await response.json();
      
      // Check if payment was successful based on backend response
      if (paymentResult.status === 'succeeded' || paymentResult.status === 'initiated') {
        setPaymentStatus('success');
        // Redirect to success page after a delay
        setTimeout(() => {
          router.push(`/orders/${effectiveOrderId}/success?orderId=${effectiveOrderId}`);
        }, 2000);
      } else {
        throw new Error(paymentResult.message || 'Payment not completed successfully');
      }
    } catch (err: any) {
      setError(err.message || 'Payment failed');
      setPaymentStatus('error');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <div className="animate-pulse">Loading checkout...</div>
      </div>
    );
  }

  if (orderError) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <div className="text-red-500">Error loading order: {(orderError as any).message}</div>
      </div>
    );
  }

  if (!order && effectiveOrderId) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <div>Order not found</div>
      </div>
    );
  }
  
  // Show a message if we're waiting for the order to be created from a quote
  if (!order && !effectiveOrderId && quoteId) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <div className="animate-pulse">Creating order from quote...</div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary Section */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between font-bold">
                  <span>Subtotal</span>
                  <span>{formatCurrency(order.subtotal, order.currency)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatCurrency(order.taxTotal, order.currency)}</span>
                </div>
                
                <div className="flex justify-between font-bold text-xl pt-2 border-t">
                  <span>Total</span>
                  <span>{formatCurrency(order.grandTotal, order.currency)}</span>
                </div>
                
                <div className="pt-4">
                  <h3 className="font-semibold mb-2">Items</h3>
                  <ul className="space-y-2">
                    {order.items?.map((item) => (
                      <li key={item.id} className="flex justify-between text-sm">
                        <span>{item.name} × {item.quantity}</span>
                        <span>{formatCurrency(item.total, order.currency)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Payment Section */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Wallet Balance</h3>
                {wallet ? (
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(wallet.balance, wallet.currency)}
                  </div>
                ) : (
                  <div className="text-gray-500">Loading balance...</div>
                )}
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Amount to Pay</h3>
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(order.grandTotal, order.currency)}
                </div>
              </div>
              
              {paymentStatus === 'success' ? (
                <div className="bg-green-100 p-4 rounded-md mb-4">
                  Payment successful! Redirecting to order confirmation...
                </div>
              ) : paymentStatus === 'error' ? (
                <div className="bg-red-100 p-4 rounded-md mb-4">
                  Payment failed: {error}
                </div>
              ) : (
                <div className="mb-4">
                  {wallet && wallet.balance >= order.grandTotal ? (
                    <Button 
                      className="w-full py-6 text-lg"
                      onClick={handlePayWithWallet}
                      disabled={paymentStatus === 'processing'}
                    >
                      {paymentStatus === 'processing' ? 'Processing...' : `Pay ${formatCurrency(order.grandTotal, order.currency)}`}
                    </Button>
                  ) : (
                    <div className="bg-yellow-100 p-4 rounded-md">
                      <p className="font-semibold">Insufficient Funds</p>
                      <p className="text-sm">
                        Your wallet balance is less than the order total. Please top up your wallet.
                      </p>
                      <Button 
                        className="mt-3 w-full"
                        onClick={() => router.push('/wallet')}
                      >
                        Top Up Wallet
                      </Button>
                    </div>
                  )}
                </div>
              )}
              
              <div className="text-sm text-gray-500">
                By clicking &quot;Pay&quot;, you agree to our terms and conditions.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = () => (
  <Suspense fallback={<div className="max-w-4xl mx-auto p-6">Loading checkout...</div>}>
    <CheckoutPageContent />
  </Suspense>
);

export default CheckoutPage;
