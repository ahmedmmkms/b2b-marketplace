'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { CatalogTable } from '@/features/catalog/components/CatalogTable';
import { PageHeader } from '@/components/common/PageHeader';
import { EmptyState } from '@/components/common/EmptyState';
import { useFeatureFlagStore } from '@/libs/store/feature-flag-store';

export default function CatalogPage() {
  const t = useTranslations('catalog');
  const actions = useTranslations('common.actions');
  const publicBrowse = useFeatureFlagStore((state) => state.isEnabled('catalog.publicBrowse'));

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10">
      <PageHeader title={t('title')} />
      {!publicBrowse ? (
        <EmptyState
          title={t('title')}
          description={t('publicDisabled')}
          actionHref="/auth/signin"
          actionLabel={actions('signin')}
          align="start"
        />
      ) : (
        <CatalogTable />
      )}
    </section>
  );
}
