'use client';

import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/common/PageHeader';
import { EmptyState } from '@/components/common/EmptyState';

export default function RfqListPage() {
  const t = useTranslations('rfq');

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10">
      <PageHeader
        title={t('title')}
        description={t('subtitle')}
        primaryActionHref="/rfq/new"
        primaryActionLabel={t('createTitle')}
      />
      <EmptyState
        title={t('title')}
        description="RFQ listing will surface once the GET /rfqs endpoint is available."
        align="start"
      />
    </div>
  );
}
