'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Quote } from '@/libs/api';
import { formatCurrency } from '@/libs/utils/format';

type UiQuote = Quote & {
  vendorName?: string;
};

type QuoteCompareTableProps = {
  quotes: UiQuote[];
  currency?: string;
  onAccept?: (quote: UiQuote) => void;
  isAccepting?: boolean;
};

export const QuoteCompareTable = ({
  quotes,
  currency = 'USD',
  onAccept,
  isAccepting,
}: QuoteCompareTableProps) => {
  const t = useTranslations('quotes.compare');
  const actions = useTranslations('common.actions');
  const locale = useLocale();

  if (!quotes?.length) {
    return null;
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('vendor')}</TableHead>
              <TableHead>{t('unitPrice')}</TableHead>
              <TableHead>{t('leadTime')}</TableHead>
              <TableHead>{t('shipping')}</TableHead>
              <TableHead>{t('total')}</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {quotes.map((quote) => (
              <TableRow key={quote.id}>
                <TableCell className="font-medium">
                  {quote.vendorName ?? quote.vendorId ?? '-'}
                </TableCell>
                <TableCell>
                  {formatCurrency(quote.subtotal ?? 0, quote.currency ?? currency, locale)}
                </TableCell>
                <TableCell>
                  {quote.lines?.[0]?.leadTimeDays != null
                    ? `${quote.lines?.[0]?.leadTimeDays} d`
                    : '-'}
                </TableCell>
                <TableCell>
                  {formatCurrency(quote.taxTotal ?? 0, quote.currency ?? currency, locale)}
                </TableCell>
                <TableCell>
                  {formatCurrency(quote.grandTotal ?? 0, quote.currency ?? currency, locale)}
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" onClick={() => onAccept?.(quote)} disabled={isAccepting}>
                    {actions('accept')}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
