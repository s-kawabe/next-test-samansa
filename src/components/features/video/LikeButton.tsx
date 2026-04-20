'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { formatLikes } from '@/lib/format';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';

const LIKE_BUTTON_LABEL_ICON_SIZE_PX = 20;
const LIKE_BUTTON_LABEL_ICON_STROKE_WIDTH = 2;

type LikeButtonProps = {
  videoId: string;
  initialLiked?: boolean;
  initialCount: number;
};

export function LikeButton({
  initialLiked = false,
  initialCount,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  const toggle = () => {
    setLiked((prev) => !prev);
    setCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <Button
      onClick={toggle}
      variant={liked ? 'primary' : 'secondary'}
      className="flex-col gap-1 py-3 px-5 rounded-sm"
    >
      <span className="font-sans text-sm font-semibold inline-flex items-center gap-2">
        <Heart
          aria-hidden
          size={LIKE_BUTTON_LABEL_ICON_SIZE_PX}
          strokeWidth={LIKE_BUTTON_LABEL_ICON_STROKE_WIDTH}
          className={cn('shrink-0', liked && 'fill-current')}
        />
        {liked ? 'Liked' : 'Like this film'}
      </span>
      <span className="font-mono text-xs">{formatLikes(count)} people</span>
    </Button>
  );
}
