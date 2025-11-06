import * as z from 'zod';

export const rfqLineSchema = z.object({
  productId: z.string().optional(),
  description: z.string().min(1),
  quantity: z.number().positive(),
  uom: z.string().min(1),
  targetPrice: z.number().positive().optional()
});

export const rfqSchema = z.object({
  title: z.string().min(1),
  notes: z.string().optional(),
  lines: z.array(rfqLineSchema).min(1)
});

export type RfqFormValues = z.infer<typeof rfqSchema>;
