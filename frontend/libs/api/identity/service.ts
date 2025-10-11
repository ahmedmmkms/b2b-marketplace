// libs/api/identity/service.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { API_ENDPOINTS } from '../../config/api';

// Placeholder types - in a real implementation these would come from validation schemas
export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  role: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  createdAt: string;
  updatedAt: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

// API functions using the centralized API configuration
const fetchCurrentUser = async (token?: string): Promise<User> => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_ENDPOINTS.IDENTITY}/users/me`, {
      headers,
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized: Invalid or expired token');
      }
      throw new Error(`Failed to fetch current user: ${response.status} ${response.statusText}`);
    }
    
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.IDENTITY}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid credentials');
      }
      throw new Error(`Login failed: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

const register = async (userData: Omit<User, 'id' | 'role' | 'status' | 'createdAt' | 'updatedAt'>): Promise<User> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.IDENTITY}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error(`Registration failed: ${response.status} ${response.statusText}`);
    }
    
    const newUser = await response.json();
    return newUser;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// React Query hooks
export const useCurrentUser = (token?: string) => {
  return useQuery<User, Error>({
    queryKey: ['currentUser', token],
    queryFn: () => fetchCurrentUser(token),
    enabled: !!token, // Only run query if token is provided
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (userData: Omit<User, 'id' | 'role' | 'status' | 'createdAt' | 'updatedAt'>) => register(userData),
  });
};