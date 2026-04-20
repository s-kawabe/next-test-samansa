import { formatLikes } from '@/lib/format';

type LikeCountProps = {
  count: number;
  emphasized?: boolean;
};

export function LikeCount({ count, emphasized = false }: LikeCountProps) {
  return (
    <span
      style={{
        color: emphasized ? 'var(--color-primary)' : 'var(--color-foreground-muted)',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        fontWeight: 500,
        letterSpacing: 'var(--tracking-wide)',
      }}
    >
      ♥ {formatLikes(count)}
    </span>
  );
}
