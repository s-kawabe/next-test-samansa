'use client';

import { useSuspenseQuery } from '@apollo/client/react';
import { GetHomeScreensDocument } from '@/lib/graphql/generated/graphql';
import { CategoryShelf } from '@/components/features/category/CategoryShelf';

export function HomePageClient() {
  const { data } = useSuspenseQuery(GetHomeScreensDocument);
  const homeScreens = data.homeScreens;

  return (
    <div>
      <section className="container-max pt-24 pb-16">
        <h1 className="font-display text-7xl font-black tracking-tighter leading-tight text-foreground">
          Curated cinema,<br />your way.
        </h1>
        <p className="mt-4 font-mono text-xs tracking-wider uppercase text-foreground-subtle">
          {homeScreens.length} CATEGORIES · CURATED SHORT CINEMA
        </p>
      </section>

      <div className="container-max">
        {homeScreens.map((screen, i) => {
          const category = screen.category;
          if (!category) return null;
          return (
            <CategoryShelf
              key={screen.id}
              categoryId={category.id}
              categoryName={category.name ?? ''}
              tagline={null}
              index={i + 1}
              total={homeScreens.length}
              videos={screen.videos ?? []}
            />
          );
        })}
      </div>
    </div>
  );
}
