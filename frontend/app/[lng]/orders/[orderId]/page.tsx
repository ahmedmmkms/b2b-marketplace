import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/libs/i18n/locales';
import { PageHeader } from '@/components/common/PageHeader';
import { getOrder } from '@/libs/api/generated';
import { notFound } from 'next/navigation';

export default async function OrderDetailPage({
  params
}: {
  params: { orderId: string; lng: Locale };
}) {
  const t = await getTranslations({ locale: params.lng, namespace: 'orders' });
  const order = await getOrder(params.orderId).catch(() => null);

  if (!order) {
    notFound();
  }

  return (
    <section className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-10">
      <PageHeader title={`${t('title')} #${order.id}`} />
      <div className="rounded-2xl border border-slate-200 p-6">
        <dl className="grid gap-4">
          <div>
            <dt className="text-sm font-semibold text-slate-600">Status</dt>
            <dd className="text-lg font-medium text-slate-900">{order.status}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-slate-600">Currency</dt>
            <dd className="text-lg">{order.currency}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-slate-600">Grand total</dt>
            <dd className="text-lg">{order.grandTotal}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
