import '@/styles/globals.css';
import '@/styles/tokens.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Marketplace Platform',
  description: 'B2B sourcing across MENA with RFQ, quotes, and wallet pay.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
