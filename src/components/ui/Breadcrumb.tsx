import Link from 'next/link';

type BreadcrumbItem = { label: string; href?: string };

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label="breadcrumb"
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 'var(--spacing-2)',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        letterSpacing: 'var(--tracking-wider)',
        textTransform: 'uppercase',
      }}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span
            key={i}
            style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}
          >
            {i > 0 && (
              <span style={{ color: 'var(--color-foreground-subtle)' }}>/</span>
            )}
            {isLast || !item.href ? (
              <span style={{ color: 'var(--color-foreground)' }}>{item.label}</span>
            ) : (
              <Link
                href={item.href}
                style={{
                  color: 'var(--color-foreground-muted)',
                  transition: `color var(--duration-fast)`,
                }}
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
