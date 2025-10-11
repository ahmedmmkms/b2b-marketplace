// app/[lng]/invoices/page.tsx
import { getTranslations } from 'next-intl/server';
import { Button } from '../../../libs/ui/button';

export default async function InvoicesPage({ params: { lng } }: { params: { lng: string } }) {
  const t = await getTranslations({ locale: lng, namespace: 'Invoices' });
  
  // Mock invoice data
  const mockInvoices = [
    {
      id: 'inv-001',
      orderId: 'order-1',
      invoiceNumber: 'INV-2024-001',
      amount: 2200.00,
      vat: 275.00, // 15% VAT
      issueDate: '2024-10-05',
      dueDate: '2024-11-05',
      status: 'PAID'
    },
    {
      id: 'inv-002',
      orderId: 'order-2',
      invoiceNumber: 'INV-2024-002',
      amount: 1500.00,
      vat: 187.50, // 15% VAT
      issueDate: '2024-10-10',
      dueDate: '2024-11-10',
      status: 'PENDING'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('title')}</h1>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {mockInvoices.map((invoice) => (
                <li key={invoice.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {invoice.invoiceNumber}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${invoice.status === 'PAID' ? 'bg-green-100 text-green-800' :
                            invoice.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'}`}>
                          {invoice.status}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            {t('order_id')}: {invoice.orderId}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            {t('amount')}: {invoice.amount.toFixed(2)} {lng === 'en' ? 'SAR' : 'ريال'}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <p>{t('vat')}: {invoice.vat.toFixed(2)} {lng === 'en' ? 'SAR' : 'ريال'}</p>
                        </div>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-500">
                        <div>
                          <svg className="inline mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          {t('date')}: {invoice.issueDate}
                        </div>
                        <div>
                          <svg className="inline mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          {lng === 'en' ? 'Due Date' : 'تاريخ الاستحقاق'}: {invoice.dueDate}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-3">
                      <Button variant="outline">
                        {lng === 'en' ? 'View Invoice' : 'عرض الفاتورة'}
                      </Button>
                      <Button>
                        {t('download_pdf')}
                      </Button>
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