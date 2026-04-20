import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="container-max"
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 'var(--spacing-4)',
        padding: 'var(--spacing-16) 0',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-9xl)',
          fontWeight: 900,
          color: 'var(--color-border-strong)',
          lineHeight: 1,
          letterSpacing: 'var(--tracking-tighter)',
        }}
      >
        404
      </p>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-xl)',
          color: 'var(--color-foreground-muted)',
        }}
      >
        ページが見つかりません
      </p>
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-sm)',
          letterSpacing: 'var(--tracking-wider)',
          textTransform: 'uppercase',
          color: 'var(--color-foreground-subtle)',
          transition: `color var(--duration-fast)`,
        }}
      >
        ← Home
      </Link>
    </div>
  );
}
