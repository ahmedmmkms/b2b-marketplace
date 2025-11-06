import React, { ReactNode } from 'react';
import { cn } from '@/libs/utils/cn';

interface DataTableColumn<T> {
  key: keyof T | string;
  header: ReactNode;
  render?: (item: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  empty: ReactNode;
}

export function DataTable<T>({ data, columns, empty }: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-200 p-12 text-center text-sm text-slate-500">
        {empty}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            {columns.map((column) => (
              <th key={column.key as string} className={cn('px-4 py-3', column.className)}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-sm">
          {data.map((row, index) => (
            <tr key={index} className="bg-white hover:bg-slate-50">
              {columns.map((column) => (
                <td key={column.key as string} className={cn('px-4 py-4', column.className)}>
                  {column.render
                    ? column.render(row)
                    : ((row as Record<string, unknown>)[column.key as string] as ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
