'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

const SHELF_SCROLL_STEP_PX = 320;
const SHELF_CHEVRON_ICON_PX = 24;
const SHELF_CHEVRON_STROKE_WIDTH = 2;
const SHELF_DEFAULT_GAP_PX = 16;

type ShelfProps = {
  children: React.ReactNode;
  gap?: number;
};

export function Shelf({ children, gap = SHELF_DEFAULT_GAP_PX }: ShelfProps) {
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
    el.scrollBy({
      left: dir === 'right' ? SHELF_SCROLL_STEP_PX : -SHELF_SCROLL_STEP_PX,
      behavior: 'smooth',
    });
  };

  const overlayBase = cn(
    'group absolute inset-y-0 z-[10] flex items-center w-32 min-h-12',
    'transition-opacity duration-[var(--duration-base)] ease-[var(--ease-standard)]',
    'cursor-pointer border-none bg-transparent p-0',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
  );

  const controlFab = cn(
    'flex items-center justify-center shrink-0 size-12 rounded-full',
    'border border-shelf-control-edge',
    'bg-shelf-control-bg backdrop-blur-md backdrop-saturate-150',
    'shadow-md text-foreground',
    'transition-[transform,background-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-standard)]',
    'group-hover:bg-shelf-control-bg-hover group-hover:shadow-lg',
    'group-active:scale-95',
  );

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scroll('left')}
        aria-label="Scroll left"
        className={cn(
          overlayBase,
          'left-0 justify-start pl-1',
          canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
      >
        <span className={controlFab} aria-hidden>
          <ChevronLeft
            className="shrink-0"
            size={SHELF_CHEVRON_ICON_PX}
            strokeWidth={SHELF_CHEVRON_STROKE_WIDTH}
          />
        </span>
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
          'right-0 justify-end pr-1',
          canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
      >
        <span className={controlFab} aria-hidden>
          <ChevronRight
            className="shrink-0"
            size={SHELF_CHEVRON_ICON_PX}
            strokeWidth={SHELF_CHEVRON_STROKE_WIDTH}
          />
        </span>
      </button>
    </div>
  );
}
