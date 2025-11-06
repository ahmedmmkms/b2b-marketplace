// app/[lng]/admin/page.tsx
import { Button } from '../../../libs/ui/button';

export default function AdminPage({ params: { lng } }: { params: { lng: string } }) {
  // Mock feature flags data
  const mockFeatureFlags = [
    { id: 'catalog.publicBrowse', name: lng === 'en' ? 'Public Catalog Browse' : '��� ��袟��� ����', enabled: true },
    { id: 'search.enabled', name: lng === 'en' ? 'Search Functionality' : '���� �頥�', enabled: true },
    { id: 'rfq.enabled', name: lng === 'en' ? 'RFQ Functionality' : '���� �� �隫㟩', enabled: true },
    { id: 'quote.vendorConsole', name: lng === 'en' ? 'Vendor Quote Console' : '���� ��� �頟��', enabled: false },
    { id: 'orders.checkout', name: lng === 'en' ? 'Order Checkout' : '��쟘 ����', enabled: false },
    { id: 'payments.gateway1', name: lng === 'en' ? 'Payment Gateway 1' : '�ퟠ� ���� 1', enabled: false },
    { id: 'wallet.basic', name: lng === 'en' ? 'Basic Wallet' : '����� �隫���', enabled: true },
    { id: 'invoice.vat', name: lng === 'en' ? 'VAT Invoicing' : '������� �� ����� ������', enabled: false },
    { id: 'loyalty.core', name: lng === 'en' ? 'Core Loyalty Features' : 'ꪟ� ���韘 �隫���', enabled: true },
    { id: 'credit.controls', name: lng === 'en' ? 'Credit Controls' : '�ퟠ� �韞���', enabled: false },
  ];

  // Feature flag toggles are static in this preview.

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {lng === 'en' ? 'Admin Dashboard' : '���� �靧���'}
          </h1>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {lng === 'en' ? 'Feature Flags' : '���� ��ꪟ�'}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {lng === 'en' ? 'Control which features are enabled for users' : '�颥�� �� ��ꪟ� ������ ��ꫢ�����'}
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
                          {flag.enabled ? (lng === 'en' ? 'Enabled' : '����') : (lng === 'en' ? 'Disabled' : '����')}
                        </span>
                        <Button
                          variant={flag.enabled ? "outline" : "default"}
                          disabled
                        >
                          {flag.enabled ? (lng === 'en' ? 'Disable' : '�����') : (lng === 'en' ? 'Enable' : '�����')}
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
