import Link from 'next/link';
import { DurationBadge } from '@/components/ui/DurationBadge';
import { LikeCount } from './LikeCount';

type VideoCardVideo = {
  id: string;
  title?: string | null;
  landscapeThumbnail?: string | null;
  likeNum: number;
  duration: { minutes?: number | null; seconds?: number | null } | null | undefined;
};

type VideoCardProps = {
  video: VideoCardVideo;
  width?: number | string;
};

export function VideoCard({ video, width = 280 }: VideoCardProps) {
  return (
    <Link
      href={`/videos/${video.id}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-3)',
        width,
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <div
        style={{
          position: 'relative',
          aspectRatio: 'var(--aspect-video)',
          overflow: 'hidden',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--color-background-muted)',
        }}
      >
        {video.landscapeThumbnail && (
          <img
            src={video.landscapeThumbnail}
            alt={video.title ?? ''}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: `transform var(--duration-slow) var(--ease-standard)`,
            }}
          />
        )}
        <DurationBadge duration={video.duration} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            color: 'var(--color-foreground)',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: 'var(--leading-snug)',
          }}
        >
          {video.title}
        </p>
        <LikeCount count={video.likeNum} />
      </div>
    </Link>
  );
}
