import { AppShell } from '@/components/common/app-shell';
import { Suspense } from 'react';
import { OrderDetail } from './order-detail';

type OrderDetailPageProps = {
  params: { orderId: string };
};

export default function OrderDetailPage({ params: { orderId } }: OrderDetailPageProps) {
  return (
    <AppShell>
      <Suspense fallback={<div className="p-6">Loading order...</div>}>
        <OrderDetail orderId={orderId} />
      </Suspense>
    </AppShell>
  );
}
