'use client';

import { notFound, useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
//import { useCartStore } from '@/store/cartStore';
import ReviewForm from '@/components/ReviewForm';
import ProductReviews from '@/components/ProductReviews';
import useCart from '@/app/cart/CartContex';

type Product = {
  id: number;
  title: string;
  images: string[];
  description: string;
  stock: number;
  price: number;
  category: {
    id: number;
    title: string;
  };
};

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();
  const {id} = use(params)
  //const addToCart = useCartStore((state) => state.addToCart);
  const {addToCart} = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`http://localhost:3000/api/v1/products/${id}`, {
        cache: 'no-store',
      });

      console.log("Status de la requête :", res.status);
      if (!res.ok) return notFound();

      const data = await res.json();
      console.log("Produit reçu :", data);

      // Sécurise le type du prix
      const parsedProduct = {
        ...data,
        price: typeof data.price === 'string' ? parseFloat(data.price) : data.price,
      };

      setProduct(parsedProduct);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Chargement...</p>;

  const handleAddToCart = () => {
    if (quantity > product.stock) {
      alert("Quantité supérieure au stock");
      return;
    }

    addToCart({ ...product, quantity});
    alert(`${quantity} produit ajouté au panier`);
  };

  return (
    <div className="max-w-5xl mx-auto p-5">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-[300px] h-[300px] border-white rounded overflow-hidden shadow">
            {product.images?.[0] ? (
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                Image indisponible
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-xl font-semibold text-green-600">
            Prix : {product.price.toLocaleString()} FCFA
          </p>
          <p className="text-gray-500">{product.category.title}</p>
          <p className="text-gray-800 font-semibold">Stock : {product.stock}</p>

          {/* Quantité */}
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="bg-gray-200 px-2 py-1 rounded"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              readOnly
              className="w-12 text-center border rounded"
            />
            <button
              onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
              className="bg-gray-200 px-2 py-1 rounded"
            >
              +
            </button>
          </div>

          {/* Boutons */}
          <button
            className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
            onClick={handleAddToCart}
          >
            Ajouter au panier
          </button>

          <button
            className="mt-4 bg-black text-white px-6 py-2 m-4 rounded hover:bg-gray-800 transition"
            onClick={() => router.push("/cart")}
          >
            Voir panier
          </button>
        </div>
      </div>

      <div className="w-full bg-gray-100 mt-6 p-4 rounded">
        <ReviewForm productId={product.id} />
        <ProductReviews productId={product.id} />
      </div>
    </div>
  );
}
















// 'use client';

// import { notFound, useRouter } from 'next/navigation';
// import {use, useEffect, useState } from 'react';
// import { useCartStore } from '@/store/cartStore';
// import ReviewForm from '@/components/ReviewForm';
// import ProductReviews from '@/components/ProductReviews';





// type Product = {
//   id: number;
//   title: string;
//   images: string[];
//   description: string;
//   stock:number
//   price: number;
//    category: {
//     id: number;
//     title: string;
//   };
// };

// // type CartItem = {
// //   product: Product;
// //   quantity: number;
// // };



// // export default function Page({ params }: { params: Promise<{ id: string }> }) {
// export default function Page({params}:{params:Promise<{id:string}>}){
//   const [product, setProduct] = useState<Product | null>(null);
//   const [quantity, setQuantity] = useState<number>(1)
//   // const { id } = use(params); 
//   const { id } = use(params);
//   const router = useRouter()
//   const addToCart = useCartStore((state) => state.addToCart);
 

//   useEffect(() => {
//     const fetchProduct = async () => {
     
//         const res = await fetch(`http://localhost:3000/api/v1/products/${id}`, {
//         cache: 'no-store',
//       });
//       if (!res.ok) return notFound();
      
//     console.log("Status de la requête :", res.status);

//       const data = await res.json();
//       console.log("produits recu", data);
      
//       setProduct(data);
//     };

//     fetchProduct();

// }, [id]);


//   if (!product) return <p>Chargement...</p>;

//   const handleAddToCart = () =>{
//     if(!product) return
//     if(quantity >product.stock){
//       alert("quantite superieur au stock")
//       return
//     }



    
//    addToCart(product)

  
//    alert(`${quantity} produit ajoute au panier`)
// //   }

//   return (
//     <div className="max-w-5xl mx-auto p-25">
//       <div className="flex flex-col md:flex-row gap-10 items-start">
//         <div className="w-full md:w-1/2 flex justify-center">
//           <div className="w-[300px] h-[300px] border-white rounded overflow-hidden shadow">
         
//             <img
//               src={product.images[0]}
//               alt={product.title}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>
//         <div className="w-full md:w-1/2 space-y-4">
//           <h1 className="text-2xl font-bold">{product.title}</h1>
//           <p className="text-gray-700">{product.description}</p>
//           <p className="text-xl font-semibold text-green-600">Prix : {product.price} FCFA</p>
//           <p className='text-gray-500'>{product.category.title}</p>
//           <p className='text-gray-800 font-semibold'>Stock:{product.stock}</p>

//           <p className='text-gray-800 font-semibold'></p>

//             <div className='flex items-center gap-2 mt-4'>
//               <button
//               onClick={()=>setQuantity(q=>Math.max(1, q - 1))}
//               className='bg-gray-200 px-2 py-1 rounded'
//               >
//                 -
//               </button>
//               <input 
//               type="number"
//               value={quantity}
//               readOnly
//               className='w-12 text-center border rounded'
//               />
//               <button
//               onClick={()=>setQuantity(q=>Math.max(1, q + 1))}
//               className='bg-gray-200 px-2 py-1 rounded'
//               >
//                 +
//               </button>
//             </div>

//             <button
//             className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
//             //onClick={() => addToCart(product)}
//             // onClick={
//             //   ()=>{
//             //     addToCart(product);
//             //   alert('produit ajoute au panier')
//             // }}
//             onClick={handleAddToCart}
           
//           >
//             Ajouter au panier
//           </button>
         
//           <button
//             className="mt-4 bg-black text-white px-6 py-2 m-4 rounded hover:bg-gray-800 transition"
//             onClick={()=>{
//                 //addToCart(product)
//                 router.push("/cart")
//             }}
            
         
            

//            >
//              Voir panier
//            </button>
//         </div>
//       </div>
//       <div className='w-full bg-gray-500 m-4 p-rounded'>
//             <ReviewForm 
            
//             productId={product.id}/>
//             <ProductReviews
            
//             productId={product.id}/>
//       </div>
//     </div>
//   );
//   }
// }






















































