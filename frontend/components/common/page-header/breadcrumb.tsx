'use client';

import Link from 'next/link';
import { cn } from '@/libs/utils/tw';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export const Breadcrumb = ({ items, className }: BreadcrumbProps) => {
  if (!items?.length) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('text-muted-foreground text-xs uppercase tracking-wide', className)}
    >
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-foreground">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'text-foreground' : undefined}>{item.label}</span>
              )}
              {!isLast ? <span className="opacity-60">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
