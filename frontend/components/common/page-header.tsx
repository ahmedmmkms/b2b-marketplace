'use client';

import { Breadcrumb } from '@/components/common/page-header/breadcrumb';
import { cn } from '@/libs/utils/tw';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type PageHeaderProps = {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  className?: string;
};

export const PageHeader = ({
  title,
  description,
  breadcrumbs,
  actions,
  className,
}: PageHeaderProps) => (
  <div
    className={cn(
      'flex flex-col gap-4 border-b border-border bg-card px-6 py-5 shadow-sm md:flex-row md:items-center md:justify-between',
      className,
    )}
  >
    <div className="space-y-2">
      {breadcrumbs ? <Breadcrumb items={breadcrumbs} /> : null}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
        {description ? <p className="text-muted-foreground mt-1 text-sm">{description}</p> : null}
      </div>
    </div>
    {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
  </div>
);
