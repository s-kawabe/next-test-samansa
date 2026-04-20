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
    <section
      style={{
        paddingBottom: 'var(--spacing-16)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 'var(--spacing-4)',
          marginBottom: 'var(--spacing-6)',
          flexWrap: 'wrap',
        }}
      >
        <Eyebrow tone="subtle">{indexOfTotal(index, total)}</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-3xl)',
            fontWeight: 700,
            letterSpacing: 'var(--tracking-tight)',
            lineHeight: 'var(--leading-tight)',
            color: 'var(--color-foreground)',
          }}
        >
          {categoryName}
        </h2>
        {tagline && (
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-foreground-muted)',
              marginLeft: 'auto',
            }}
          >
            {tagline}
          </p>
        )}
        <Link
          href={`/categories/${categoryId}`}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            letterSpacing: 'var(--tracking-wider)',
            textTransform: 'uppercase',
            color: 'var(--color-foreground-subtle)',
            transition: `color var(--duration-fast)`,
          }}
        >
          View all →
        </Link>
      </div>

      <Shelf gap={16}>
        {videos.map((video) => (
          <div
            key={video.id}
            style={{ scrollSnapAlign: 'start', flexShrink: 0 }}
          >
            <VideoCard video={video} width={280} />
          </div>
        ))}
      </Shelf>
    </section>
  );
}
