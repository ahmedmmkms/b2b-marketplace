// app/[lng]/admin/page.tsx
import { getTranslations } from 'next-intl/server';
import { Button } from '../../../libs/ui/button';

export default async function AdminPage({ params: { lng } }: { params: { lng: string } }) {
  const t = await getTranslations({ locale: lng, namespace: 'Common' });
  
  // Mock feature flags data
  const mockFeatureFlags = [
    { id: 'catalog.publicBrowse', name: lng === 'en' ? 'Public Catalog Browse' : 'تصفح الكتالوج العام', enabled: true },
    { id: 'search.enabled', name: lng === 'en' ? 'Search Functionality' : 'وظيفة البحث', enabled: true },
    { id: 'rfq.enabled', name: lng === 'en' ? 'RFQ Functionality' : 'وظيفة طلب الأسعار', enabled: true },
    { id: 'quote.vendorConsole', name: lng === 'en' ? 'Vendor Quote Console' : 'لوحة عروض البائع', enabled: false },
    { id: 'orders.checkout', name: lng === 'en' ? 'Order Checkout' : 'إنهاء الطلب', enabled: false },
    { id: 'payments.gateway1', name: lng === 'en' ? 'Payment Gateway 1' : 'بوابة الدفع 1', enabled: false },
    { id: 'wallet.basic', name: lng === 'en' ? 'Basic Wallet' : 'المحفظة الأساسية', enabled: true },
    { id: 'invoice.vat', name: lng === 'en' ? 'VAT Invoicing' : 'الفوترة بضريبة القيمة المضافة', enabled: false },
    { id: 'loyalty.core', name: lng === 'en' ? 'Core Loyalty Features' : 'مزايا الولاء الأساسية', enabled: true },
    { id: 'credit.controls', name: lng === 'en' ? 'Credit Controls' : 'ضوابط الائتمان', enabled: false },
  ];

  // Function to toggle feature flag (in a real app, this would call an API)
  const toggleFeatureFlag = (flagId: string) => {
    console.log(`Toggling feature flag: ${flagId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {lng === 'en' ? 'Admin Dashboard' : 'لوحة الإدارة'}
          </h1>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {lng === 'en' ? 'Feature Flags' : 'أعلام المزايا'}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {lng === 'en' ? 'Control which features are enabled for users' : 'التحكم في المزايا الممكنة للمستخدمين'}
              </p>
            </div>
            <ul className="divide-y divide-gray-200">
              {mockFeatureFlags.map((flag) => (
                <li key={flag.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {flag.id}
                        </div>
                        <div className="text-sm text-gray-500">
                          {flag.name}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`mr-4 px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${flag.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {flag.enabled ? (lng === 'en' ? 'Enabled' : 'ممكن') : (lng === 'en' ? 'Disabled' : 'معطل')}
                        </span>
                        <Button
                          onClick={() => toggleFeatureFlag(flag.id)}
                          variant={flag.enabled ? "outline" : "default"}
                        >
                          {flag.enabled ? (lng === 'en' ? 'Disable' : 'تعطيل') : (lng === 'en' ? 'Enable' : 'تمكين')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}