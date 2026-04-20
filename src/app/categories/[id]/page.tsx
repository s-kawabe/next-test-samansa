import { Suspense } from 'react';
import { GetCategoryDocument } from '@/lib/graphql/generated/graphql';
import { PreloadQuery } from '@/lib/apolloRSC';
import { CategoryPageClient } from './_components/category-page-client';

export const revalidate = 60;

type Props = { params: Promise<{ id: string }> };

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;

  return (
    <Suspense fallback={<CategoryLoading />}>
      <PreloadQuery query={GetCategoryDocument} variables={{ id }}>
        <CategoryPageClient id={id} />
      </PreloadQuery>
    </Suspense>
  );
}

function CategoryLoading() {
  return (
    <div className="container-max" style={{ padding: 'var(--spacing-12) 0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-12)' }}>
        <div style={{ height: 80, width: '50%', background: 'var(--color-background-muted)', borderRadius: 'var(--radius-sm)' }} />
        <div style={{ height: 14, width: 100, background: 'var(--color-background-muted)', borderRadius: 'var(--radius-xs)' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--spacing-8)' }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
            <div style={{ aspectRatio: '16/9', background: 'var(--color-background-muted)', borderRadius: 'var(--radius-sm)' }} />
            <div style={{ height: 16, background: 'var(--color-background-muted)', borderRadius: 'var(--radius-xs)' }} />
          </div>
        ))}
      </div>
    </div>
  );
}
