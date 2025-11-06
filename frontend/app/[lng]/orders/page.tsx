'use client';

import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/common/PageHeader';
import { EmptyState } from '@/components/common/EmptyState';

export default function OrdersPage() {
  const t = useTranslations('orders');

  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10">
      <PageHeader title={t('title')} />
      <EmptyState
        title={t('title')}
        description="Orders history will render once order listing endpoint is available."
        align="start"
      />
    </section>
  );
}
