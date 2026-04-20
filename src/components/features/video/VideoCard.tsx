import Image from 'next/image';
import Link from 'next/link';
import { DurationBadge } from '@/components/ui/DurationBadge';
import { LikeCount } from './LikeCount';

type VideoCardVideo = {
  id: string;
  title?: string | null;
  landscapeThumbnail?: string | null;
  likeNum: number;
  duration:
    | { minutes?: number | null; seconds?: number | null }
    | null
    | undefined;
};

type VideoCardProps = {
  video: VideoCardVideo;
  width?: number | string;
};

export function VideoCard({ video, width = 280 }: VideoCardProps) {
  return (
    <Link
      href={`/videos/${video.id}`}
      className="flex flex-col gap-3"
      style={{ width }}
    >
      <div className="relative aspect-video overflow-hidden rounded-sm bg-background-muted">
        {video.landscapeThumbnail && (
          <Image
            src={video.landscapeThumbnail}
            alt={video.title ?? ''}
            fill
            sizes="280px"
            className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-standard)]"
          />
        )}
        <DurationBadge duration={video.duration} />
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-sans text-sm font-semibold text-foreground line-clamp-2 leading-snug">
          {video.title}
        </p>
        <LikeCount count={video.likeNum} />
      </div>
    </Link>
  );
}
