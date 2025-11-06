import { describe, it, expect } from 'vitest';
import { rfqSchema } from '../schemas';

describe('rfqSchema', () => {
  it('validates a correct payload', () => {
    const result = rfqSchema.safeParse({
      title: 'Steel beams',
      notes: 'Need delivery in two weeks',
      lines: [
        {
          description: 'Beam 1',
          quantity: 10,
          uom: 'pcs'
        }
      ]
    });
    expect(result.success).toBe(true);
  });

  it('rejects missing lines', () => {
    const result = rfqSchema.safeParse({
      title: 'Incomplete',
      lines: []
    });
    expect(result.success).toBe(false);
  });
});
