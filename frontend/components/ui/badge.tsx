import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/libs/utils/cn';
import type { HTMLAttributes } from 'react';

const badgeVariants = cva(
  'inline-flex items-center rounded-xl border border-transparent px-4 py-3 text-sm font-semibold shadow-sm transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white',
        outline: 'border border-slate-200 bg-white text-slate-700',
        success: 'bg-success/10 text-success',
        danger: 'bg-danger/10 text-danger'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = ({ className, variant, ...props }: BadgeProps) => (
  <div className={cn(badgeVariants({ variant }), className)} {...props} />
);
