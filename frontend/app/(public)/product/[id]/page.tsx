// app/(public)/product/[id]/page.tsx
import ProductDetail from '@/components/ProductDetail';

const ProductDetailPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProductDetail />
    </div>
  );
};

export default ProductDetailPage;