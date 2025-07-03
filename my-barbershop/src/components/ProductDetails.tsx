"use client";

import  useCart  from "../app/cart/CartContex";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category:{
 title:string;
  }
}

export default function ProductDetails({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const router = useRouter()

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-6">
      {/* Image du produit */}
      <div className="w-full md:w-1/2">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-96 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Détails du produit */}
      <div className="w-full md:w-2/2 ">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-lg font-semibold text-blue-500 mt-2">{product.price} CFA</p>
        <p className="text-sm text-gray-500 mt-1">Stock : {product.stock}</p>
        <p className="text-sm text-gray-500">Catégorie : {product.category.title}</p>

        {/* Boutons */}
        <div className="mt-6 flex space-x-4">
          <button
          //@ts-ignore
            onClick={() => addToCart(product)}
            className="text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            🛒 Ajouter au panier
          </button>
          
           <button
            onClick={()=>{
                //addToCart(product)
                router.push("/cart")
            }}
            className="text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition"
           >
             Voir panier
           </button>
          
        </div>
      </div>
    </div>
  );
}