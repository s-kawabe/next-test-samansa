import { Suspense } from 'react';
import { GetOriginalVideoDocument, GetVideoCommentsDocument } from '@/lib/graphql/generated/graphql';
import { PreloadQuery } from '@/lib/apolloRSC';
import { COMMENTS_PAGE_SIZE } from '@/lib/constants';
import { VideoPageClient } from './_components/video-page-client';

export const revalidate = 60;

type Props = { params: Promise<{ id: string }> };

export default async function VideoPage({ params }: Props) {
  const { id } = await params;

  return (
    <Suspense fallback={<VideoLoading />}>
      <PreloadQuery query={GetOriginalVideoDocument} variables={{ id }}>
        <PreloadQuery
          query={GetVideoCommentsDocument}
          variables={{ id, first: COMMENTS_PAGE_SIZE }}
        >
          <VideoPageClient id={id} />
        </PreloadQuery>
      </PreloadQuery>
    </Suspense>
  );
}

function VideoLoading() {
  return (
    <div>
      <div style={{ width: '100%', aspectRatio: '16/9', background: 'var(--color-background-muted)' }} />
      <div className="container-max" style={{ padding: 'var(--spacing-8) 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
          <div style={{ height: 14, width: 200, background: 'var(--color-background-muted)', borderRadius: 'var(--radius-xs)' }} />
          <div style={{ height: 56, width: '60%', background: 'var(--color-background-muted)', borderRadius: 'var(--radius-sm)' }} />
          <div style={{ height: 80, background: 'var(--color-background-muted)', borderRadius: 'var(--radius-sm)' }} />
        </div>
      </div>
    </div>
  );
}
