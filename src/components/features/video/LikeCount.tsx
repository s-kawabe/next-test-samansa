import { formatLikes } from '@/lib/format';
import { cn } from '@/lib/cn';

type LikeCountProps = {
  count: number;
  emphasized?: boolean;
};

export function LikeCount({ count, emphasized = false }: LikeCountProps) {
  return (
    <span
      className={cn(
        'font-mono text-xs font-medium tracking-wide',
        emphasized ? 'text-primary' : 'text-foreground-muted',
      )}
    >
      ♥ {formatLikes(count)}
    </span>
  );
}
