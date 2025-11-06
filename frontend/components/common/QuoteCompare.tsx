import type { Quote } from '@/libs/api/generated';
import { DataTable } from './DataTable';
import { Button } from '@/components/ui/button';

interface QuoteCompareProps {
  quotes: Quote[];
}

export const QuoteCompare = ({ quotes }: QuoteCompareProps) => {
  return (
    <DataTable
      data={quotes}
      columns={[
        { key: 'vendorId', header: 'Vendor' },
        { key: 'currency', header: 'Currency' },
        { key: 'grandTotal', header: 'Grand Total' },
        {
          key: 'actions',
          header: 'Action',
          render: (quote) => <Button size="sm">Accept {quote.id}</Button>
        }
      ]}
      empty={<span>No quotes yet.</span>}
    />
  );
};
