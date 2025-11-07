'use client';

import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProduct, type Product } from '@/libs/api';
import { formatCurrency } from '@/libs/utils/format';

type ProductDetailProps = {
  productId: string;
};

type DetailedProduct = Product & {
  currency?: string;
  leadTimeDays?: number;
  minimumOrderQuantity?: number;
};

export const ProductDetail = ({ productId }: ProductDetailProps) => {
  const t = useTranslations('catalog.product');
  const { data, isLoading, isError } = useProduct(productId, {
    query: {
      enabled: Boolean(productId),
    },
  });
  const product = data as DetailedProduct | undefined;

  if (isLoading) {
    return (
      <div className="p-6">
        <PageHeader title={t('overview')} breadcrumbs={[{ label: t('overview') }]} />
        <p className="text-muted-foreground mt-6 text-sm">Loading...</p>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="p-6">
        <PageHeader title={t('overview')} breadcrumbs={[{ label: t('overview') }]} />
        <p className="mt-6 text-sm text-danger">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title={product?.name ?? t('overview')}
        breadcrumbs={[
          { label: t('overview'), href: '/catalog' },
          { label: product?.name ?? t('overview') },
        ]}
      />
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle>{t('overview')}</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4 text-sm leading-relaxed">
            <p>{product?.description ?? 'No description provided.'}</p>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <span className="text-muted-foreground/80 block text-xs uppercase tracking-wide">
                  {t('leadTime')}
                </span>
                <span className="text-sm text-foreground">{product?.leadTimeDays ?? '-'} days</span>
              </div>
              <div>
                <span className="text-muted-foreground/80 block text-xs uppercase tracking-wide">
                  {t('minimumOrder')}
                </span>
                <span className="text-sm text-foreground">
                  {product?.minimumOrderQuantity ?? '-'}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground/80 block text-xs uppercase tracking-wide">
                  Price
                </span>
                <span className="text-sm text-foreground">
                  {product?.referencePrice != null
                    ? formatCurrency(product.referencePrice, product.currency ?? 'USD')
                    : '-'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle>{t('attributes')}</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3 text-sm">
            {product?.attributes ? (
              Object.entries(product.attributes).map(([key, value]) => (
                <div
                  key={key}
                  className="border-border/60 flex items-center justify-between rounded-md border px-3 py-2"
                >
                  <span className="text-muted-foreground/80 text-xs uppercase tracking-wide">
                    {key}
                  </span>
                  <span className="text-sm text-foreground">{String(value)}</span>
                </div>
              ))
            ) : (
              <p>No attributes provided.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
