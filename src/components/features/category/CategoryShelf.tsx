import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Shelf } from '@/components/ui/Shelf';
import { VideoCard } from '@/components/features/video/VideoCard';
import { indexOfTotal } from '@/lib/format';

type ShelfVideo = {
  id: string;
  title?: string | null;
  landscapeThumbnail?: string | null;
  likeNum: number;
  duration: { minutes?: number | null; seconds?: number | null } | null | undefined;
};

type CategoryShelfProps = {
  categoryId: string;
  categoryName: string;
  tagline?: string | null;
  index: number;
  total: number;
  videos: ShelfVideo[];
};

export function CategoryShelf({
  categoryId,
  categoryName,
  tagline,
  index,
  total,
  videos,
}: CategoryShelfProps) {
  return (
    <section className="pb-16">
      <div className="flex items-baseline gap-4 mb-6 flex-wrap">
        <Eyebrow tone="subtle">{indexOfTotal(index, total)}</Eyebrow>
        <h2 className="font-display text-3xl font-bold tracking-tight leading-tight text-foreground">
          {categoryName}
        </h2>
        {tagline && (
          <p className="font-sans text-sm text-foreground-muted ml-auto">{tagline}</p>
        )}
        <Link
          href={`/categories/${categoryId}`}
          className="font-mono text-xs tracking-wider uppercase text-foreground-subtle transition-colors duration-[var(--duration-fast)] hover:text-foreground"
        >
          View all →
        </Link>
      </div>

      <Shelf gap={16}>
        {videos.map((video) => (
          <div key={video.id} className="snap-start shrink-0">
            <VideoCard video={video} width={280} />
          </div>
        ))}
      </Shelf>
    </section>
  );
}
