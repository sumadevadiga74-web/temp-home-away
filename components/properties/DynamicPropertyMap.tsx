'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

type PropertyMapType = React.ComponentType<{
  countryCode: string;
}>;

function DynamicPropertyMap({
  countryCode,
}: {
  countryCode: string;
}) {
  const [PropertyMap, setPropertyMap] =
    useState<PropertyMapType | null>(null);

  useEffect(() => {
    import('@/components/properties/PropertyMap').then(
      (module) => {
        setPropertyMap(() => module.default);
      }
    );
  }, []);

  if (!PropertyMap) {
    return <Skeleton className='h-[400px] w-full' />;
  }

  return <PropertyMap countryCode={countryCode} />;
}

export default DynamicPropertyMap;