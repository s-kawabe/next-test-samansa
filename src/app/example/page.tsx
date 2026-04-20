import {
  GetCategoryDocument,
  GetHomeScreensDocument,
  GetOriginalVideoDocument,
  GetVideoCommentsDocument,
} from '@/lib/graphql/generated/graphql';
import { PreloadQuery } from '@/lib/apolloRSC';
import { Suspense } from 'react';
import {
  COMMENTS_PAGE_SIZE,
  EXAMPLE_CATEGORY_ID,
  EXAMPLE_ORIGINAL_VIDEO_ID,
  EXAMPLE_VIDEO_COMMENTS_ID,
} from './example-constants';
import { ExamplePageClient } from './example-page-client';

export default function ExamplePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PreloadQuery query={GetHomeScreensDocument}>
        <PreloadQuery
          query={GetOriginalVideoDocument}
          variables={{ id: EXAMPLE_ORIGINAL_VIDEO_ID }}
        >
          <PreloadQuery
            query={GetVideoCommentsDocument}
            variables={{
              id: EXAMPLE_VIDEO_COMMENTS_ID,
              first: COMMENTS_PAGE_SIZE,
            }}
          >
            <PreloadQuery
              query={GetCategoryDocument}
              variables={{ id: EXAMPLE_CATEGORY_ID }}
            >
              <ExamplePageClient />
            </PreloadQuery>
          </PreloadQuery>
        </PreloadQuery>
      </PreloadQuery>
    </Suspense>
  );
}
