/** Format a number as Indonesian Rupiah: Rp 1.234.567 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}

/** Format an ISO date string to locale date: 1 Januari 2025 */
export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(isoDate));
}

/** Map urgency level (1–5) to a human-readable label */
export function urgencyLabel(level: number): string {
  const labels: Record<number, string> = {
    1: 'Sangat Rendah',
    2: 'Rendah',
    3: 'Sedang',
    4: 'Tinggi',
    5: 'Sangat Tinggi',
  };
  return labels[level] ?? '-';
}
