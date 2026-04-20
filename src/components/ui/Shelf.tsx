'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

  const overlayBase = cn(
    'absolute inset-y-0 z-[10] w-24 flex items-center',
    'transition-opacity duration-[var(--duration-base)] ease-[var(--ease-standard)]',
    'cursor-pointer border-none bg-transparent p-0',
  );

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scroll('left')}
        aria-label="Scroll left"
        className={cn(
          overlayBase,
          'left-0 justify-start',
          'bg-gradient-to-r from-background to-background/0',
          canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
      >
        <ChevronLeft className="text-foreground w-5 h-5 ml-1" strokeWidth={1.5} />
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
        className={cn(
          overlayBase,
          'right-0 justify-end',
          'bg-gradient-to-l from-background to-background/0',
          canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
      >
        <ChevronRight className="text-foreground w-5 h-5 mr-1" strokeWidth={1.5} />
      </button>
    </div>
  );
}
