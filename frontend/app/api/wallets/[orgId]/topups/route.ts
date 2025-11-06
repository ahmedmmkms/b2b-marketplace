import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(
  request: NextRequest,
  { params }: { params: { orgId: string } }
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
    const orgId = params.orgId;
    const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:8080';
    
    const response = await fetch(`${backendUrl}/wallets/${orgId}/topups`, {
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
        { error: errorData.detail || 'Failed to top up wallet', status: response.status },
        { status: response.status }
      );
    }

    const topupData = await response.json();
    return Response.json(topupData);
  } catch (error) {
    console.error('Error processing wallet top-up:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}