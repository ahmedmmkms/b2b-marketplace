// app/[lng]/rfq/page.tsx
import { getTranslations } from 'next-intl/server';
import { Button } from '../../../libs/ui/button';
import { getFeatureFlag } from '../../../libs/config/featureFlags';

export default async function RFQPage({ params: { lng } }: { params: { lng: string } }) {
  const t = await getTranslations({ locale: lng, namespace: 'RFQ' });
  
  // Check if RFQ feature is enabled
  const rfqEnabled = getFeatureFlag('rfq.enabled');
  
  if (!rfqEnabled) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('rfq_disabled_title', { defaultValue: 'RFQ Feature Disabled' })}</h1>
          <p className="text-gray-600">{t('rfq_disabled_message', { defaultValue: 'The RFQ functionality is currently disabled.' })}</p>
        </div>
      </div>
    );
  }
  
  // Mock RFQ data
  const mockRfqs = [
    {
      id: 'rfq-1',
      product: lng === 'en' ? 'Industrial Drill' : 'مثقاب صناعي',
      quantity: 10,
      requiredBy: '2024-12-31',
      status: 'Pending'
    },
    {
      id: 'rfq-2',
      product: lng === 'en' ? 'Safety Helmet' : 'خوذة الأمان',
      quantity: 50,
      requiredBy: '2024-11-15',
      status: 'Quoted'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
            <Button>
              {t('create_rfq')}
            </Button>
          </div>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {mockRfqs.map((rfq) => (
                <li key={rfq.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {rfq.product}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {rfq.status}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          {t('quantity')}: {rfq.quantity}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          {rfq.requiredBy}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>ID: {rfq.id}</p>
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