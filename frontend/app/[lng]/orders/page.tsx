// app/[lng]/orders/page.tsx
import { getTranslations } from 'next-intl/server';
import { Button } from '../../../libs/ui/button';

export default async function OrdersPage({ params: { lng } }: { params: { lng: string } }) {
  const t = await getTranslations({ locale: lng, namespace: 'Orders' });
  
  // Mock order data
  const mockOrders = [
    {
      id: 'order-1',
      rfqId: 'rfq-1',
      quoteId: 'quote-1',
      status: 'DRAFT',
      totalAmount: 2200.00,
      createdAt: '2024-10-01',
    },
    {
      id: 'order-2',
      rfqId: 'rfq-2',
      quoteId: 'quote-2',
      status: 'CONFIRMED',
      totalAmount: 1500.00,
      createdAt: '2024-10-05',
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('title')}</h1>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {mockOrders.map((order) => (
                <li key={order.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {t('order_id')}: {order.id}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${order.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                            order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'DELIVERED' ? 'bg-indigo-100 text-indigo-800' :
                            'bg-gray-100 text-gray-800'}`}>
                          {order.status}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            {t('rfq')}: {order.rfqId}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            {t('quote')}: {order.quoteId}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <p>{t('total')}: {order.totalAmount.toFixed(2)} {lng === 'en' ? 'SAR' : 'ريال'}</p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {t('placed_on')}: {order.createdAt}
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button className="mr-2">
                        {lng === 'en' ? 'View Details' : 'عرض التفاصيل'}
                      </Button>
                      {order.status === 'DRAFT' && (
                        <Button>
                          {lng === 'en' ? 'Confirm Order' : 'تأكيد الطلب'}
                        </Button>
                      )}
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