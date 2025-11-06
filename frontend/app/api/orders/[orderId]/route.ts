import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    // Get the auth token from cookies (assuming it's stored there)
    const token = cookies().get('auth-token')?.value;
    
    if (!token) {
      return Response.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Forward the request to the backend
    const orderId = params.orderId;
    const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:8080';
    
    const response = await fetch(`${backendUrl}/orders/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return Response.json(
        { error: errorData.detail || 'Failed to fetch order', status: response.status },
        { status: response.status }
      );
    }

    const orderData = await response.json();
    return Response.json(orderData);
  } catch (error) {
    console.error('Error fetching order:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}