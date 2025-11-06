import type { LabelHTMLAttributes } from 'react';
import { cn } from '@/libs/utils/cn';

export const Label = ({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) => (
  <label className={cn('text-sm font-medium text-slate-700', className)} {...props} />
);
