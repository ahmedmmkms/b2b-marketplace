export const formatCurrency = (value: number, currency = 'USD', locale = 'en-US'): string =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);

export const formatNumber = (value: number, locale = 'en-US'): string =>
  new Intl.NumberFormat(locale).format(value);

export const formatDate = (value: string | Date, locale = 'en-US'): string => {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};
