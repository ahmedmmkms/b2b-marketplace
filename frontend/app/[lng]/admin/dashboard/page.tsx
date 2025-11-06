'use client';

import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/common/PageHeader';
import { Badge } from '@/components/ui/badge';

export default function AdminDashboardPage() {
  const t = useTranslations('admin.dashboard');

  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10">
      <PageHeader title={t('title')} />
      <div className="grid gap-4 rounded-2xl border border-slate-200 p-6 md:grid-cols-2 lg:grid-cols-4">
        <Badge variant="outline" className="flex flex-col gap-1 text-start">
          <span className="text-xs uppercase tracking-wide text-slate-500">{t('stats.buyers')}</span>
          <span className="text-2xl font-semibold">42</span>
        </Badge>
        <Badge variant="outline" className="flex flex-col gap-1 text-start">
          <span className="text-xs uppercase tracking-wide text-slate-500">{t('stats.suppliers')}</span>
          <span className="text-2xl font-semibold">68</span>
        </Badge>
        <Badge variant="outline" className="flex flex-col gap-1 text-start">
          <span className="text-xs uppercase tracking-wide text-slate-500">{t('stats.rfqs')}</span>
          <span className="text-2xl font-semibold">15</span>
        </Badge>
        <Badge variant="outline" className="flex flex-col gap-1 text-start">
          <span className="text-xs uppercase tracking-wide text-slate-500">{t('stats.orders')}</span>
          <span className="text-2xl font-semibold">9</span>
        </Badge>
      </div>
    </section>
  );
}
