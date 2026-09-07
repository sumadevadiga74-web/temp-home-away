import PropertiesContainer from '@/components/home/PropertiesContainer';
import LoadingCards from '@/components/card/LoadingCards';
import { Suspense } from 'react';

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}) {
  const params = await searchParams;

  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8'>
        Properties
      </h1>

      <Suspense fallback={<LoadingCards />}>
        <PropertiesContainer
          category={params.category}
          search={params.search}
        />
      </Suspense>
    </section>
  );
}