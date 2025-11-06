'use client';

import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/common/PageHeader';
import { EmptyState } from '@/components/common/EmptyState';

export default function SupplierInboxPage() {
  const t = useTranslations('quotes');

  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10">
      <PageHeader title={t('inboxTitle')} />
      <EmptyState title={t('inboxTitle')} description={t('empty')} />
    </section>
  );
}
