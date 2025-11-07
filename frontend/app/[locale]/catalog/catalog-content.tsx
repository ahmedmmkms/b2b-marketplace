'use client';

import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { useLocale, useTranslations } from 'next-intl';
import { PageHeader } from '@/components/common/page-header';
import { DataTable } from '@/components/common/data-table';
import { EmptyState } from '@/components/common/empty-state';
import { Input } from '@/components/ui/input';
import { useProducts, type Product } from '@/libs/api';
import { useFeatureFlag } from '@/libs/utils/feature-flags';
import { formatCurrency } from '@/libs/utils/format';

const PAGE_SIZE = 20;

type CatalogProduct = Product & {
  currency?: string;
  leadTimeDays?: number;
  minimumOrderQuantity?: number;
};

export const CatalogContent = () => {
  const t = useTranslations('catalog');
  const tableT = useTranslations('common.table');
  const locale = useLocale();
  const searchEnabled = useFeatureFlag<boolean>('search.enabled', true);
  const catalogEnabled = useFeatureFlag<boolean>('catalog.publicBrowse', true);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useProducts(
    { q: search || undefined, category: category || undefined, page, pageSize: PAGE_SIZE },
    {
      query: {
        placeholderData: (previousData) => previousData,
      },
    },
  );

  const columns = useMemo<ColumnDef<CatalogProduct>[]>(
    () => [
      {
        accessorKey: 'name',
        header: t('product.overview'),
        cell: ({ row }) => (
          <div>
            <div className="font-semibold">{row.original.name}</div>
            <div className="text-muted-foreground text-xs">{row.original.sku}</div>
          </div>
        ),
      },
      {
        accessorKey: 'category',
        header: t('filters.category'),
        cell: ({ getValue }) => (
          <span className="text-sm capitalize">{getValue<string>() ?? '-'}</span>
        ),
      },
      {
        accessorKey: 'referencePrice',
        header: 'Price',
        cell: ({ row }) =>
          row.original.referencePrice != null
            ? formatCurrency(row.original.referencePrice, row.original.currency ?? 'USD', locale)
            : '-',
      },
      {
        accessorKey: 'leadTimeDays',
        header: t('product.leadTime'),
        cell: ({ row }) =>
          row.original.leadTimeDays != null ? `${row.original.leadTimeDays} d` : '-',
      },
    ],
    [locale, t],
  );

  const handlePaginationChange = (nextPage: number) => {
    if (nextPage < 1) return;
    setPage(nextPage);
  };

  if (!catalogEnabled) {
    return (
      <>
        <PageHeader
          title={t('title')}
          description="Catalog browsing is disabled for this environment."
        />
        <div className="p-6">
          <EmptyState
            title="Catalog feature disabled"
            description="Enable catalog.publicBrowse flag to view products."
          />
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col">
      <PageHeader title={t('title')} breadcrumbs={[{ label: t('title') }]} />
      <div className="space-y-6 p-6">
        {searchEnabled ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <label className="flex flex-col gap-2">
              <span className="text-muted-foreground text-sm font-medium">{tableT('search')}</span>
              <Input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder={t('searchPlaceholder')}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-muted-foreground text-sm font-medium">
                {t('filters.category')}
              </span>
              <Input
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                  setPage(1);
                }}
                placeholder={t('filters.allCategories')}
              />
            </label>
          </div>
        ) : null}
        <DataTable<CatalogProduct>
          columns={columns}
          data={(data?.items as CatalogProduct[]) ?? []}
          page={page}
          pageSize={PAGE_SIZE}
          totalItems={data?.total ?? 0}
          onPageChange={(nextPage) => handlePaginationChange(nextPage)}
          isLoading={isLoading}
          enableCsvExport
          csvFileName="catalog"
          emptyMessage={tableT('empty')}
        />
      </div>
    </div>
  );
};
