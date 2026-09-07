import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import db from '@/utils/db';

const BookingsPage = async () => {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const bookings = await db.booking.findMany({
    where: {
      profileId: user.id,
    },
    include: {
      Property: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Your Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-muted-foreground">
          You don't have any bookings yet.
        </p>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="border rounded-lg p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold">
                {booking.Property.name}
              </h2>

              <div className="mt-4 space-y-2">
                <p>
                  <strong>Check-in:</strong>{' '}
                  {booking.checkIn.toLocaleDateString()}
                </p>

                <p>
                  <strong>Check-out:</strong>{' '}
                  {booking.checkOut.toLocaleDateString()}
                </p>

                <p>
                  <strong>Nights:</strong> {booking.totalNights}
                </p>

                <p>
                  <strong>Total:</strong> ${booking.orderTotal}
                </p>

                <p>
                  <strong>Payment:</strong>{' '}
                  {booking.paymentStatus ? (
                    <span className="text-green-600 font-semibold">
                      Paid
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">
                      Pending
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsPage;