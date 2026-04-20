import {
  GetCategoryDocument,
  GetHomeScreensDocument,
  GetOriginalVideoDocument,
  GetVideoCommentsDocument,
} from '@/lib/graphql/generated/graphql';
import { query } from '@/lib/apolloRSC';
import {
  COMMENTS_PAGE_SIZE,
  EXAMPLE_CATEGORY_ID,
  EXAMPLE_ORIGINAL_VIDEO_ID,
  EXAMPLE_VIDEO_COMMENTS_ID,
} from './example-constants';
import { ExamplePageClient } from './example-page-client';

export default async function ExamplePage() {
  await Promise.all([
    query({ query: GetHomeScreensDocument }),
    query({ query: GetOriginalVideoDocument, variables: { id: EXAMPLE_ORIGINAL_VIDEO_ID } }),
    query({ query: GetVideoCommentsDocument, variables: { id: EXAMPLE_VIDEO_COMMENTS_ID, first: COMMENTS_PAGE_SIZE } }),
    query({ query: GetCategoryDocument, variables: { id: EXAMPLE_CATEGORY_ID } }),
  ]);

  return <ExamplePageClient />;
}
