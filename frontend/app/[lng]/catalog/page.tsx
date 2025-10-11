// app/[lng]/catalog/page.tsx
import { getTranslations } from 'next-intl/server';
import { useProducts } from '../../../libs/api/catalog/service';
import { Product } from '../../../libs/api/catalog/service';
import Link from 'next/link';

export default async function CatalogPage({ params: { lng } }: { params: { lng: string } }) {
  const t = await getTranslations({ locale: lng, namespace: 'Catalog' });
  
  // In a real implementation, we would fetch data from the backend
  // For now, use mock data
  const mockProducts: Product[] = [
    {
      id: 'prod-1',
      name: lng === 'en' ? 'Industrial Drill' : 'مثقاب صناعي',
      description: lng === 'en' ? 'High-powered industrial drill for heavy-duty applications' : 'مثقاب صناعي عالي الطاقة للاستخدامات الشاقة',
      price: 249.99,
      category: lng === 'en' ? 'Tools' : 'أدوات',
      inStock: true,
      quantity: 15
    },
    {
      id: 'prod-2',
      name: lng === 'en' ? 'Safety Helmet' : 'خوذة الأمان',
      description: lng === 'en' ? 'Protective safety helmet for construction sites' : 'خوذة واقية لمواقع البناء',
      price: 29.99,
      category: lng === 'en' ? 'Safety' : 'سلامة',
      inStock: true,
      quantity: 50
    },
    {
      id: 'prod-3',
      name: lng === 'en' ? 'Steel Pipe' : 'أنبوب فولاذي',
      description: lng === 'en' ? 'Durable steel pipe for construction projects' : 'أنبوب فولاذي متين لمشاريع البناء',
      price: 19.99,
      category: lng === 'en' ? 'Construction' : 'بناء',
      inStock: false,
      quantity: 0
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('title')}</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                  <p className="mt-2 text-lg font-semibold text-gray-900">
                    {product.price.toFixed(2)} {lng === 'en' ? 'SAR' : 'ريال'}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.inStock 
                        ? (lng === 'en' ? 'In Stock' : 'متوفر') 
                        : (lng === 'en' ? 'Out of Stock' : 'غير متوفر')}
                    </span>
                    <Link 
                      href={`/${lng}/product/${product.id}`}
                      className="ml-4 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                    >
                      {lng === 'en' ? 'View Details' : 'عرض التفاصيل'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}