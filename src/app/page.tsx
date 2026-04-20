import { Suspense } from 'react';
import { GetHomeScreensDocument } from '@/lib/graphql/generated/graphql';
import { PreloadQuery } from '@/lib/apolloRSC';
import { HomePageClient } from './_components/home-page-client';
import { HomeLoading } from './loading';

export const revalidate = 60;

export default function HomePage() {
  return (
    <Suspense fallback={<HomeLoading />}>
      <PreloadQuery query={GetHomeScreensDocument}>
        <HomePageClient />
      </PreloadQuery>
    </Suspense>
  );
}
