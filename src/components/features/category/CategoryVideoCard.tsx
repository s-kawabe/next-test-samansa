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
    <Link
      href={`/videos/${video.id}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-3)',
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
        <Eyebrow tone="subtle">{serial}</Eyebrow>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-base)',
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
        {video.description && (
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-foreground-muted)',
              lineHeight: 'var(--leading-normal)',
            }}
          >
            {truncate(video.description, 60)}
          </p>
        )}
        <LikeCount count={video.likeNum} />
      </div>
    </Link>
  );
}
