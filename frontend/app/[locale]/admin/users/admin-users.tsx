'use client';

import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/common/page-header';
import { DataTable } from '@/components/common/data-table';

type UserRow = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const placeholderUsers: UserRow[] = [
  { id: 'usr-1', name: 'Sara Al Amiri', email: 'sara@example.com', role: 'buyer' },
  { id: 'usr-2', name: 'Khaled Musa', email: 'khaled@example.com', role: 'supplier' },
  { id: 'usr-3', name: 'Layla Hassan', email: 'layla@example.com', role: 'admin' },
];

export const AdminUsers = () => {
  const t = useTranslations('admin.users');
  const [page, setPage] = useState(1);

  const columns = useMemo<ColumnDef<UserRow>[]>(
    () => [
      { header: 'Name', accessorKey: 'name' },
      { header: 'Email', accessorKey: 'email' },
      { header: 'Role', accessorKey: 'role' },
    ],
    [],
  );

  return (
    <div className="space-y-6 p-6">
      <PageHeader title={t('title')} breadcrumbs={[{ label: t('title') }]} />
      <DataTable<UserRow>
        columns={columns}
        data={placeholderUsers}
        page={page}
        pageSize={placeholderUsers.length}
        totalItems={placeholderUsers.length}
        onPageChange={setPage}
        enableCsvExport
        csvFileName="users"
      />
    </div>
  );
};
