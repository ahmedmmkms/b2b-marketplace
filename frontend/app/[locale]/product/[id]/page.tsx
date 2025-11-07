import { AppShell } from '@/components/common/app-shell';
import { Suspense } from 'react';
import { ProductDetail } from './product-detail';

type ProductPageProps = {
  params: { id: string };
};

export default function ProductPage({ params: { id } }: ProductPageProps) {
  return (
    <AppShell>
      <Suspense fallback={<div className="p-6">Loading product...</div>}>
        <ProductDetail productId={id} />
      </Suspense>
    </AppShell>
  );
}
