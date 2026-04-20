import dayjs from 'dayjs';

export type Duration = { minutes: number; seconds: number };

export function formatDurationShort(d: Duration | null | undefined): string {
  if (!d) return '';
  return `${d.minutes} min`;
}

export function formatDurationFull(d: Duration | null | undefined): string {
  if (!d) return '';
  return `${d.minutes}分${String(d.seconds).padStart(2, '0')}秒`;
}

export function formatLikes(n: number | null | undefined): string {
  if (n == null) return '0';
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function formatRelative(iso: string | null | undefined): string {
  if (!iso) return '';
  const d = dayjs(iso);
  const diffDays = dayjs().diff(d, 'day');
  if (diffDays < 1) return 'today';
  if (diffDays < 2) return 'yesterday';
  if (diffDays < 30) return `${diffDays} days ago`;
  const diffMonths = dayjs().diff(d, 'month');
  if (diffMonths < 12) return `${diffMonths} months ago`;
  const diffYears = dayjs().diff(d, 'year');
  return `${diffYears} years ago`;
}

export function indexOfTotal(index: number, total: number): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(index)} / ${pad(total)}`;
}
