import { describe, expect, it } from 'vitest';
import { buildCatalogQueryParams } from '../query';

describe('buildCatalogQueryParams', () => {
  it('serializes provided filters', () => {
    const params = buildCatalogQueryParams({ page: 2, pageSize: 50, q: 'steel', category: 'equipment' });
    expect(params.get('page')).toBe('2');
    expect(params.get('pageSize')).toBe('50');
    expect(params.get('q')).toBe('steel');
    expect(params.get('category')).toBe('equipment');
  });

  it('omits empty values', () => {
    const params = buildCatalogQueryParams({ page: 1 });
    expect(params.get('page')).toBe('1');
    expect(params.has('q')).toBe(false);
    expect(params.has('category')).toBe(false);
  });
});
