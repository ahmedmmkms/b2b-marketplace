'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
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
import { useCreateRfq, useAddRfqLine, useIssueRfq } from '@/libs/api';
import { surfaceApiError } from '@/libs/api/api-error';

export const rfqLineSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  quantity: z.coerce.number().positive('Quantity must be positive'),
  uom: z.string().min(1, 'Unit of measure is required'),
  targetPrice: z.coerce
    .number()
    .positive()
    .optional()
    .or(z.literal('').transform(() => undefined)),
});

export const rfqSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  notes: z.string().optional(),
  autoIssue: z.boolean().optional(),
  lines: z.array(rfqLineSchema).min(1, 'Add at least one line item'),
});

type RfqFormValues = z.infer<typeof rfqSchema>;

export const RfqCreateForm = () => {
  const t = useTranslations('rfq');
  const actions = useTranslations('common.actions');
  const router = useRouter();
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RfqFormValues>({
    resolver: zodResolver(rfqSchema),
    defaultValues: {
      title: '',
      notes: '',
      autoIssue: true,
      lines: [
        {
          description: '',
          quantity: 1,
          uom: 'EA',
          targetPrice: undefined,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'lines',
  });

  const createRfqMutation = useCreateRfq();
  const addLineMutation = useAddRfqLine();
  const issueRfqMutation = useIssueRfq();

  const handleSubmit = form.handleSubmit(async (values) => {
    setIsSubmitting(true);
    try {
      const normalizedLines = values.lines.map((line) => ({
        ...line,
        targetPrice: Number.isFinite(line.targetPrice as number)
          ? (line.targetPrice as number)
          : undefined,
      }));
      const [firstLine, ...restLines] = normalizedLines;
      const rfq = await createRfqMutation.mutateAsync({
        data: {
          title: values.title,
          notes: values.notes,
          lines: firstLine ? [firstLine] : [],
        },
      });
      const rfqId = rfq.id;
      if (!rfqId) {
        throw new Error('RFQ id missing from response.');
      }

      for (const line of restLines) {
        await addLineMutation.mutateAsync({
          rfqId,
          data: line,
        });
      }

      if (values.autoIssue) {
        await issueRfqMutation.mutateAsync({ rfqId });
      }

      toast.success('RFQ created successfully', {
        description: values.autoIssue ? 'RFQ issued to suppliers.' : 'RFQ saved as draft.',
      });
      router.push(`/${locale}/rfq`);
    } catch (error) {
      surfaceApiError(error);
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title={t('new')}
        breadcrumbs={[{ label: t('title'), href: '/rfq' }, { label: t('new') }]}
      />
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('form.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">{t('form.title')}</Label>
                <Input id="title" {...form.register('title')} />
                {form.formState.errors.title ? (
                  <p className="text-xs text-danger">{form.formState.errors.title.message}</p>
                ) : null}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="notes">{t('form.notes')}</Label>
                <Textarea id="notes" rows={4} {...form.register('notes')} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('form.lines')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border-border/70 grid gap-3 rounded-md border p-4 md:grid-cols-4"
              >
                <div className="flex flex-col gap-2 md:col-span-2">
                  <Label htmlFor={`lines.${index}.description`}>{t('form.description')}</Label>
                  <Input
                    id={`lines.${index}.description`}
                    {...form.register(`lines.${index}.description`)}
                  />
                  {form.formState.errors.lines?.[index]?.description ? (
                    <p className="text-xs text-danger">
                      {form.formState.errors.lines[index]?.description?.message}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`lines.${index}.quantity`}>{t('form.quantity')}</Label>
                  <Input
                    id={`lines.${index}.quantity`}
                    type="number"
                    step="0.01"
                    {...form.register(`lines.${index}.quantity`, { valueAsNumber: true })}
                  />
                  {form.formState.errors.lines?.[index]?.quantity ? (
                    <p className="text-xs text-danger">
                      {form.formState.errors.lines[index]?.quantity?.message}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`lines.${index}.uom`}>{t('form.uom')}</Label>
                  <Input id={`lines.${index}.uom`} {...form.register(`lines.${index}.uom`)} />
                  {form.formState.errors.lines?.[index]?.uom ? (
                    <p className="text-xs text-danger">
                      {form.formState.errors.lines[index]?.uom?.message}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`lines.${index}.targetPrice`}>{t('form.targetPrice')}</Label>
                  <Input
                    id={`lines.${index}.targetPrice`}
                    type="number"
                    step="0.01"
                    {...form.register(`lines.${index}.targetPrice`, { valueAsNumber: true })}
                  />
                  {form.formState.errors.lines?.[index]?.targetPrice ? (
                    <p className="text-xs text-danger">
                      {form.formState.errors.lines[index]?.targetPrice?.message}
                    </p>
                  ) : null}
                </div>
                {fields.length > 1 ? (
                  <div className="md:col-span-4">
                    <Button type="button" variant="outline" size="sm" onClick={() => remove(index)}>
                      Remove
                    </Button>
                  </div>
                ) : null}
              </div>
            ))}
            {form.formState.errors.lines?.root ? (
              <p className="text-xs text-danger">{form.formState.errors.lines.root.message}</p>
            ) : null}
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                append({
                  description: '',
                  quantity: 1,
                  uom: 'EA',
                  targetPrice: undefined,
                })
              }
            >
              {actions('addLine')}
            </Button>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <label className="text-muted-foreground flex items-center gap-2 text-sm">
            <input type="checkbox" {...form.register('autoIssue')} />
            {t('issueConfirm')}
          </label>
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : actions('submit')}
          </Button>
        </div>
      </form>
    </div>
  );
};
