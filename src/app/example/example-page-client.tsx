'use client';

import {
  GetCategoryDocument,
  GetHomeScreensDocument,
  GetOriginalVideoDocument,
  GetVideoCommentsDocument,
  type GetVideoCommentsQuery,
} from '@/lib/graphql/generated/graphql';
import { useSuspenseQuery } from '@apollo/client/react';
import {
  COMMENTS_PAGE_SIZE,
  EXAMPLE_CATEGORY_ID,
  EXAMPLE_ORIGINAL_VIDEO_ID,
  EXAMPLE_VIDEO_COMMENTS_ID,
} from './example-constants';

export function ExamplePageClient() {
  const { data: homeScreenData } = useSuspenseQuery(GetHomeScreensDocument);
  const { data: videoData } = useSuspenseQuery(GetOriginalVideoDocument, {
    variables: { id: EXAMPLE_ORIGINAL_VIDEO_ID },
  });
  const { data: videoCommentsData, fetchMore } = useSuspenseQuery(
    GetVideoCommentsDocument,
    {
      variables: {
        id: EXAMPLE_VIDEO_COMMENTS_ID,
        first: COMMENTS_PAGE_SIZE,
      },
    },
  );
  const { data: categoryData } = useSuspenseQuery(GetCategoryDocument, {
    variables: { id: EXAMPLE_CATEGORY_ID },
  });

  return (
    <div className="flex gap-4">
      <div>
        <h2>Home Screen</h2>
        {homeScreenData.homeScreens[0]?.category?.name}
        {homeScreenData.homeScreens[0]?.videos?.map((video) => (
          <div key={video.id}>
            <div>{video.title}</div>
          </div>
        ))}
      </div>
      <div>
        <h2>Video</h2>
        <div>{videoData.originalVideo?.title}</div>
      </div>
      <div>
        <h2>Comments</h2>
        {videoCommentsData.videoComments.edges?.map(({ node }) =>
          node ? (
            <div key={node.id}>
              <div>{node.contents}</div>
            </div>
          ) : null,
        )}
        <button
          type="button"
          onClick={() =>
            void fetchMore({
              variables: {
                after: videoCommentsData.videoComments.pageInfo?.endCursor,
              },
              updateQuery: (
                prev: GetVideoCommentsQuery,
                {
                  fetchMoreResult,
                }: { fetchMoreResult: GetVideoCommentsQuery },
              ) => ({
                videoComments: {
                  ...prev.videoComments,
                  edges: [
                    ...(prev.videoComments.edges ?? []),
                    ...(fetchMoreResult.videoComments.edges ?? []),
                  ],
                  pageInfo: fetchMoreResult.videoComments.pageInfo,
                },
              }),
            })
          }
        >
          Load More
        </button>
      </div>
      <div>
        <h2>Category</h2>
        {categoryData.category.name}
        {categoryData.category.videos?.map((video) => (
          <div key={video.id}>
            <div>{video.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
