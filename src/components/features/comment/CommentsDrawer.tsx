'use client';

import { useSuspenseQuery } from '@apollo/client/react';
import {
  GetVideoCommentsDocument,
  type GetVideoCommentsQuery,
} from '@/lib/graphql/generated/graphql';
import { Button } from '@/components/ui/Button';
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
    <div className="p-6 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <span className="font-mono text-xs tracking-wider uppercase text-foreground-subtle">
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
        <Button
          onClick={loadMore}
          variant="ghost"
          size="sm"
          className="mt-4 py-3 px-4 font-mono text-xs tracking-wider uppercase border-border"
        >
          Load more ({remaining} remaining)
        </Button>
      )}
    </div>
  );
}

export function CommentsDrawer({ videoId }: CommentsDrawerProps) {
  return (
    <Drawer
      title="Comments"
      trigger="Comments"
    >
      <CommentsDrawerContent videoId={videoId} />
    </Drawer>
  );
}
