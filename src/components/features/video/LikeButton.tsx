'use client';

import { useState } from 'react';
import { formatLikes } from '@/lib/format';
import { cn } from '@/lib/cn';

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
    <button
      type="button"
      onClick={toggle}
      className={cn(
        'inline-flex flex-col items-center gap-1 py-3 px-5 rounded-sm cursor-pointer border',
        'transition-[background-color,border-color,color] duration-[var(--duration-fast)] ease-[var(--ease-standard)]',
        liked
          ? 'bg-primary border-primary text-primary-foreground'
          : 'bg-transparent border-border-strong text-foreground-muted hover:border-foreground hover:text-foreground',
      )}
    >
      <span className="font-sans text-sm font-semibold">
        {liked ? '♥ Liked' : '♡ Like this film'}
      </span>
      <span className="font-mono text-xs">
        {formatLikes(count)} people
      </span>
    </button>
  );
}
