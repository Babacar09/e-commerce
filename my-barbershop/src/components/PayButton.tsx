// 'use client';

// import { createStripeSession } from '@/lib/stripe/stripe';

// export default function PayButton({ orderId, token }: { orderId: string; token: string }) {
//   const handleClick = async () => {
//     try {
//       const url = await createStripeSession(orderId, token);
//       if (url) {
//         window.location.href = url;
//       } else {
//         throw new Error('Session Stripe non reçue');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Erreur lors du paiement');
//     }
//   };

//   return (
//     <button
//       onClick={handleClick}
//       className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//     >
//       Payer la commande
//     </button>
//   );
// }

