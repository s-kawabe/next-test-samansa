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
    <span className="absolute bottom-2 right-2 bg-[oklch(0_0_0/.65)] text-foreground-inverse font-mono text-xs font-medium tracking-wider py-[2px] px-2 rounded-xs">
      {text}
    </span>
  );
}
