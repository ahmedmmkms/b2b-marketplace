import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { dir } from 'next-intl/locale';
import { languages } from '../libs/i18n/settings';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'P4 - GCC/MENA B2B Marketplace',
  description: 'VAT-ready, multi-vendor B2B marketplace for GCC/MENA region',
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  return (
    <html lang={params.lng} dir={params.lng === 'ar' ? 'rtl' : 'ltr'}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}