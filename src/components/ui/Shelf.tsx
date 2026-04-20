'use client';

import { useEffect, useRef, useState } from 'react';

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

  const arrowBase: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
    transition: `opacity var(--duration-base) var(--ease-standard)`,
    background: 'var(--color-background)',
    border: '1px solid var(--color-border-strong)',
    borderRadius: 'var(--radius-full)',
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'var(--color-foreground)',
    fontSize: 14,
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => scroll('left')}
        aria-label="Scroll left"
        style={{
          ...arrowBase,
          left: 0,
          opacity: canScrollLeft ? 1 : 0,
          pointerEvents: canScrollLeft ? 'auto' : 'none',
        }}
      >
        ←
      </button>

      <div
        ref={scrollRef}
        className="no-scrollbar"
        style={{
          display: 'flex',
          gap,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
        }}
      >
        {children}
      </div>

      <button
        type="button"
        onClick={() => scroll('right')}
        aria-label="Scroll right"
        style={{
          ...arrowBase,
          right: 0,
          opacity: canScrollRight ? 1 : 0,
          pointerEvents: canScrollRight ? 'auto' : 'none',
        }}
      >
        →
      </button>
    </div>
  );
}
