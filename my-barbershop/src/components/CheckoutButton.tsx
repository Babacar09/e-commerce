'use client';

import { stripePromise } from '@/lib/stripe/stripe';

export default function CheckoutButton({ orderId }: { orderId: string }) {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Aucun token trouvé.');
      return;
    }

    console.log('Token envoyé:', token);

    const res = await fetch('http://localhost:3000/api/v1/payments/create-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ orderId }),
    });

    const data = await res.json();

    // 🔁 Fallback : redirection via Stripe (id) ou manuelle (url)
    if (stripe && data.id) {
      await stripe.redirectToCheckout({ sessionId: data.id });
    } else if (data.url) {
      window.location.href = data.url; // redirection manuelle
    } else {
      console.error('Erreur lors de la création de la session Stripe', data);
    }
  };

  return <button onClick={handleCheckout} className='border p-2 rounded bg-gray-800 text-white text-lg ml-40'>Payer cette commande</button>;
}











