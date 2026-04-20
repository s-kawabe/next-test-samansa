type EyebrowProps = {
  tone?: 'subtle' | 'muted' | 'foreground';
  children: React.ReactNode;
};

const toneColor: Record<NonNullable<EyebrowProps['tone']>, string> = {
  subtle: 'var(--color-foreground-subtle)',
  muted: 'var(--color-foreground-muted)',
  foreground: 'var(--color-foreground)',
};

export function Eyebrow({ tone = 'subtle', children }: EyebrowProps) {
  return (
    <span
      style={{
        color: toneColor[tone],
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        fontWeight: 500,
        letterSpacing: 'var(--tracking-wider)',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </span>
  );
}
