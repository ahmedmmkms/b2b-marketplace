import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from '@/libs/i18n/routing';

interface PageHeaderProps {
  title: string;
  description?: string;
  primaryActionHref?: string;
  primaryActionLabel?: string;
  extra?: ReactNode;
}

export const PageHeader = ({
  title,
  description,
  primaryActionHref,
  primaryActionLabel,
  extra
}: PageHeaderProps) => {
  return (
    <header className="flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-center md:justify-between">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
        {description && <p className="text-sm text-slate-500">{description}</p>}
      </div>
      <div className="flex items-center gap-3">
        {extra}
        {primaryActionHref && primaryActionLabel && (
          <Link href={primaryActionHref}>
            <Button>{primaryActionLabel}</Button>
          </Link>
        )}
      </div>
    </header>
  );
};
