'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { PageHeader } from '@/components/common/page-header';
import { EmptyState } from '@/components/common/empty-state';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetRfq, useIssueRfq } from '@/libs/api';
import { formatNumber } from '@/libs/utils/format';
import { surfaceApiError } from '@/libs/api/api-error';

export const RfqDashboard = () => {
  const t = useTranslations('rfq');
  const common = useTranslations('common.actions');
  const status = useTranslations('common.status');
  const router = useRouter();
  const locale = useLocale();

  const [rfqId, setRfqId] = useState('');
  const [submittedId, setSubmittedId] = useState('');

  const { data, isLoading, refetch } = useGetRfq(submittedId, {
    query: {
      enabled: Boolean(submittedId),
    },
  });

  const issueMutation = useIssueRfq({
    mutation: {
      onSuccess: () => {
        toast.success('RFQ issued successfully');
        refetch();
      },
      onError: (error) => surfaceApiError(error),
    },
  });

  const handleSearch = () => {
    setSubmittedId(rfqId.trim());
  };

  const handleIssue = async () => {
    if (!data?.id) return;
    try {
      await issueMutation.mutateAsync({ rfqId: data.id });
    } catch (error) {
      surfaceApiError(error);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title={t('title')}
        breadcrumbs={[{ label: t('title') }]}
        actions={<Button onClick={() => router.push(`/${locale}/rfq/new`)}>{t('new')}</Button>}
      />
      <Card>
        <CardHeader>
          <CardTitle>{t('draftTitle')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-muted-foreground text-sm font-medium" htmlFor="rfqId">
                RFQ ID
              </label>
              <Input
                id="rfqId"
                value={rfqId}
                onChange={(event) => setRfqId(event.target.value)}
                placeholder="rfq-123"
              />
            </div>
            <Button type="button" onClick={handleSearch}>
              {common('view')}
            </Button>
          </div>
          {isLoading ? <p className="text-muted-foreground text-sm">Loading...</p> : null}
          {!data && !isLoading ? (
            <EmptyState
              title={t('form.emptyLines')}
              description="Provide an RFQ ID to review details."
            />
          ) : null}
          {data ? (
            <div className="border-border/70 space-y-4 rounded-lg border p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{data.title}</h3>
                  <p className="text-muted-foreground text-sm">{data.notes}</p>
                </div>
                <span className="bg-primary/10 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                  {status(data.status as keyof Record<string, string>)}
                </span>
              </div>
              <div>
                <h4 className="text-muted-foreground mb-2 text-sm font-semibold">
                  {t('form.lines')}
                </h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('form.description')}</TableHead>
                      <TableHead>{t('form.quantity')}</TableHead>
                      <TableHead>{t('form.uom')}</TableHead>
                      <TableHead>{t('form.targetPrice')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(data.lines ?? []).map((line) => (
                      <TableRow key={line.id}>
                        <TableCell>{line.description}</TableCell>
                        <TableCell>{formatNumber(line.quantity)}</TableCell>
                        <TableCell>{line.uom}</TableCell>
                        <TableCell>{line.targetPrice ?? '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {data.status === 'draft' ? (
                <Button onClick={handleIssue} disabled={issueMutation.isPending}>
                  {common('issue')}
                </Button>
              ) : null}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
};
