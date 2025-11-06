import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/libs/i18n/locales';
import { PageHeader } from '@/components/common/PageHeader';
import { RfqForm } from '@/features/rfq/components/RfqForm';

export default async function RfqCreatePage({ params }: { params: { lng: Locale } }) {
  const t = await getTranslations({ locale: params.lng, namespace: 'rfq' });

  return (
    <section className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-10">
      <PageHeader title={t('createTitle')} />
      <RfqForm />
    </section>
  );
}
