'use client';

import { notFound } from 'next/navigation';
import { useSuspenseQuery } from '@apollo/client/react';
import { GetOriginalVideoDocument } from '@/lib/graphql/generated/graphql';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { VideoHero } from '@/components/features/video/VideoHero';
import { VideoCard } from '@/components/features/video/VideoCard';
import { LikeCount } from '@/components/features/video/LikeCount';
import { CommentsDrawer } from '@/components/features/comment/CommentsDrawer';
import { Play } from 'lucide-react';
import { formatDurationFull } from '@/lib/format';

type Props = { id: string };

export function VideoPageClient({ id }: Props) {
  const { data } = useSuspenseQuery(GetOriginalVideoDocument, {
    variables: { id },
  });
  const video = data.originalVideo;

  if (!video) notFound();

  const category = video.categories?.[0] ?? null;
  const relatedVideos = (category?.videos ?? [])
    .filter((v) => v.id !== video.id)
    .slice(0, 3);

  const duration = video.duration
    ? {
        minutes: video.duration.minutes ?? 0,
        seconds: video.duration.seconds ?? 0,
      }
    : null;

  return (
    <div>
      {video.landscapeThumbnail && (
        <VideoHero src={video.landscapeThumbnail} alt={video.title ?? ''} />
      )}

      <div className="container-max relative z-10 -mt-20 pt-8 pb-16">
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              ...(category
                ? [
                    {
                      label: category.name ?? '',
                      href: `/categories/${category.id}`,
                    },
                  ]
                : []),
              { label: video.title ?? '' },
            ]}
          />
        </div>

        <div className="grid grid-cols-[1fr_420px] gap-12 items-start">
          <div>
            <div className="flex items-start justify-between gap-6 mb-4">
              <h1 className="font-sans text-5xl font-black tracking-tighter leading-tight text-foreground">
                {video.title}
              </h1>
              <button
                type="button"
                aria-label="Play"
                className="shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground hover:bg-primary-hover transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]"
              >
                <Play size={22} fill="currentColor" strokeWidth={0} className="translate-x-0.5" />
              </button>
            </div>

            <div className="flex gap-4 items-center mb-8">
              {duration && (
                <span className="font-label text-xs tracking-wider uppercase text-foreground-subtle">
                  {formatDurationFull(duration)}
                </span>
              )}
              {category?.name && (
                <span className="font-label text-xs tracking-wider uppercase text-foreground-subtle">
                  {category.name}
                </span>
              )}
              <LikeCount count={video.likeNum} />
            </div>

            {video.description && (
              <p className="font-sans text-base leading-relaxed text-foreground max-w-[var(--container-prose)] mb-6">
                {video.description}
              </p>
            )}

            <div className="mb-12">
              <CommentsDrawer videoId={video.id} />
            </div>

            {relatedVideos.length > 0 && (
              <div>
                <div className="mb-6">
                  <Eyebrow tone="subtle">Related Films</Eyebrow>
                </div>
                <div className="grid grid-cols-3 gap-4">
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
