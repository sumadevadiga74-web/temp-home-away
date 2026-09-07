'use server';

import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import db from '@/utils/db';

export const createBookingAction = async ({
  propertyId,
  checkIn,
  checkOut,
}: {
  propertyId: string;
  checkIn: Date;
  checkOut: Date;
}) => {
  const user = await currentUser();

  if (!user) {
    throw new Error('You must be logged in to book a property');
  }

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (!profile) {
    throw new Error('Profile not found');
  }

  const property = await db.property.findUnique({
    where: {
      id: propertyId,
    },
  });

  if (!property) {
    throw new Error('Property not found');
  }

  const totalNights = Math.ceil(
    (checkOut.getTime() - checkIn.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (totalNights <= 0) {
    throw new Error('Check-out date must be after check-in date');
  }

  const orderTotal = property.price * totalNights;

  const booking = await db.booking.create({
    data: {
      id: crypto.randomUUID(),
      profileId: profile.clerkId,
      propertyId: property.id,
      orderTotal,
      totalNights,
      checkIn,
      checkOut,
      paymentStatus: false,
      updatedAt: new Date(),
    },
  });

  redirect(`/checkout?bookingId=${booking.id}`);
};