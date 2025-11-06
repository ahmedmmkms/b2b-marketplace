export interface CatalogQueryParams {
  page?: number;
  pageSize?: number;
  q?: string;
  category?: string;
}

export const buildCatalogQueryParams = (params: CatalogQueryParams): URLSearchParams => {
  const search = new URLSearchParams();
  if (params.page) search.set('page', String(params.page));
  if (params.pageSize) search.set('pageSize', String(params.pageSize));
  if (params.q) search.set('q', params.q);
  if (params.category) search.set('category', params.category);
  return search;
};
