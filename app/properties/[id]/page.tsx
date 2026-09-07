import { fetchPropertyDetails } from '@/utils/actions';
import { redirect } from 'next/navigation';

import Description from '@/components/properties/Description';
import { Separator } from '@/components/ui/separator';
import FavoriteToggleButton from '@/components/card/FavoriteToggleButton';
import PropertyRating from '@/components/card/PropertyRating';
import UserInfo from '@/components/properties/UserInfo';
import BreadCrumbs from '@/components/properties/BreadCrumbs';
import ShareButton from '@/components/properties/ShareButton';
import ImageContainer from '@/components/properties/ImageContainer';
import PropertyDetails from '@/components/properties/PropertyDetails';
import Amenities from '@/components/properties/Amenities';

import BookingWrapper from '@/components/booking/BookingWrapper';
import DynamicPropertyMap from '@/components/properties/DynamicPropertyMap';
import Reviews from '@/components/properties/Reviews';
import ReviewForm from '@/components/properties/ReviewForm';

async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const property = await fetchPropertyDetails(id);

  if (!property) redirect('/');

  const firstName = property.profile.firstName;
  const profileImage = property.profile.profileImage;

  return (
    <section>
      <BreadCrumbs name={property.name} />

      <header className='flex justify-between items-center mt-4'>
        <h1 className='text-4xl font-bold'>
          {property.tagline}
        </h1>

        <div className='flex items-center gap-x-4'>
          <ShareButton
            propertyId={property.id}
            name={property.name}
          />

          <FavoriteToggleButton
            propertyId={property.id}
          />
        </div>
      </header>

      <ImageContainer
        mainImage={property.image}
        name={property.name}
      />

      <section className='lg:grid lg:grid-cols-12 gap-x-12 mt-12'>
        <div className='lg:col-span-8'>
          <div className='flex gap-x-4 items-center'>
            <h1 className='text-xl font-bold'>
              {property.name}
            </h1>

            <PropertyRating
              inPage
              propertyId={property.id}
            />
          </div>

          <UserInfo
            profile={{
              firstName,
              profileImage,
            }}
          />

          <PropertyDetails
            bedrooms={property.bedrooms}
            baths={property.baths}
            guests={property.guests}
            beds={property.beds}
          />

          <Separator className='mt-4' />

          <Description
            description={property.description}
          />

          <Amenities
            amenities={property.amenities}
          />

          <Separator className='mt-4' />

          <DynamicPropertyMap
            countryCode={property.country}
          />
<Reviews propertyId={property.id} />
<ReviewForm propertyId={property.id} />
        </div>

        <div className='lg:col-span-4 flex flex-col items-center'>
          <BookingWrapper
            propertyId={property.id}
            price={property.price}
            bookings={[]}
          />
        </div>
      </section>
    </section>
  );
}

export default PropertyDetailsPage;