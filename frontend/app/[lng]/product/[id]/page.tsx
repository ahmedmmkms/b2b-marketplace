// app/[lng]/product/[id]/page.tsx
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Product } from '../../../../libs/api/catalog/service';
import { Button } from '../../../../libs/ui/button';
import { useCartStore } from '../../../../libs/store/useCartStore';

export default async function ProductDetailPage({ 
  params: { lng, id } 
}: { 
  params: { lng: string; id: string } 
}) {
  const t = await getTranslations({ locale: lng, namespace: 'Catalog' });
  
  // In a real implementation, we would fetch product data from the backend
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
  
  const product = mockProducts.find(p => p.id === id);
  
  if (!product) {
    notFound();
  }

  // Add to cart function would use the cart store in a real implementation
  const addToCart = (productId: string) => {
    // Implementation would use useCartStore
    console.log(`Added product ${productId} to cart`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="mt-1 text-sm text-gray-500">{product.category}</p>
            </div>
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:px-6">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96" />
                  </div>
                  <div className="md:w-1/2 md:pl-8">
                    <p className="text-lg text-gray-700">
                      {product.description}
                    </p>
                    <div className="mt-6">
                      <p className="text-2xl font-bold text-gray-900">
                        {product.price.toFixed(2)} {lng === 'en' ? 'SAR' : 'ريال'}
                      </p>
                      <div className="mt-4">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {product.inStock 
                            ? (lng === 'en' ? 'In Stock' : 'متوفر') 
                            : (lng === 'en' ? 'Out of Stock' : 'غير متوفر')}
                        </span>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Button 
                        className="w-full"
                        disabled={!product.inStock}
                        onClick={() => addToCart(product.id)}
                      >
                        {lng === 'en' ? 'Add to Cart' : 'أضف إلى السلة'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}