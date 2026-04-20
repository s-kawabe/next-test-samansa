'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

type ShelfProps = {
  children: React.ReactNode;
  gap?: number;
};

export function Shelf({ children, gap = 16 }: ShelfProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      ro.disconnect();
    };
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'right' ? 320 : -320, behavior: 'smooth' });
  };

  const arrowBase =
    'absolute top-1/2 -translate-y-1/2 z-[10] bg-background border border-border-strong rounded-full w-8 h-8 flex items-center justify-center cursor-pointer text-foreground text-sm transition-opacity duration-[var(--duration-base)] ease-[var(--ease-standard)]';

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scroll('left')}
        aria-label="Scroll left"
        className={cn(arrowBase, 'left-0', canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none')}
      >
        ←
      </button>

      <div
        ref={scrollRef}
        className="no-scrollbar flex overflow-x-auto snap-x snap-mandatory"
        style={{ gap }}
      >
        {children}
      </div>

      <button
        type="button"
        onClick={() => scroll('right')}
        aria-label="Scroll right"
        className={cn(arrowBase, 'right-0', canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none')}
      >
        →
      </button>
    </div>
  );
}
