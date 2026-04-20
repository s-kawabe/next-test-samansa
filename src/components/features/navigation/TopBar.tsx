import Link from 'next/link';
import { Avatar } from '@/components/ui/Avatar';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Categories', href: '/categories' },
  { label: 'Search', href: '/search' },
];

export function TopBar() {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 'var(--z-sticky)' as React.CSSProperties['zIndex'],
        height: 'var(--spacing-16)',
        background: 'color-mix(in oklch, var(--color-background) 85%, transparent)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div
        className="container-max"
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-8)',
        }}
      >
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-3)',
            textDecoration: 'none',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 28,
              height: 28,
              background: 'var(--color-foreground)',
              color: 'var(--color-foreground-inverse)',
              borderRadius: 'var(--radius-xs)',
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 16,
            }}
          >
            S
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-lg)',
              fontWeight: 700,
              letterSpacing: 'var(--tracking-wide)',
              color: 'var(--color-foreground)',
            }}
          >
            samansa
          </span>
        </Link>

        <nav
          style={{
            display: 'flex',
            gap: 'var(--spacing-8)',
            marginInline: 'auto',
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-foreground-muted)',
                transition: `color var(--duration-fast)`,
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Avatar label="User" size={32} />
      </div>
    </header>
  );
}
