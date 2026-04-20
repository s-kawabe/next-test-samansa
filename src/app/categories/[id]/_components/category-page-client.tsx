'use client';

import { notFound } from 'next/navigation';
import { useSuspenseQuery } from '@apollo/client/react';
import { GetCategoryDocument } from '@/lib/graphql/generated/graphql';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { CategoryVideoCard } from '@/components/features/category/CategoryVideoCard';

type Props = { id: string };

export function CategoryPageClient({ id }: Props) {
  const { data } = useSuspenseQuery(GetCategoryDocument, { variables: { id } });
  const category = data.category;

  if (!category) notFound();

  const videos = category.videos ?? [];

  return (
    <div className="container-max" style={{ padding: 'var(--spacing-12) 0' }}>
      <div style={{ marginBottom: 'var(--spacing-8)' }}>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: category.name ?? '' },
          ]}
        />
      </div>

      <div style={{ marginBottom: 'var(--spacing-12)' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-6xl)',
            fontWeight: 900,
            letterSpacing: 'var(--tracking-tighter)',
            color: 'var(--color-foreground)',
            lineHeight: 'var(--leading-tight)',
          }}
        >
          {category.name}
        </h1>
        <p
          style={{
            marginTop: 'var(--spacing-3)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            letterSpacing: 'var(--tracking-wider)',
            textTransform: 'uppercase',
            color: 'var(--color-foreground-subtle)',
          }}
        >
          {videos.length} FILMS
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 'var(--spacing-8)',
        }}
      >
        {videos.map((video, i) => (
          <CategoryVideoCard key={video.id} video={video} index={i + 1} />
        ))}
      </div>
    </div>
  );
}
