// src/lib/format.ts
export function formatNumber(value: number): string {
  return value.toLocaleString('id-ID');
}

export function formatCurrency(value: number, currency: string = 'IDR'): string {
  return value.toLocaleString('id-ID', {
    style: 'currency',
    currency,
  });
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('id-ID');
}
