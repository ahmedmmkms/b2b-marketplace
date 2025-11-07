'use client';

import { useLocale, useTranslations } from 'next-intl';
import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetOrder } from '@/libs/api';
import { formatCurrency } from '@/libs/utils/format';

type OrderDetailProps = {
  orderId: string;
};

export const OrderDetail = ({ orderId }: OrderDetailProps) => {
  const t = useTranslations('orders.detail');
  const status = useTranslations('common.status');
  const locale = useLocale();
  const { data, isLoading, isError } = useGetOrder(orderId, {
    query: {
      enabled: Boolean(orderId),
    },
  });
  const headerId = data?.id ?? orderId;

  if (isLoading) {
    return (
      <div className="p-6">
        <PageHeader title={t('summary')} />
        <p className="text-muted-foreground mt-6 text-sm">Loading order...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-6">
        <PageHeader title={t('summary')} />
        <p className="mt-6 text-sm text-danger">Order not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title={`${t('summary')} - ${headerId}`}
        breadcrumbs={[{ label: t('summary'), href: '/orders' }, { label: headerId }]}
      />
      <Card>
        <CardHeader>
          <CardTitle>{t('summary')}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <span className="text-muted-foreground/80 block text-xs uppercase tracking-wide">
              {t('status')}
            </span>
            <span className="text-sm text-foreground">
              {status(data.status as keyof Record<string, string>)}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground/80 block text-xs uppercase tracking-wide">
              Quote ID
            </span>
            <span className="text-sm text-foreground">{data.quoteId ?? '-'}</span>
          </div>
          <div>
            <span className="text-muted-foreground/80 block text-xs uppercase tracking-wide">
              Subtotal
            </span>
            <span className="text-sm text-foreground">
              {formatCurrency(data.subtotal ?? 0, data.currency ?? 'USD', locale)}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground/80 block text-xs uppercase tracking-wide">
              Grand Total
            </span>
            <span className="text-sm text-foreground">
              {formatCurrency(data.grandTotal ?? 0, data.currency ?? 'USD', locale)}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
