'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/libs/utils/tw';

type EmptyStateProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  className?: string;
};

export const EmptyState = ({
  title,
  description,
  actionLabel,
  onAction,
  icon,
  className,
}: EmptyStateProps) => (
  <div
    className={cn(
      'flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-card px-6 py-12 text-center',
      className,
    )}
  >
    {icon}
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {description ? <p className="text-muted-foreground mt-2 text-sm">{description}</p> : null}
    </div>
    {actionLabel ? (
      <Button onClick={onAction} variant="outline">
        {actionLabel}
      </Button>
    ) : null}
  </div>
);
