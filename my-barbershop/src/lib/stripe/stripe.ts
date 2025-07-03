// lib/stripe.ts
import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

// if (!key) {
//   throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined');
// }

// export const stripePromise = loadStripe(key);


