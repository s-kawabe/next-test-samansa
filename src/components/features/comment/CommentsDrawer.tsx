'use client';

import { useSuspenseQuery } from '@apollo/client/react';
import {
  GetVideoCommentsDocument,
  type GetVideoCommentsQuery,
} from '@/lib/graphql/generated/graphql';
import { Drawer } from '@/components/ui/Drawer';
import { CommentItem } from './CommentItem';

const COMMENTS_PAGE_SIZE = 10;

type CommentsDrawerProps = {
  videoId: string;
};

function CommentsDrawerContent({ videoId }: CommentsDrawerProps) {
  const { data, fetchMore } = useSuspenseQuery(GetVideoCommentsDocument, {
    variables: { id: videoId, first: COMMENTS_PAGE_SIZE },
  });

  const edges = data.videoComments.edges ?? [];
  const allCount = data.videoComments.allCount ?? 0;
  const hasNextPage = data.videoComments.pageInfo?.hasNextPage ?? false;
  const remaining = allCount - edges.length;

  const loadMore = () => {
    void fetchMore({
      variables: { after: data.videoComments.pageInfo?.endCursor },
      updateQuery: (prev: GetVideoCommentsQuery, { fetchMoreResult }) => ({
        videoComments: {
          ...prev.videoComments,
          edges: [
            ...(prev.videoComments.edges ?? []),
            ...(fetchMoreResult.videoComments.edges ?? []),
          ],
          pageInfo: fetchMoreResult.videoComments.pageInfo,
        },
      }),
    });
  };

  return (
    <div style={{ padding: 'var(--spacing-6)', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--spacing-4)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            letterSpacing: 'var(--tracking-wider)',
            textTransform: 'uppercase',
            color: 'var(--color-foreground-subtle)',
          }}
        >
          COMMENTS · {allCount}
        </span>
      </div>

      <div>
        {edges.map((edge, i) => {
          const node = edge?.node;
          if (!node) return null;
          return <CommentItem key={node.id} comment={node} first={i === 0} />;
        })}
      </div>

      {hasNextPage && (
        <button
          type="button"
          onClick={loadMore}
          style={{
            marginTop: 'var(--spacing-4)',
            padding: 'var(--spacing-3) var(--spacing-4)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            background: 'transparent',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-foreground-muted)',
            cursor: 'pointer',
            letterSpacing: 'var(--tracking-wider)',
            textTransform: 'uppercase',
          }}
        >
          Load more ({remaining} remaining)
        </button>
      )}
    </div>
  );
}

export function CommentsDrawer({ videoId }: CommentsDrawerProps) {
  return (
    <Drawer
      title="Comments"
      trigger={
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: 'var(--spacing-3) var(--spacing-4)',
            border: '1px solid var(--color-border-strong)',
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            letterSpacing: 'var(--tracking-wider)',
            textTransform: 'uppercase',
            color: 'var(--color-foreground-muted)',
            cursor: 'pointer',
          }}
        >
          Comments
        </span>
      }
    >
      <CommentsDrawerContent videoId={videoId} />
    </Drawer>
  );
}
