'use client';

import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/common/PageHeader';
import { QuoteCompare } from '@/components/common/QuoteCompare';
import { EmptyState } from '@/components/common/EmptyState';

export default function QuotesPage() {
  const t = useTranslations('quotes');

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10">
      <PageHeader title={t('title')} description={t('compare')} />
      <EmptyState title={t('title')} description={t('empty')} />
      <QuoteCompare quotes={[]} />
    </div>
  );
}
