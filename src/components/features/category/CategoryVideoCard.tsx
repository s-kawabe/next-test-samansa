import Image from 'next/image';
import Link from 'next/link';
import { DurationBadge } from '@/components/ui/DurationBadge';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { LikeCount } from '@/components/features/video/LikeCount';

type CategoryVideoCardVideo = {
  id: string;
  title?: string | null;
  description?: string | null;
  landscapeThumbnail?: string | null;
  likeNum: number;
  duration: { minutes?: number | null; seconds?: number | null } | null | undefined;
};

type CategoryVideoCardProps = {
  video: CategoryVideoCardVideo;
  index: number;
};

function truncate(text: string, max: number): string {
  return text.length > max ? text.slice(0, max) + '…' : text;
}

export function CategoryVideoCard({ video, index }: CategoryVideoCardProps) {
  const serial = `#${String(index).padStart(2, '0')}`;

  return (
    <Link href={`/videos/${video.id}`} className="flex flex-col gap-3">
      <div className="relative aspect-video overflow-hidden rounded-sm bg-background-muted">
        {video.landscapeThumbnail && (
          <Image
            src={video.landscapeThumbnail}
            alt={video.title ?? ''}
            fill
            sizes="(max-width: 768px) 100vw, 280px"
            className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-standard)]"
          />
        )}
        <DurationBadge duration={video.duration} />
      </div>

      <div className="flex flex-col gap-2">
        <Eyebrow tone="subtle">{serial}</Eyebrow>
        <p className="font-sans text-base font-semibold text-foreground line-clamp-2 leading-snug">
          {video.title}
        </p>
        {video.description && (
          <p className="font-sans text-sm text-foreground-muted leading-normal">
            {truncate(video.description, 60)}
          </p>
        )}
        <LikeCount count={video.likeNum} />
      </div>
    </Link>
  );
}
