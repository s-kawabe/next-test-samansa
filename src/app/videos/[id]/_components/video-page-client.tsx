'use client';

import { notFound } from 'next/navigation';
import { useSuspenseQuery } from '@apollo/client/react';
import { GetOriginalVideoDocument } from '@/lib/graphql/generated/graphql';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { VideoHero } from '@/components/features/video/VideoHero';
import { VideoCard } from '@/components/features/video/VideoCard';
import { LikeButton } from '@/components/features/video/LikeButton';
import { LikeCount } from '@/components/features/video/LikeCount';
import { CommentsDrawer } from '@/components/features/comment/CommentsDrawer';
import { formatDurationFull } from '@/lib/format';

type Props = { id: string };

export function VideoPageClient({ id }: Props) {
  const { data } = useSuspenseQuery(GetOriginalVideoDocument, { variables: { id } });
  const video = data.originalVideo;

  if (!video) notFound();

  const category = video.categories?.[0] ?? null;
  const relatedVideos = (category?.videos ?? [])
    .filter((v) => v.id !== video.id)
    .slice(0, 3);

  const duration = video.duration
    ? { minutes: video.duration.minutes ?? 0, seconds: video.duration.seconds ?? 0 }
    : null;

  return (
    <div>
      {video.landscapeThumbnail && (
        <VideoHero src={video.landscapeThumbnail} alt={video.title ?? ''} />
      )}

      <div className="container-max" style={{ padding: 'var(--spacing-8) 0 var(--spacing-16)' }}>
        <div style={{ marginBottom: 'var(--spacing-6)' }}>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              ...(category ? [{ label: category.name ?? '', href: `/categories/${category.id}` }] : []),
              { label: video.title ?? '' },
            ]}
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 420px',
            gap: 'var(--spacing-12)',
            alignItems: 'start',
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-5xl)',
                fontWeight: 900,
                letterSpacing: 'var(--tracking-tighter)',
                lineHeight: 'var(--leading-tight)',
                color: 'var(--color-foreground)',
                marginBottom: 'var(--spacing-4)',
              }}
            >
              {video.title}
            </h1>

            <div
              style={{
                display: 'flex',
                gap: 'var(--spacing-4)',
                alignItems: 'center',
                marginBottom: 'var(--spacing-8)',
              }}
            >
              {duration && (
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: 'var(--tracking-wider)',
                    textTransform: 'uppercase',
                    color: 'var(--color-foreground-subtle)',
                  }}
                >
                  {formatDurationFull(duration)}
                </span>
              )}
              {category?.name && (
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: 'var(--tracking-wider)',
                    textTransform: 'uppercase',
                    color: 'var(--color-foreground-subtle)',
                  }}
                >
                  {category.name}
                </span>
              )}
              <LikeCount count={video.likeNum} />
            </div>

            {video.description && (
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-base)',
                  lineHeight: 'var(--leading-relaxed)',
                  color: 'var(--color-foreground)',
                  maxWidth: 'var(--container-prose)',
                  marginBottom: 'var(--spacing-6)',
                }}
              >
                {video.description}
              </p>
            )}

            <div
              style={{
                display: 'flex',
                gap: 'var(--spacing-3)',
                alignItems: 'center',
                marginBottom: 'var(--spacing-12)',
              }}
            >
              <LikeButton videoId={video.id} initialCount={video.likeNum} />
              <CommentsDrawer videoId={video.id} />
            </div>

            {relatedVideos.length > 0 && (
              <div>
                <div style={{ marginBottom: 'var(--spacing-6)' }}>
                  <Eyebrow tone="subtle">Related Films</Eyebrow>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 'var(--spacing-4)',
                  }}
                >
                  {relatedVideos.map((rv) => (
                    <VideoCard key={rv.id} video={rv} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
