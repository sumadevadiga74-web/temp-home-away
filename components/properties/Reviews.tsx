import { fetchReviews } from '@/utils/actions';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

async function Reviews({
  propertyId,
}: {
  propertyId: string;
}) {
  const reviews = await fetchReviews(propertyId);

  if (reviews.length === 0) {
    return (
      <section className='mt-8'>
        <h2 className='text-2xl font-bold'>Reviews</h2>
        <p className='mt-2 text-muted-foreground'>
          No reviews yet.
        </p>
      </section>
    );
  }

  return (
    <section className='mt-8'>
      <h2 className='text-2xl font-bold mb-6'>Reviews</h2>

      <div className='space-y-6'>
       {reviews.map((review: any) => (
          <div key={review.id} className='border-b pb-6'>
            <div className='flex items-center gap-3'>
              <Image
                src={review.Profile.profileImage}
                alt={review.Profile.firstName}
                width={40}
                height={40}
                className='rounded-full'
              />

              <div>
                <p className='font-semibold'>
                  {review.Profile.firstName}
                </p>

                <div className='flex items-center gap-1'>
                  <FaStar className='w-3 h-3' />
                  <span>{review.rating}/5</span>
                </div>
              </div>
            </div>

            <p className='mt-3 text-sm'>
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Reviews;