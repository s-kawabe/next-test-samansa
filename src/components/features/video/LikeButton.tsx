'use client';

import { useState } from 'react';
import { formatLikes } from '@/lib/format';
import { Button } from '@/components/ui/Button';

type LikeButtonProps = {
  videoId: string;
  initialLiked?: boolean;
  initialCount: number;
};

export function LikeButton({ initialLiked = false, initialCount }: LikeButtonProps) {
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
      <span className="font-sans text-sm font-semibold">
        {liked ? '♥ Liked' : '♡ Like this film'}
      </span>
      <span className="font-mono text-xs">
        {formatLikes(count)} people
      </span>
    </Button>
  );
}
