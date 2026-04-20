export function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        padding: 'var(--spacing-16) 0',
      }}
    >
      <div
        className="container-max"
        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}
      >
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-5xl)',
            fontWeight: 900,
            letterSpacing: 'var(--tracking-tighter)',
            color: 'var(--color-foreground)',
            lineHeight: 'var(--leading-none)',
          }}
        >
          samansa.
        </p>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            letterSpacing: 'var(--tracking-wider)',
            textTransform: 'uppercase',
            color: 'var(--color-foreground-subtle)',
          }}
        >
          © 2026 · Curated cinema
        </p>
      </div>
    </footer>
  );
}
