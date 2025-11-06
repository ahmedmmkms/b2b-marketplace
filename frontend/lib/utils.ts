import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility functions for the application
 */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Get the current user's organization ID from the auth context
 * This would typically be retrieved from a context provider or authentication service
 */
export function getUserOrgId(): string | null {
  // This is a placeholder - in a real application, this would be retrieved
  // from an authentication context or stored in localStorage/cookies
  if (typeof window !== 'undefined') {
    return localStorage.getItem('user-orgId');
  }
  return null;
}

/**
 * Get the authentication token
 */
export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth-token');
  }
  return null;
}