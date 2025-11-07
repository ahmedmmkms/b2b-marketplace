'use client';

import { useTranslations } from 'next-intl';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { PageHeader } from '@/components/common/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCreateQuote } from '@/libs/api';
import { surfaceApiError } from '@/libs/api/api-error';

const quoteLineSchema = z.object({
  rfqLineId: z.string().min(1),
  description: z.string().min(1),
  quantity: z.coerce.number().positive(),
  uom: z.string().min(1),
  unitPrice: z.coerce.number().positive(),
  leadTimeDays: z.coerce
    .number()
    .int()
    .positive()
    .optional()
    .or(z.literal('').transform(() => undefined)),
});

const quoteSchema = z.object({
  rfqId: z.string().min(1),
  vendorId: z.string().min(1),
  currency: z.string().min(1),
  notes: z.string().optional(),
  lines: z.array(quoteLineSchema).min(1),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

export const SupplierQuoteInbox = () => {
  const t = useTranslations('quotes');
  const compare = useTranslations('quotes.compare');
  const rfqForm = useTranslations('rfq.form');
  const common = useTranslations('common.actions');

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      rfqId: '',
      vendorId: '',
      currency: 'USD',
      notes: '',
      lines: [
        {
          rfqLineId: '',
          description: '',
          quantity: 1,
          uom: 'EA',
          unitPrice: 0,
          leadTimeDays: undefined,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'lines',
  });

  const createQuoteMutation = useCreateQuote({
    mutation: {
      onSuccess: (quote) => {
        toast.success('Quote submitted', { description: `Quote ${quote.id} created.` });
        form.reset();
      },
      onError: (error) => surfaceApiError(error),
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    const normalizedLines = values.lines.map((line) => ({
      ...line,
      leadTimeDays: Number.isFinite(line.leadTimeDays as number)
        ? (line.leadTimeDays as number)
        : undefined,
    }));

    try {
      await createQuoteMutation.mutateAsync({
        rfqId: values.rfqId,
        data: {
          vendorId: values.vendorId,
          currency: values.currency,
          notes: values.notes,
          lines: normalizedLines,
        },
      });
    } catch (error) {
      surfaceApiError(error);
    }
  });

  return (
    <div className="space-y-6 p-6">
      <PageHeader title={t('title')} breadcrumbs={[{ label: t('title') }]} />
      <Card>
        <CardHeader>
          <CardTitle>{common('addQuote')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex flex-col gap-2">
                <Label htmlFor="rfqId">RFQ ID</Label>
                <Input id="rfqId" {...form.register('rfqId')} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="vendorId">Vendor ID</Label>
                <Input id="vendorId" {...form.register('vendorId')} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="currency">Currency</Label>
                <Input id="currency" {...form.register('currency')} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" rows={3} {...form.register('notes')} />
            </div>
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="border-border/70 grid gap-3 rounded-md border p-4 md:grid-cols-6"
                >
                  <div className="flex flex-col gap-2">
                    <Label htmlFor={`lines.${index}.rfqLineId`}>RFQ Line ID</Label>
                    <Input
                      id={`lines.${index}.rfqLineId`}
                      {...form.register(`lines.${index}.rfqLineId`)}
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <Label htmlFor={`lines.${index}.description`}>{rfqForm('description')}</Label>
                    <Input
                      id={`lines.${index}.description`}
                      {...form.register(`lines.${index}.description`)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor={`lines.${index}.quantity`}>{rfqForm('quantity')}</Label>
                    <Input
                      id={`lines.${index}.quantity`}
                      type="number"
                      step="0.01"
                      {...form.register(`lines.${index}.quantity`, { valueAsNumber: true })}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor={`lines.${index}.uom`}>{rfqForm('uom')}</Label>
                    <Input id={`lines.${index}.uom`} {...form.register(`lines.${index}.uom`)} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor={`lines.${index}.unitPrice`}>{compare('unitPrice')}</Label>
                    <Input
                      id={`lines.${index}.unitPrice`}
                      type="number"
                      step="0.01"
                      {...form.register(`lines.${index}.unitPrice`, { valueAsNumber: true })}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor={`lines.${index}.leadTimeDays`}>{compare('leadTime')}</Label>
                    <Input
                      id={`lines.${index}.leadTimeDays`}
                      type="number"
                      {...form.register(`lines.${index}.leadTimeDays`, { valueAsNumber: true })}
                    />
                  </div>
                  {fields.length > 1 ? (
                    <div className="md:col-span-6">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => remove(index)}
                      >
                        Remove line
                      </Button>
                    </div>
                  ) : null}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  append({
                    rfqLineId: '',
                    description: '',
                    quantity: 1,
                    uom: 'EA',
                    unitPrice: 0,
                    leadTimeDays: undefined,
                  })
                }
              >
                {common('addLine')}
              </Button>
            </div>
            <Button type="submit" disabled={createQuoteMutation.isPending}>
              {common('submit')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
