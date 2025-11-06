import React from 'react';
import { cn } from '@/libs/utils/cn';
import { Link } from '@/libs/i18n/routing';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
  align?: 'center' | 'start';
}

export const EmptyState = ({
  title,
  description,
  actionHref,
  actionLabel,
  align = 'center'
}: EmptyStateProps) => {
  const alignment = align === 'start' ? 'items-start text-start' : 'items-center text-center';

  return (
    <div className={cn('flex flex-col gap-4 rounded-2xl border border-dashed border-slate-300 p-10', alignment)}>
      <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
      <p className="text-sm text-slate-500">{description}</p>
      {actionHref && actionLabel && (
        <Link href={actionHref}>
          <Button>{actionLabel}</Button>
        </Link>
      )}
    </div>
  );
};
