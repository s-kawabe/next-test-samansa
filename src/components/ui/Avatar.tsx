type AvatarProps = {
  label: string;
  size?: number;
};

export function Avatar({ label, size = 36 }: AvatarProps) {
  const initial = label.charAt(0).toUpperCase();
  return (
    <div
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: 'var(--radius-full)',
        background: 'var(--color-foreground)',
        color: 'var(--color-foreground-inverse)',
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        fontSize: Math.round(size * 0.44),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {initial}
    </div>
  );
}
