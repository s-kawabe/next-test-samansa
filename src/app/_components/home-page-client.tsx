'use client';

import { useSuspenseQuery } from '@apollo/client/react';
import { GetHomeScreensDocument } from '@/lib/graphql/generated/graphql';
import { CategoryShelf } from '@/components/features/category/CategoryShelf';

export function HomePageClient() {
  const { data } = useSuspenseQuery(GetHomeScreensDocument);
  const homeScreens = data.homeScreens;

  return (
    <div>
      <section
        style={{
          padding: 'var(--spacing-24) 0 var(--spacing-16)',
        }}
        className="container-max"
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-7xl)',
            fontWeight: 900,
            letterSpacing: 'var(--tracking-tighter)',
            lineHeight: 'var(--leading-tight)',
            color: 'var(--color-foreground)',
          }}
        >
          Curated cinema,<br />your way.
        </h1>
        <p
          style={{
            marginTop: 'var(--spacing-4)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            letterSpacing: 'var(--tracking-wider)',
            textTransform: 'uppercase',
            color: 'var(--color-foreground-subtle)',
          }}
        >
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
