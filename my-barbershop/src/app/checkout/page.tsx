'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useCart from '@/app/cart/CartContex'; // ✅ ton ancien système

type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
};

type ShippingAddress = {
  name: string;
  phone: string;
  address: string;
  city: string;
  postCode: string;
  state: string;
  country: string;
};

export default function CheckoutPage() {
  const { cart, clearCart } = useCart(); // ✅ via contexte
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    name: '',
    phone: '',
    address: '',
    city: '',
    postCode: '',
    state: '',
    country: '',
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) setToken(storedToken);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrder = async () => {
    if (cart.length === 0) return alert('Votre panier est vide.');

    for (const key in shippingAddress) {
      if (!shippingAddress[key as keyof ShippingAddress]) {
        return alert(`Veuillez remplir le champ : ${key}`);
      }
    }

    if (!token) return alert('Vous devez être connecté pour commander.');

    const formattedProducts = cart.map((item) => ({
      id: item.id,
      product_unit_price: parseFloat(item.price.toFixed(2)),
      product_quantity: item.quantity,
    }));

    try {
      setIsLoading(true);
      console.log("Token envoyé au backend:", token);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: 'POST',
        headers: {
           Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
         
        },
        body: JSON.stringify({
          orderedProducts: formattedProducts,
          shippingAddress,
        }),
      });

      if (!res.ok) throw new Error('Erreur serveur');

      clearCart(); // ✅ vide panier
      alert('Commande validée avec succès !');
      router.push('/orders');
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la commande.');
    } finally {
      setIsLoading(false);
    }
  };

  const fieldLabels: Record<keyof ShippingAddress, string> = {
    name: 'Nom complet',
    phone: 'Téléphone',
    address: 'Adresse',
    city: 'Ville',
    postCode: 'Code postal',
    state: 'Région',
    country: 'Pays',
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Validation de commande</h1>

      {/* 🛒 PANIER */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Panier</h2>
        {cart.map((item, index) => (
          <div key={index} className="flex items-center justify-between border-b py-2">
            <div className="flex items-center gap-4">
              <img
                src={item.images[0]} // ✅ on revient à `images[]`
                alt={item.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">Quantité : {item.quantity}</p>
              </div>
            </div>
            <div>
              {(item.quantity * item.price).toFixed(2)} FCFA
            </div>
          </div>
        ))}
      </div>

      {/* 📋 LIVRAISON */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Informations de livraison</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(Object.keys(shippingAddress) as (keyof ShippingAddress)[]).map((key) => (
            <input
              key={key}
              name={key}
              value={shippingAddress[key]}
              onChange={handleInputChange}
              placeholder={fieldLabels[key]}
              className="border p-2 rounded"
              required
            />
          ))}
        </div>
      </div>

      {/* ✅ BOUTON */}
      <button
        onClick={handleOrder}
        disabled={isLoading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {isLoading ? 'Traitement...' : 'Valider la commande'}
      </button>
    </div>
  );
}
















// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useCartStore } from '@/store/cartStore' // adapte le chemin selon ta structure

// type Product = {
//   id: number;
//   title: string;
//   price: number;
//   images: string[];
// };

// type CartItem = {
//   product: Product;
//   quantity: number;
// };

// type ShippingAddress = {
//   name: string;
//   phone: string;
//   address: string;
//   city: string;
//   postCode: string;
//   state: string;
//   country: string;
// };

// export default function CheckoutPage() {
//   const cart = useCartStore((state) => state.cart); // ✅ Zustand
//   const clearCart = useCartStore((state) => state.clearCart); // ✅ vider après commande

//   const [isLoading, setIsLoading] = useState(false);
//   const [token, setToken] = useState<string | null>(null);

//   const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
//     name: '',
//     phone: '',
//     address: '',
//     city: '',
//     postCode: '',
//     state: '',
//     country: '',
//   });

//   const router = useRouter();

//   // ✅ Charger le token seulement (le panier est dans Zustand)
//   useState(() => {
//     const storedToken = localStorage.getItem('token');
//     if (storedToken) setToken(storedToken);
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setShippingAddress((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleOrder = async () => {
//     if (cart.length === 0) return alert('Votre panier est vide.');

//     for (const key in shippingAddress) {
//       if (!shippingAddress[key as keyof ShippingAddress]) {
//         return alert(`Veuillez remplir le champ : ${key}`);
//       }
//     }

//     if (!token) return alert('Vous devez être connecté pour passer une commande.');

//     // const productsPayload = cart.map((item) => ({
//     //   productId: item.id,
//     //   product_quantity: item.quantity,
//     //   product_unit_price: item.price,
//     // }));

//     // const formattedProducts = cart.map((item) => ({
//     //     id: item.id,          // attendu : `product`
//     //     product_unit_price: parseFloat(item.price.toFixed(2)),  // attendu : `price`
//     //     product_quantity: item.quantity, // attendu : `quantity`
//     //   }));

//     const formattedProducts = cart.map((item) => {
//         const price = parseFloat(
//             //@ts-ignore
//             item.price
//         ); // Force la conversion en nombre
      
//         if (isNaN(price)) {
//           throw new Error(`Le prix de l'article ${item.id} n'est pas valide.`);
//         }
      
//         return {
//           id: item.id,
//           product_unit_price: parseFloat(price.toFixed(2)),  // Formater le prix à 2 décimales
//           product_quantity: item.quantity,
//         };
//       });
//       console.log(formattedProducts);
      

//     const totalAmount = cart.reduce(
//       (sum, item) => sum + item.quantity * item.price,
//       0
//     );

//     try {
//       setIsLoading(true);
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           //products: productsPayload,
//           //orderedProducts:productsPayload,
//           shippingAddress,
//           orderedProducts:formattedProducts,
          
//           //totalAmount,
//         }),
    
        
//       });

//       if (!res.ok) throw new Error('Erreur lors de la validation');

//       clearCart(); // ✅ vide le panier Zustand
//       alert('Commande validée avec succès !');
//       router.push('/orders');
//     } catch (error) {
//       console.error(error);
//       alert('Erreur lors de la validation de commande');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fieldLabels: Record<keyof ShippingAddress, string> = {
//     name: 'Nom complet',
//     phone: 'Téléphone',
//     address: 'Adresse',
//     city: 'Ville',
//     postCode: 'Code postal',
//     state: 'Région',
//     country: 'Pays',
//   };

//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Validation de commande</h1>

//       {/* 🛒 PANIER */}
//       <div className="mb-6">
//         <h2 className="text-lg font-semibold mb-2">Panier</h2>
//         {cart.map((item, index) => (
//           <div
//             key={index}
//             className="flex items-center justify-between border-b py-2"
//           >
//             <div className="flex items-center gap-4">
//               <img
//                 //src={item.images[0]}
//                 src={item.imageUrl}
//                 alt={item.title}
//                 className="w-16 h-16 object-cover rounded"
//               />
//               <div>
//                 <p className="font-medium">{item.title}</p>
//                 <p className="text-sm text-gray-500">
//                   Quantité : {item.quantity}
//                 </p>
//               </div>
//             </div>
//             <div>
//               {(item.quantity * item.price).toFixed(2)} FCFA
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* 📋 FORMULAIRE DE LIVRAISON */}
//       <div className="mb-6">
//         <h2 className="text-lg font-semibold mb-2">Informations de livraison</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {(Object.keys(shippingAddress) as (keyof ShippingAddress)[]).map(
//             (key) => (
//               <input
//                 key={key}
//                 name={key}
//                 value={shippingAddress[key]}
//                 onChange={handleInputChange}
//                 placeholder={fieldLabels[key]}
//                 className="border p-2 rounded"
//                 required
//               />
//             )
//           )}
//         </div>
//       </div>

//       {/* ✅ BOUTON VALIDER */}
//       <button
//         onClick={handleOrder}
//         disabled={isLoading}
//         className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
//       >
//         {isLoading ? 'Traitement...' : 'Valider la commande'}
//       </button>
//     </div>
//   );
// }





















