import Image from 'next/image';

type VideoHeroProps = {
  src: string;
  alt: string;
};

export function VideoHero({ src, alt }: VideoHeroProps) {
  return (
    <div className="w-full aspect-video relative overflow-hidden bg-background-muted">
      <Image src={src} alt={alt} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,var(--color-background)_100%)]" />
    </div>
  );
}
