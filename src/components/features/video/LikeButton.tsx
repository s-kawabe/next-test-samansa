'use client';

import { useState } from 'react';
import { formatLikes } from '@/lib/format';

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
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--spacing-1)',
        padding: 'var(--spacing-3) var(--spacing-5)',
        borderRadius: 'var(--radius-sm)',
        border: `1px solid ${liked ? 'var(--color-primary)' : 'var(--color-border-strong)'}`,
        background: liked ? 'var(--color-primary)' : 'transparent',
        color: liked ? 'var(--color-primary-foreground)' : 'var(--color-foreground-muted)',
        cursor: 'pointer',
        transition: `background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard)`,
      }}
    >
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
        {liked ? '♥ Liked' : '♡ Like this film'}
      </span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)' }}>
        {formatLikes(count)} people
      </span>
    </button>
  );
}
