'use client';

import axios from 'axios';
import { Suspense, useCallback, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

function CheckoutContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const [error, setError] = useState<string | null>(null);

  const fetchClientSecret = useCallback(async () => {
    if (!bookingId) {
      const message = 'Booking ID is missing';
      setError(message);
      throw new Error(message);
    }

    try {
      const response = await axios.post('/api/payment', {
        bookingId,
      });

      if (!response.data?.clientSecret) {
        const message = 'Stripe did not return a client secret';
        setError(message);
        throw new Error(message);
      }

      return response.data.clientSecret;
    } catch (error: any) {
      console.error('Payment error:', error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.statusText ||
        error?.message ||
        'Unable to create checkout session';

      setError(message);
      throw new Error(message);
    }
  }, [bookingId]);

  if (!bookingId) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold">
          Booking ID is missing
        </h1>

        <p className="mt-2 text-muted-foreground">
          Please select your dates and click Reserve again.
        </p>
      </div>
    );
  }

  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold">
          Stripe configuration error
        </h1>

        <p className="mt-2 text-red-500">
          NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is missing.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      {error && (
        <div className="mb-6 rounded-md border border-red-300 bg-red-50 p-4 text-red-700">
          <h2 className="font-bold">Payment Error</h2>
          <p className="mt-1">{error}</p>
        </div>
      )}

      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ fetchClientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto py-10">
          <p>Loading checkout...</p>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}