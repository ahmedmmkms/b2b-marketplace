'use client';

import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/common/page-header';
import { EmptyState } from '@/components/common/empty-state';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KpiCards } from '@/components/common/kpi-cards';
import { useFeatureFlag } from '@/libs/utils/feature-flags';

export const WalletOverview = () => {
  const t = useTranslations('wallet');
  const walletEnabled = useFeatureFlag<boolean>('wallet.basic', false);

  if (!walletEnabled) {
    return (
      <div className="space-y-6 p-6">
        <PageHeader title={t('title')} />
        <EmptyState
          title="Wallet feature disabled"
          description="Enable wallet.basic feature flag to expose wallet management."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <PageHeader title={t('title')} />
      <KpiCards
        items={[
          { label: t('balance'), value: '$0.00' },
          { label: 'Reserved', value: '$0.00' },
          { label: 'Pending top-ups', value: '$0.00' },
          { label: 'Payments this month', value: '$0.00' },
        ]}
      />
      <Card>
        <CardHeader>
          <CardTitle>{t('transactions')}</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-2 text-sm">
          <p>
            TODO: Integrate wallet balances and ledger once `/wallet` endpoints are available. This
            section currently displays static placeholders.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
