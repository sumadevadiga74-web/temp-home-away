'use client';

import { useActionState } from 'react';
import { createReviewAction } from '@/utils/actions';

function ReviewForm({ propertyId }: { propertyId: string }) {
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    {
      propertyId,
      message: '',
    }
  );

  return (
    <section className='mt-8'>
      <h2 className='text-2xl font-bold mb-4'>
        Leave a Review
      </h2>

      <form action={formAction} className='space-y-4 max-w-xl'>
        <input
          type='hidden'
          name='propertyId'
          value={propertyId}
        />

        <div>
          <label
            htmlFor='rating'
            className='block mb-2 font-medium'
          >
            Rating
          </label>

          <select
            id='rating'
            name='rating'
            className='border rounded p-2 w-full'
            required
            defaultValue=''
          >
            <option value='' disabled>
              Select rating
            </option>
            <option value='5'>★★★★★ 5</option>
            <option value='4'>★★★★ 4</option>
            <option value='3'>★★★ 3</option>
            <option value='2'>★★ 2</option>
            <option value='1'>★ 1</option>
          </select>
        </div>

        <div>
          <label
            htmlFor='comment'
            className='block mb-2 font-medium'
          >
            Comment
          </label>

          <textarea
            id='comment'
            name='comment'
            placeholder='Write your review...'
            className='border rounded p-2 w-full min-h-32'
            required
            minLength={10}
          />
        </div>

        <button
          type='submit'
          disabled={isPending}
          className='bg-primary text-primary-foreground px-4 py-2 rounded'
        >
          {isPending ? 'Submitting...' : 'Submit Review'}
        </button>

        {state?.message && (
          <p className='text-sm mt-2'>
            {state.message}
          </p>
        )}
      </form>
    </section>
  );
}

export default ReviewForm;