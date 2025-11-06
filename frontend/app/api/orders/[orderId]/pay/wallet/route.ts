import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    // Get the auth token from cookies
    const token = cookies().get('auth-token')?.value;
    
    if (!token) {
      return Response.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get the request body
    const requestBody = await request.json();
    
    // Forward the request to the backend
    const orderId = params.orderId;
    const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:8080';
    
    const response = await fetch(`${backendUrl}/orders/${orderId}/pay/wallet`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return Response.json(
        { error: errorData.detail || 'Payment failed', status: response.status },
        { status: response.status }
      );
    }

    const paymentData = await response.json();
    return Response.json(paymentData);
  } catch (error) {
    console.error('Error processing payment:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}