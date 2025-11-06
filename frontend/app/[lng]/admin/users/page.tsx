'use client';

import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/common/PageHeader';
import { EmptyState } from '@/components/common/EmptyState';

export default function AdminUsersPage() {
  const t = useTranslations('admin.users');

  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10">
      <PageHeader title={t('title')} description={t('description')} />
      <EmptyState
        title={t('title')}
        description="User management will wire up once admin endpoints are ready."
        align="start"
      />
    </section>
  );
}
