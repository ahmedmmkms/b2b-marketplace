'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/common/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFeatureFlags } from '@/libs/api';
import { useFeatureFlagsStore } from '@/libs/store/feature-flags-store';

export const FeatureFlagsAdmin = () => {
  const t = useTranslations('admin.flags');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { data, refetch, isLoading } = useFeatureFlags({
    query: {
      refetchOnWindowFocus: false,
    },
  });
  const flags = useFeatureFlagsStore((state) => state.flags);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title={t('title')}
        description={t('description')}
        breadcrumbs={[{ label: t('title') }]}
        actions={
          <Button onClick={handleRefresh} disabled={isRefreshing}>
            Refresh
          </Button>
        }
      />
      <Card>
        <CardHeader>
          <CardTitle>Runtime flags</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {isLoading ? <p className="text-muted-foreground">Loading flags...</p> : null}
          {!isLoading && !data?.length ? <p>No flags returned by API.</p> : null}
          {Object.entries(flags).map(([key, value]) => (
            <div
              key={key}
              className="border-border/70 flex items-center justify-between rounded-md border px-4 py-3"
            >
              <div>
                <p className="font-medium text-foreground">{key}</p>
                <p className="text-muted-foreground text-xs">
                  Cached locally. Update via backend to persist across sessions.
                </p>
              </div>
              <code className="rounded bg-muted px-2 py-1 text-xs">{JSON.stringify(value)}</code>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
