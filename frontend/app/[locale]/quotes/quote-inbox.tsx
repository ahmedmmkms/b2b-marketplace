'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { PageHeader } from '@/components/common/page-header';
import { EmptyState } from '@/components/common/empty-state';
import { QuoteCompareTable } from '@/components/common/quote-compare-table';
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
import { useAcceptQuote, useListQuotes, type Quote } from '@/libs/api';
import { surfaceApiError } from '@/libs/api/api-error';
import { formatCurrency, formatDate } from '@/libs/utils/format';

type UiQuote = Quote & {
  vendorName?: string;
};

export const QuoteInbox = () => {
  const t = useTranslations('quotes');
  const common = useTranslations('common.actions');
  const locale = useLocale();
  const status = useTranslations('common.status');
  const router = useRouter();

  const [rfqId, setRfqId] = useState('');
  const [submittedId, setSubmittedId] = useState('');

  const { data, isLoading, refetch } = useListQuotes(submittedId, {
    query: {
      enabled: Boolean(submittedId),
    },
  });
  const quotes = (data ?? []) as UiQuote[];

  const acceptMutation = useAcceptQuote({
    mutation: {
      onSuccess: () => {
        toast.success('Quote accepted', {
          description: 'Quote accepted successfully.',
        });
        refetch();
        router.push(`/${locale}/orders`);
      },
      onError: (error) => surfaceApiError(error),
    },
  });

  const handleAccept = async (quote: UiQuote) => {
    if (!quote.id) {
      toast.error('Quote is missing an id and cannot be accepted.');
      return;
    }
    try {
      await acceptMutation.mutateAsync({ rfqId: submittedId, quoteId: quote.id });
    } catch (error) {
      surfaceApiError(error);
    }
  };

  const handleSubmit = () => {
    setSubmittedId(rfqId.trim());
  };

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title={t('title')}
        breadcrumbs={[{ label: t('title') }]}
        actions={
          <div className="flex items-center gap-3">
            <Input
              placeholder="RFQ ID"
              value={rfqId}
              onChange={(event) => setRfqId(event.target.value)}
              className="w-48"
            />
            <Button onClick={handleSubmit}>{common('view')}</Button>
          </div>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? <p className="text-muted-foreground text-sm">Loading quotes...</p> : null}
          {!quotes.length && !isLoading ? (
            <EmptyState
              title={t('empty')}
              description="Wait for suppliers to respond or request new quotes."
            />
          ) : null}
          {quotes.length ? (
            <>
              <QuoteCompareTable
                quotes={quotes}
                currency={quotes[0]?.currency ?? 'USD'}
                onAccept={handleAccept}
                isAccepting={acceptMutation.isPending}
              />
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('compare.vendor')}</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>{t('compare.total')}</TableHead>
                      <TableHead>Valid until</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quotes.map((quote) => (
                      <TableRow key={quote.id}>
                        <TableCell>{quote.vendorName ?? quote.vendorId ?? '-'}</TableCell>
                        <TableCell>
                          {status(quote.status as keyof Record<string, string>)}
                        </TableCell>
                        <TableCell>
                          {formatCurrency(quote.grandTotal ?? 0, quote.currency ?? 'USD', locale)}
                        </TableCell>
                        <TableCell>
                          {quote.validUntil ? formatDate(quote.validUntil, locale) : '-'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
};
