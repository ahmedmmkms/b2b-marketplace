'use client';

import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/common/PageHeader';
import { EmptyState } from '@/components/common/EmptyState';
import { useFeatureFlagStore } from '@/libs/store/feature-flag-store';
import { useAuthStore } from '@/libs/store/auth-store';
import { useWallet } from '@/libs/api/generated';

export default function WalletPage() {
  const t = useTranslations('wallet');
  const walletEnabled = useFeatureFlagStore((state) => state.isEnabled('wallet.basic'));
  const organizationId = useAuthStore(
    (state) => state.user?.organization?.id ?? state.user?.orgId ?? ''
  );
  const { data: wallet, isLoading } = useWallet(organizationId, {
    enabled: walletEnabled && Boolean(organizationId)
  });

  if (!walletEnabled) {
    return (
      <section className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-10">
        <PageHeader title={t('title')} />
        <EmptyState title={t('title')} description={t('flagDisabled')} />
      </section>
    );
  }

  return (
    <section className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-10">
      <PageHeader title={t('title')} />
      <div className="rounded-2xl border border-slate-200 p-6">
        <p className="text-sm text-slate-500">{t('balance')}</p>
        <p className="text-3xl font-semibold">{isLoading ? '…' : wallet?.balance ?? 0}</p>
      </div>
    </section>
  );
}
