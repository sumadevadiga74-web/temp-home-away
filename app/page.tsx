import CategoriesList from '@/components/home/CategoriesList';
import PropertiesContainer from '@/components/home/PropertiesContainer';
import LoadingCards from '@/components/card/LoadingCards';
import { Suspense } from 'react';

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const params = await searchParams;

  return (
    <section>
      <CategoriesList
        category={params.category}
        search={params.search}
      />

      <Suspense fallback={<LoadingCards />}>
        <PropertiesContainer
          category={params.category}
          search={params.search}
        />
      </Suspense>
    </section>
  );
}