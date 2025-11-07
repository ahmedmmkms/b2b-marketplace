'use client';

import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/common/page-header';
import { KpiCards } from '@/components/common/kpi-cards';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const AdminDashboard = () => {
  const t = useTranslations('admin.dashboard');

  return (
    <div className="space-y-6 p-6">
      <PageHeader title={t('title')} breadcrumbs={[{ label: t('title') }]} />
      <KpiCards
        items={[
          { label: 'Active buyers', value: '42' },
          { label: 'Active suppliers', value: '16' },
          { label: 'RFQs issued (30d)', value: '128' },
          { label: 'Orders fulfilled (30d)', value: '54' },
        ]}
      />
      <Card>
        <CardHeader>
          <CardTitle>Operations</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-2 text-sm">
          <p>
            TODO: Wire dashboard metrics to backend analytics endpoints once available. Use this
            space to surface RFQ throughput, quote conversion, and payment health indicators.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
