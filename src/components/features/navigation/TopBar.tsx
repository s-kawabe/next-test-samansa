import Link from 'next/link';
import { Avatar } from '@/components/ui/Avatar';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Categories', href: '/categories' },
  { label: 'Search', href: '/search' },
];

export function TopBar() {
  return (
    <header className="sticky top-0 z-[20] h-16 bg-[color-mix(in_oklch,var(--color-background)_85%,transparent)] backdrop-blur-[12px] border-b border-border">
      <div className="container-max h-full flex items-center gap-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-7 h-7 bg-foreground text-foreground-inverse rounded-xs font-display font-black text-base">
            S
          </span>
          <span className="font-display text-lg font-bold tracking-wide text-foreground">
            samansa
          </span>
        </Link>

        <nav className="flex gap-8 mx-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-sans text-sm text-foreground-muted transition-colors duration-[var(--duration-fast)] hover:text-foreground"
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
