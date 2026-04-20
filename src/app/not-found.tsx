import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-max min-h-[60vh] flex flex-col items-center justify-center text-center gap-4 py-16">
      <p className="font-display text-9xl font-black text-border-strong leading-none tracking-tighter">
        404
      </p>
      <p className="font-sans text-xl text-foreground-muted">
        ページが見つかりません
      </p>
      <Link
        href="/"
        className="font-mono text-sm tracking-wider uppercase text-foreground-subtle transition-colors duration-[var(--duration-fast)] hover:text-foreground"
      >
        ← Home
      </Link>
    </div>
  );
}
