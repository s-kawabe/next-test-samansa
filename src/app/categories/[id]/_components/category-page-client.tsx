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
    <div className="container-max py-12">
      <div className="mb-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: category.name ?? '' },
          ]}
        />
      </div>

      <div className="mb-12">
        <h1 className="font-display text-6xl font-black tracking-tighter text-foreground leading-tight">
          {category.name}
        </h1>
        <p className="mt-3 font-mono text-xs tracking-wider uppercase text-foreground-subtle">
          {videos.length} FILMS
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8">
        {videos.map((video, i) => (
          <CategoryVideoCard key={video.id} video={video} index={i + 1} />
        ))}
      </div>
    </div>
  );
}
