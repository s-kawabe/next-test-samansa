import Link from 'next/link';
import { Shelf } from '@/components/ui/Shelf';
import { VideoCard } from '@/components/features/video/VideoCard';

type ShelfVideo = {
  id: string;
  title?: string | null;
  landscapeThumbnail?: string | null;
  likeNum: number;
  duration:
    | { minutes?: number | null; seconds?: number | null }
    | null
    | undefined;
};

type CategoryShelfProps = {
  categoryId: string;
  categoryName: string;
  videos: ShelfVideo[];
};

export function CategoryShelf({
  categoryId,
  categoryName,
  videos,
}: CategoryShelfProps) {
  return (
    <section className="pb-16">
      <div className="flex items-baseline justify-between mb-6 flex-wrap">
        <h2 className="font-sans text-3xl font-bold tracking-tight leading-tight text-foreground">
          {categoryName}
        </h2>
        <Link
          href={`/categories/${categoryId}`}
          className="font-label text-xs tracking-wider text-foreground-subtle underline decoration-transparent underline-offset-2 transition-[color,text-decoration-color] duration-[var(--duration-fast)] hover:text-foreground hover:decoration-current"
        >
          VIEW ALL →
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
