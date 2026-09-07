import Link from 'next/link';
import Image from 'next/image';
import { fetchUserProperties } from '@/utils/actions';

const RentalsPage = async () => {
  const properties = await fetchUserProperties();

  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8'>
        My Rentals
      </h1>

      {properties.length === 0 ? (
        <div>
          <p className='text-muted-foreground'>
            You have not created any rentals yet.
          </p>

          <Link
            href='/rentals/create'
            className='inline-block mt-4 bg-primary text-primary-foreground px-4 py-2 rounded'
          >
            Create Rental
          </Link>
        </div>
      ) : (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
         {properties.map((property: typeof properties[number]) => (
            <Link
              key={property.id}
              href={`/properties/${property.id}`}
              className='border rounded-lg overflow-hidden hover:shadow-md transition'
            >
              <Image
                src={property.image}
                alt={property.name}
                width={400}
                height={250}
                className='w-full h-48 object-cover'
              />

              <div className='p-4'>
                <h2 className='font-semibold text-lg'>
                  {property.name}
                </h2>

                <p className='text-sm text-muted-foreground mt-1'>
                  {property.tagline}
                </p>

                <p className='font-medium mt-3'>
                  ₹{property.price} / night
                </p>

                <p className='text-sm text-muted-foreground mt-1'>
                  {property.country}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default RentalsPage;