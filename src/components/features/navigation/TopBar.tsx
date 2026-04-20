import Link from 'next/link';
import { Avatar } from '@/components/ui/Avatar';

export function TopBar() {
  return (
    <header className="h-16 bg-background border-b border-border">
      <div className="container-max h-full flex items-center justify-between gap-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-7 h-7 bg-foreground text-foreground-inverse rounded-xs font-display font-black text-base">
            S
          </span>
          <span className="font-display text-lg font-bold tracking-wide text-foreground">
            SAMANSA Test
          </span>
        </Link>

        <Avatar label="User" size={32} />
      </div>
    </header>
  );
}
