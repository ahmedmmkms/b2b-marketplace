'use client';

import * as React from 'react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/libs/utils/tw';

type DataTableProps<TData> = {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  search?: string;
  onSearchChange?: (value: string) => void;
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  className?: string;
  enableCsvExport?: boolean;
  csvFileName?: string;
  emptyMessage?: string;
};

export function DataTable<TData>({
  columns,
  data,
  search,
  onSearchChange,
  page,
  pageSize,
  totalItems,
  onPageChange,
  isLoading,
  className,
  enableCsvExport,
  csvFileName = 'export',
  emptyMessage = 'No records found',
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
  });

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const canPrevious = page > 1;
  const canNext = page < totalPages;

  const handleExport = React.useCallback(() => {
    if (!enableCsvExport || data.length === 0) return;

    const header = columns
      .map((column) =>
        'header' in column && column.header ? String(column.header) : (column.id ?? ''),
      )
      .join(',');
    const rows = data
      .map((row) =>
        columns
          .map((column) => {
            const accessor =
              'accessorKey' in column && column.accessorKey
                ? (column.accessorKey as keyof TData)
                : undefined;
            if (!accessor) return '';
            const value = row[accessor];
            if (value == null) return '';
            if (typeof value === 'string') {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return String(value);
          })
          .join(','),
      )
      .join('\n');

    const blob = new Blob([`${header}\n${rows}`], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${csvFileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }, [columns, data, csvFileName, enableCsvExport]);

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex flex-wrap items-center gap-3">
        {onSearchChange ? (
          <div className="min-w-[200px] flex-1">
            <Input
              placeholder="Search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              aria-label="Search table"
            />
          </div>
        ) : null}
        {enableCsvExport ? (
          <Button variant="outline" onClick={handleExport} disabled={data.length === 0}>
            Export CSV
          </Button>
        ) : null}
      </div>
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-muted-foreground h-24 text-center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="text-muted-foreground flex items-center justify-between text-sm">
        <div>
          Page {page} of {totalPages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page - 1)}
            disabled={!canPrevious}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page + 1)}
            disabled={!canNext}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
