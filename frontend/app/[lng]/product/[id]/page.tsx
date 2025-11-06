import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { PageHeader } from '@/components/common/PageHeader';
import { getProduct } from '@/libs/api/generated';
import type { Locale } from '@/libs/i18n/locales';

export default async function ProductPage({ params }: { params: { lng: Locale; id: string } }) {
  const t = await getTranslations({ locale: params.lng, namespace: 'product' });
  const product = await getProduct(params.id).catch(() => null);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-10">
      <PageHeader title={product.name ?? t('title')} description={t('details')} />
      <div className="grid gap-4 rounded-2xl border border-slate-200 p-6">
        {product.description && <p className="text-sm text-slate-600">{product.description}</p>}
        <div>
          <h3 className="text-lg font-semibold">{t('specs')}</h3>
          <ul className="mt-3 grid gap-2 text-sm">
            {Object.entries(product.attributes ?? {}).map(([key, value]) => (
              <li
                key={key}
                className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-2"
              >
                <span className="font-medium text-slate-600">{key}</span>
                <span>{String(value)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
