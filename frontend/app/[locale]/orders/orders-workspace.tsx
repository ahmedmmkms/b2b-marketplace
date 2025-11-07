'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { PageHeader } from '@/components/common/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCreateOrder, useGetOrder, usePayOrderWithWallet } from '@/libs/api';
import { surfaceApiError } from '@/libs/api/api-error';
import { formatCurrency } from '@/libs/utils/format';

export const OrdersWorkspace = () => {
  const t = useTranslations('orders');
  const actions = useTranslations('common.actions');
  const statusT = useTranslations('common.status');
  const locale = useLocale();

  const [quoteId, setQuoteId] = useState('');
  const [orderId, setOrderId] = useState('');

  const orderQuery = useGetOrder(orderId, {
    query: {
      enabled: Boolean(orderId),
    },
  });

  const createOrderMutation = useCreateOrder({
    mutation: {
      onSuccess: (order) => {
        toast.success('Order created', {
          description: order.id ? `Order ${order.id} created.` : 'Order created.',
        });
        if (order.id) {
          setOrderId(order.id);
        }
      },
      onError: (error) => surfaceApiError(error),
    },
  });

  const payOrderMutation = usePayOrderWithWallet({
    mutation: {
      onSuccess: (order) => {
        toast.success('Order paid with wallet', {
          description: `Order ${order.id} payment succeeded.`,
        });
        orderQuery.refetch();
      },
      onError: (error) => surfaceApiError(error),
    },
  });

  const handleCreateOrder = async () => {
    if (!quoteId) return;
    try {
      await createOrderMutation.mutateAsync({ data: { quoteId } });
    } catch (error) {
      surfaceApiError(error);
    }
  };

  const handleWalletPay = async () => {
    if (!orderId) return;
    try {
      await payOrderMutation.mutateAsync({ orderId, data: {} });
    } catch (error) {
      surfaceApiError(error);
    }
  };

  const order = orderQuery.data;

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title={t('title')}
        breadcrumbs={[{ label: t('title') }]}
        actions={
          <div className="flex items-center gap-2">
            <Input
              placeholder="Quote ID"
              value={quoteId}
              onChange={(event) => setQuoteId(event.target.value)}
              className="w-48"
            />
            <Button onClick={handleCreateOrder} disabled={createOrderMutation.isPending}>
              {actions('submit')}
            </Button>
          </div>
        }
      />

      {order ? (
        <Card>
          <CardHeader>
            <CardTitle>{t('detail.summary')}</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4 text-sm">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <span className="text-muted-foreground/80 block text-xs uppercase tracking-wide">
                  {actions('view')}
                </span>
                <span className="text-sm text-foreground">{order.id ?? '-'}</span>
              </div>
              <div>
                <span className="text-muted-foreground/80 block text-xs uppercase tracking-wide">
                  {t('detail.status')}
                </span>
                <span className="text-sm text-foreground">
                  {statusT(order.status as keyof Record<string, string>)}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground/80 block text-xs uppercase tracking-wide">
                  Subtotal
                </span>
                <span className="text-sm text-foreground">
                  {formatCurrency(order.subtotal ?? 0, order.currency ?? 'USD', locale)}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground/80 block text-xs uppercase tracking-wide">
                  Grand Total
                </span>
                <span className="text-sm text-foreground">
                  {formatCurrency(order.grandTotal ?? 0, order.currency ?? 'USD', locale)}
                </span>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleWalletPay} disabled={payOrderMutation.isPending}>
                {t('detail.payCta')}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="text-muted-foreground py-10 text-sm">
            Create an order from an accepted quote to view details here.
          </CardContent>
        </Card>
      )}
    </div>
  );
};
