import { type Duration, formatDurationShort } from '@/lib/format';

type DurationBadgeProps = {
  duration: { minutes?: number | null; seconds?: number | null } | null | undefined;
};

export function DurationBadge({ duration }: DurationBadgeProps) {
  if (!duration) return null;

  const d: Duration = {
    minutes: duration.minutes ?? 0,
    seconds: duration.seconds ?? 0,
  };
  const text = formatDurationShort(d);
  if (!text) return null;

  return (
    <span
      style={{
        position: 'absolute',
        bottom: 'var(--spacing-2)',
        right: 'var(--spacing-2)',
        background: 'oklch(0 0 0 / 0.65)',
        color: 'var(--color-foreground-inverse)',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        fontWeight: 500,
        letterSpacing: 'var(--tracking-wider)',
        padding: '2px var(--spacing-2)',
        borderRadius: 'var(--radius-xs)',
      }}
    >
      {text}
    </span>
  );
}
