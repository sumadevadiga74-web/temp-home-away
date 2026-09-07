import { fetchPropertyReviewsByUser } from '@/utils/actions';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';

const ReviewsPage = async () => {
  const reviews = await fetchPropertyReviewsByUser();

  if (reviews.length === 0) {
    return (
      <section className='mt-8'>
        <h1 className='text-3xl font-bold'>My Reviews</h1>

        <p className='mt-4 text-muted-foreground'>
          You have not written any reviews yet.
        </p>
      </section>
    );
  }

  return (
    <section className='mt-8'>
      <h1 className='text-3xl font-bold mb-8'>
        My Reviews
      </h1>

      <div className='space-y-6'>
      {reviews.map((review: any) => (
          <div
            key={review.id}
            className='border rounded-lg p-6'
          >
            <div className='flex items-center gap-4'>
              <Image
                src={review.Property.image}
                alt={review.Property.name}
                width={120}
                height={80}
                className='rounded-md object-cover'
              />

              <div>
                <Link
                  href={`/properties/${review.propertyId}`}
                  className='text-xl font-semibold hover:underline'
                >
                  {review.Property.name}
                </Link>

                <div className='flex items-center gap-1 mt-2'>
                  <FaStar className='w-4 h-4' />
                  <span>{review.rating}/5</span>
                </div>
              </div>
            </div>

            <p className='mt-4 text-sm'>
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewsPage;