import { Heart } from 'lucide-react';
import { formatLikes } from '@/lib/format';
import { cn } from '@/lib/cn';

const LIKE_COUNT_ICON_SIZE_PX = 18;
const LIKE_COUNT_ICON_STROKE_WIDTH = 2;

type LikeCountProps = {
  count: number;
  emphasized?: boolean;
};

export function LikeCount({ count, emphasized = false }: LikeCountProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-mono text-sm font-semibold tabular-nums tracking-wide',
        emphasized ? 'text-primary' : 'text-foreground-muted',
      )}
    >
      <Heart
        aria-hidden
        size={LIKE_COUNT_ICON_SIZE_PX}
        strokeWidth={LIKE_COUNT_ICON_STROKE_WIDTH}
        className={cn('shrink-0', emphasized && 'fill-current')}
      />
      {formatLikes(count)}
    </span>
  );
}
