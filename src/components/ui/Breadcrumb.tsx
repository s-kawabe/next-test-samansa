import Link from 'next/link';

type BreadcrumbItem = { label: string; href?: string };

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label="breadcrumb"
      className="flex items-center flex-wrap gap-2 font-label text-xs tracking-wider uppercase"
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-foreground-subtle">/</span>}
            {isLast || !item.href ? (
              <span className="text-foreground">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="text-foreground-muted underline decoration-transparent underline-offset-2 transition-[color,text-decoration-color] duration-[var(--duration-fast)] hover:text-foreground hover:decoration-current"
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
