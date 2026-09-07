import Stripe from 'stripe';
import db from '@/utils/db';

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY as string
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return Response.redirect(
      new URL('/bookings?error=missing-session', req.url)
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const bookingId = session.metadata?.bookingId;

    if (!bookingId) {
      return Response.redirect(
        new URL('/bookings?error=missing-booking', req.url)
      );
    }

    if (session.payment_status !== 'paid') {
      return Response.redirect(
        new URL('/bookings?error=payment-not-completed', req.url)
      );
    }

    await db.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        paymentStatus: true,
      },
    });

    return Response.redirect(
      new URL('/bookings', req.url)
    );
  } catch (error) {
    console.error('Payment confirmation error:', error);

    return Response.redirect(
      new URL('/bookings?error=confirmation-failed', req.url)
    );
  }
}