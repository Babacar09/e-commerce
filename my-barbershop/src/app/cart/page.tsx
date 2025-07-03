'use client';

import { useRouter } from "next/navigation";
import useCart from "@/app/cart/CartContex"; // ✅ import ton contexte custom

export default function CartPage() {
  const { cart, removeFromCart, decreaseQuantity } = useCart(); // ✅ récupère le panier via le contexte
  const router = useRouter();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-[70vh] py-20 px-4">
      <h1 className="text-2xl font-bold text-center">Panier</h1>

      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.images[0]} // ✅ on revient à images[] car product vient de ta base
                  alt={item.title}
                  className="w-40 h-40 object-cover rounded-md"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p>
                    Quantité : {item.quantity} — Prix unitaire : {item.price} FCFA
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="font-semibold">
                  Total : {item.price * item.quantity} FCFA
                </span>
                <button
                  //onClick={() => removeFromCart(item.id)}
                  onClick ={()=>decreaseQuantity(item.id)}
                  className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}

          <div className="text-right text-xl font-bold mt-6">
            Total général : {total} FCFA
          </div>

          <div className="mt-6 text-right">
            <button
              onClick={() => router.push('/checkout')}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Valider le panier
            </button>
          </div>
        </div>
      )}
    </div>
  );
}




















// 'use client';

// import { useCartStore } from "@/store/cartStore";
// import { useRouter } from "next/navigation"; // ✅ Utilise 'next/navigation' avec App Router




// export default function CartPage() {

//   const { cart, removeFromCart } = useCartStore();
//   const router = useRouter(); // ✅ Appelle dans un composant client

//   const total = cart.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//     // <div className="max-w-4xl mx-auto p-52">
//     // <div className="min-h-[70vh] flex flex-col items-center justify-center text-center py-10">
//       <div className="min-h-[70vh] py-20 px-4">
//       <h1 className="text-2xl font-bold  text-center">Panier</h1>

//       {cart.length === 0 ? (
//         <p>Votre panier est vide.</p>
//       ) : (
//         <div className="space-y-6">
//           {cart.map((item) => (
//             <div
//               key={item.id}
//               className="flex items-center justify-between border-b pb-4"
//             >
//               <div className="flex items-center gap-4">
//                 <img
//                  //src={item.images[0]}
//                   src={item.imageUrl}
//                   alt={item.title}
//                   className="w-40 h-40 object-cover rounded-md"
//                 />
//                 <div>
//                   <h2 className="text-lg font-semibold">{item.title}</h2>
//                   <p>
//                     Quantité : {item.quantity} — Prix unitaire : {item.price} FCFA
//                   </p>
//                 </div>
//               </div>

//               <div className="flex flex-col items-end gap-2">
//                 <span className="font-semibold">
//                   Total : {item.price * item.quantity} FCFA
//                 </span>
//                 <button
//                   onClick={() => removeFromCart(item.id)}
//                   className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//                 >
//                   Supprimer
//                 </button>
//               </div>
//             </div>
//           ))}

//           <div className="text-right text-xl font-bold mt-6">
//             Total général : {total} FCFA
//           </div>

//           {/* ✅ Bouton de validation */}
//           <div className="mt-6 text-right">
//             <button
//               onClick={() => router.push('/checkout')}
//               className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
//             >
//               Valider le panier
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }










