// components/NavigationHeader.tsx
'use client';

import Link from 'next/link';
import { Button } from '../libs/ui/button';

type NavigationHeaderProps = {
  locale: 'en' | 'ar';
};

export default function NavigationHeader({ locale }: NavigationHeaderProps) {
  const localeLabel = locale === 'en' ? 'English' : 'العربية';

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href={`/${locale}`} className="text-xl font-bold text-indigo-600">
              P4 Marketplace
            </Link>
            <nav className="ml-10 flex space-x-4">
              <Link 
                href={`/${locale}/catalog`} 
                className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
              >
                {locale === 'en' ? 'Catalog' : 'الكتالوج'}
              </Link>
              <Link 
                href={`/${locale}/rfq`} 
                className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
              >
                {locale === 'en' ? 'RFQ' : 'طلب عرض سعر'}
              </Link>
              <Link 
                href={`/${locale}/orders`} 
                className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
              >
                {locale === 'en' ? 'Orders' : 'الطلبات'}
              </Link>
              <Link 
                href={`/${locale}/invoices`} 
                className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
              >
                {locale === 'en' ? 'Invoices' : 'الفواتير'}
              </Link>
              <Link 
                href={`/${locale}/wallet`} 
                className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
              >
                {locale === 'en' ? 'Wallet' : 'المحفظة'}
              </Link>
              <Link 
                href={`/${locale}/loyalty`} 
                className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
              >
                {locale === 'en' ? 'Loyalty' : 'الولاء'}
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">{localeLabel}</span>
            <Button variant="outline">
              {locale === 'en' ? 'Sign In' : 'تسجيل الدخول'}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}