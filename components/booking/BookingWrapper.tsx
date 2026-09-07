'use client';

import { useProperty } from '@/utils/store';
import BookingContainer from './BookingContainer';
import ConfirmBooking from './ConfirmBooking';
import { Booking } from '@/utils/types';
import { useEffect } from 'react';

type BookingWrapperProps = {
  propertyId: string;
  price: number;
  bookings: Booking[];
};

export default function BookingWrapper({
  propertyId,
  price,
  bookings,
}: BookingWrapperProps) {
  useEffect(() => {
    useProperty.setState({
      propertyId,
      price,
      bookings,
    });
  }, [propertyId, price, bookings]);

  const range = useProperty((state) => state.range);

  return (
    <div className='w-full'>
      <BookingContainer />

      {range?.from && range?.to && (
        <div className='mt-6'>
          <ConfirmBooking />
        </div>
      )}
    </div>
  );
}
