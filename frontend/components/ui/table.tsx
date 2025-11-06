import type { HTMLAttributes } from 'react';
import { cn } from '@/libs/utils/cn';

export const Table = ({ className, ...props }: HTMLAttributes<HTMLTableElement>) => (
  <table className={cn('w-full text-left text-sm', className)} {...props} />
);
