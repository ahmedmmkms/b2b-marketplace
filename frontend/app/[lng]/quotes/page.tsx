// app/[lng]/quotes/page.tsx
import { getTranslations } from 'next-intl/server';
import { Button } from '../../../libs/ui/button';

export default async function QuotesPage({ params: { lng } }: { params: { lng: string } }) {
  const t = await getTranslations({ locale: lng, namespace: 'RFQ' }); // Using RFQ namespace for now
  
  // Mock quote data
  const mockQuotes = [
    {
      id: 'quote-1',
      rfqId: 'rfq-1',
      vendor: lng === 'en' ? 'ABC Industrial Supplies' : 'لوازم صناعية أ ب ج',
      unitPrice: 220.00,
      totalAmount: 2200.00,
      validityDays: 30,
      status: 'Submitted'
    },
    {
      id: 'quote-2',
      rfqId: 'rfq-1',
      vendor: lng === 'en' ? 'XYZ Equipment Co.' : 'شركة معدات س ي ز',
      unitPrice: 215.50,
      totalAmount: 2155.00,
      validityDays: 25,
      status: 'Submitted'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {lng === 'en' ? 'Compare Quotes' : 'مقارنة العروض'}
          </h1>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {lng === 'en' ? 'Vendor' : 'البائع'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {lng === 'en' ? 'Unit Price' : 'السعر للوحدة'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {lng === 'en' ? 'Total Amount' : 'المبلغ الإجمالي'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {lng === 'en' ? 'Validity (Days)' : 'الصلاحية (أيام)'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {lng === 'en' ? 'Status' : 'الحالة'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {lng === 'en' ? 'Actions' : 'الإجراءات'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockQuotes.map((quote) => (
                  <tr key={quote.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{quote.vendor}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{quote.unitPrice.toFixed(2)} {lng === 'en' ? 'SAR' : 'ريال'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{quote.totalAmount.toFixed(2)} {lng === 'en' ? 'SAR' : 'ريال'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {quote.validityDays}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {quote.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button variant="outline" className="mr-2">
                        {lng === 'en' ? 'View' : 'عرض'}
                      </Button>
                      <Button>
                        {lng === 'en' ? 'Accept' : 'قبول'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}