'use client';

import { useTranslations } from 'next-intl';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { rfqSchema, type RfqFormValues } from '../schemas';
import { useCreateRfq, useAddRfqLine, useIssueRfq } from '@/libs/api/generated';
import { useToast } from '@/components/ui/use-toast';

export const RfqForm = () => {
  const t = useTranslations('rfq');
  const { toast } = useToast();
  const form = useForm<RfqFormValues>({
    resolver: zodResolver(rfqSchema),
    defaultValues: {
      title: '',
      notes: '',
      lines: [
        {
          description: '',
          quantity: 1,
          uom: '',
          targetPrice: undefined
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'lines'
  });

  const createRfqMutation = useCreateRfq();
  const addLineMutation = useAddRfqLine();
  const issueMutation = useIssueRfq({
    onSuccess: () => {
      toast({ title: t('issueSuccess') });
      form.reset();
    },
    onError: () => toast({ title: t('issueFailure') })
  });

  const onSubmit = async (values: RfqFormValues) => {
    const rfq = await createRfqMutation.mutateAsync({
      title: values.title,
      notes: values.notes
    });
    if (!rfq?.id) {
      throw new Error('RFQ creation failed: missing identifier');
    }
    const rfqId = rfq.id;

    await Promise.all(
      values.lines.map((line) =>
        addLineMutation.mutateAsync({ rfqId, payload: line })
      )
    );

    await issueMutation.mutateAsync({ rfqId });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 rounded-2xl border border-slate-200 p-8">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">{t('createTitle')}</label>
        <Input {...form.register('title')} placeholder={t('createTitle')} />
        {form.formState.errors.title && (
          <p className="text-sm text-danger">{form.formState.errors.title.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">{t('notes')}</label>
        <Textarea {...form.register('notes')} placeholder={t('notes')} />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{t('lines')}</h3>
        {fields.map((field, index) => (
          <div key={field.id} className="grid gap-4 rounded-xl border border-slate-200 p-4 md:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {t('lineDescription')}
              </label>
              <Input {...form.register(`lines.${index}.description`)} />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {t('lineQuantity')}
              </label>
              <Input
                type="number"
                step="0.01"
                {...form.register(`lines.${index}.quantity`, { valueAsNumber: true })}
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {t('lineUom')}
              </label>
              <Input {...form.register(`lines.${index}.uom`)} />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {t('lineTarget')}
              </label>
              <Input
                type="number"
                step="0.01"
                {...form.register(`lines.${index}.targetPrice`, { valueAsNumber: true })}
              />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              description: '',
              quantity: 1,
              uom: '',
              targetPrice: undefined
            })
          }
        >
          {t('addLine')}
        </Button>
      </div>

      <Button
        type="submit"
        disabled={createRfqMutation.isPending || issueMutation.isPending || addLineMutation.isPending}
      >
        {t('issue')}
      </Button>
    </form>
  );
};
