import { describe, expect, it } from 'vitest';
import { rfqSchema } from './rfq-create-form';

describe('rfq schema', () => {
  it('fails when no lines provided', () => {
    const result = rfqSchema.safeParse({
      title: 'Test RFQ',
      notes: 'Notes',
      autoIssue: true,
      lines: [],
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.lines?.[0]).toContain('Add at least one line item');
    }
  });

  it('passes with valid line', () => {
    const result = rfqSchema.safeParse({
      title: 'Test RFQ',
      notes: 'Notes',
      autoIssue: true,
      lines: [{ description: 'Item', quantity: 5, uom: 'EA', targetPrice: 100 }],
    });

    expect(result.success).toBe(true);
  });
});
