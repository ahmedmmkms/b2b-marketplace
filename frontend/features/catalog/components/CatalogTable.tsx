'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useProducts } from '@/libs/api/generated';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { DataTable } from '@/components/common/DataTable';
import { useFeatureFlagStore } from '@/libs/store/feature-flag-store';

const categories = [
  { value: '', label: 'All' },
  { value: 'equipment', label: 'Equipment' },
  { value: 'services', label: 'Services' },
  { value: 'supplies', label: 'Supplies' }
];

export const CatalogTable = () => {
  const t = useTranslations('catalog');
  const searchEnabled = useFeatureFlagStore((state) => state.isEnabled('search.enabled'));
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [search, category]);

  const query = useProducts(
    {
      page,
      pageSize: 20,
      q: searchEnabled && search ? search : undefined,
      category: category || undefined
    },
    { keepPreviousData: true }
  );

  const products = query.data?.items ?? [];
  const totalPages = query.data?.totalPages ?? 1;

  const columns = useMemo(
    () => [
      { key: 'name', header: t('title') },
      { key: 'category', header: t('category') },
      {
        key: 'price',
        header: 'Price',
        render: (item: any) =>
          item.price ? `${item.price} ${item.currency ?? ''}` : '—'
      }
    ],
    [t]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={t('search')}
          disabled={!searchEnabled}
        />
        <Select
          options={categories}
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
      </div>

      <DataTable data={products} columns={columns} empty={<span>{t('empty')}</span>} />

      <div className="flex items-center justify-between text-sm text-slate-500">
        <button
          type="button"
          className="rounded-full border border-slate-200 px-4 py-2 disabled:opacity-50"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1 || query.isFetching}
        >
          Prev
        </button>
        <span>
          Page {page} / {totalPages}
        </span>
        <button
          type="button"
          className="rounded-full border border-slate-200 px-4 py-2 disabled:opacity-50"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= totalPages || query.isFetching}
        >
          Next
        </button>
      </div>
    </div>
  );
};
