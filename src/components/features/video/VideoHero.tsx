type VideoHeroProps = {
  src: string;
  alt: string;
};

export function VideoHero({ src, alt }: VideoHeroProps) {
  return (
    <div className="w-full aspect-video relative overflow-hidden bg-background-muted">
      <img src={src} alt={alt} className="w-full h-full object-cover block" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,var(--color-background)_100%)]" />
    </div>
  );
}
