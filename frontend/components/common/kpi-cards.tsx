'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/libs/utils/tw';

type KpiCard = {
  label: string;
  value: string;
  change?: string;
  icon?: React.ReactNode;
};

type KpiCardsProps = {
  items: KpiCard[];
  className?: string;
};

export const KpiCards = ({ items, className }: KpiCardsProps) => (
  <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-4', className)}>
    {items.map((item) => (
      <Card key={item.label} className="border-border/60 relative overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-muted-foreground text-sm font-medium">{item.label}</CardTitle>
          {item.icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold text-foreground">{item.value}</div>
          {item.change ? <p className="text-muted-foreground text-xs">{item.change}</p> : null}
        </CardContent>
      </Card>
    ))}
  </div>
);
