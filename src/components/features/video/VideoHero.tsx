type VideoHeroProps = {
  src: string;
  alt: string;
};

export function VideoHero({ src, alt }: VideoHeroProps) {
  return (
    <div
      style={{
        width: '100%',
        aspectRatio: 'var(--aspect-video)',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--color-background-muted)',
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, transparent 40%, var(--color-background) 100%)',
        }}
      />
    </div>
  );
}
