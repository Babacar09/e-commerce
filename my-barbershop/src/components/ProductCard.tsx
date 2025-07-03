import React from "react";

interface Product {
  id: string;
  product_title: string;
  product_description: string;
  product_images: string[];
  product_price: number;
  category?:{
    id:number;
    title:string
  }
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    console.log(product);
    
  return (
    <div className="rounded-2xl shadow-lg p-4 bg-white flex flex-col gap-2">
      <img
        src={product.product_images[0]}
        alt={product.product_title}
        className="w-full h-60 object-cover rounded-md mb-4"
      />
      <h2 className="text-lg font-semibold">{product.product_title}</h2>
      <p className="text-gray-600 text-sm mt-2 line-clamp-3 min-h-[72px]">{product.product_description.slice(0,100)}</p>
      <p className="text-gray-700 text-sm mt-2">{product.category?.title ?? "category inconnue"}</p>
      <p className="text-blue-600 font-bold">{product.product_price.toLocaleString()} CFA</p>
    </div>
  );
};

export default ProductCard;

























// // components/ProductCard.tsx
// import Image from "next/image";

// interface Category {
//   id: number;
//   title: string;
// }

// interface Product {
//   id: number;
//   product_title: string;
//   product_description: string;
//   product_price: string;
//   product_images: string[];
//   avgrating: string | null;
//   category: Category;
// }

// export default function ProductCard({ product }: { product: Product }) {
//   return (
//     <div className="rounded-2xl shadow-lg p-4 bg-white flex flex-col gap-2">
//       <Image
//         src={product.product_images[0]}
//         alt={product.product_title}
//         width={400}
//         height={300}
//         className="w-full h-64 object-cover rounded-xl"
//       />
//       <h2 className="text-lg font-bold">{product.product_title}</h2>
//       <p className="text-sm text-gray-500">{product.product_description.slice(0, 100)}...</p>
//       <div className="flex justify-between items-center mt-2">
//         <span className="text-primary font-semibold">{parseFloat(product.product_price).toLocaleString()} FCFA</span>
//         <span className="text-yellow-500 text-sm">
//           ⭐ {product.avgrating ?? "N/A"}
//         </span>
//       </div>
//       <span className="text-xs text-gray-400">Catégorie : {product.category.title}</span>
//     </div>
//   );
// }















// "use client"
// import Link from "next/link"
// import useCart from "@/app/cart/CartContex"
// //import { fetchProducts } from "@/lib/api";
// interface Category{
//     id:number,
//     title:string
// }


// interface Product{
//     product_id:number;
//     product_title:string;
//     product_price:number;
//     product_images:string[];
//     product_description?:string;
//     product_averageRating?:number |null;
//     // category?:{
//     //     title:string;
//     // }
//     category?:Category
// }
// export default function ProductCard({product}:{product:Product}){
//     console.log("Product category:",product );
//     console.log("🔍 Catégorie du produit:", product.category)
//     const {addToCart} = useCart()




//     return(
//         <div className="border rounded-lg shadow-mg bg-white">
//             <Link href={`/products/${product.product_id}`} className="block">
//                 <img 
//                  src={product.product_images[0]}
//                  alt={product.product_title}
//                  className="w-full h-40 object-cover rounded-md"
//                  />
//             </Link>

//             <div className="mt-3">
             
//                 <h2 className="text-lg font-semibold">{product.product_title} </h2>
       
//                 {product.category?.title ? (
           
//                     <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-md">
                               
//                         {product.category.title}
                    
//                     </span>
//                 ):(
//                     <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-md">
//                     Aucune catégorie
//                 </span>
//                 )}
//                   <p className="text-gray-600 text-sm">{product.product_description}</p>  
//                 <p className="text-blue-500 font-bold mt-1">{product.product_price}CFA</p>
//                 {product.product_averageRating && (
//                     <div className="flex items-center mt-2">
//                         <span className="text-yellow-500">
//                         {"★".repeat(Math.round(product.product_averageRating))}
//                         {"☆".repeat(5 - Math.round(product.product_averageRating))}
//                         </span>
//                         <span className="ml-2 text-sm text-gray-500">
//                             {product.product_averageRating}
//                         </span>
//                     </div>
//                 )}

//             </div>
//             <div className="mt-4 flex justify-between items-center">
//                 <Link
//                  href={`products/${product.product_id}`}
//                  className="text-white bg-blue-500 px-3 py-2 rounded-md hover:bg-blue-600 transition"
//                  >
//                     Voir
//                 </Link>
//                 <button
//                 //@ts-ignore
//                 onClick={()=>addToCart(product)}
//                 className="text-white bg-green-500 px-3 py-2 rounded-md hover:bg-green-600 transition"
//                 >
//                     Ajouter
//                 </button>
//             </div>
//         </div>
//     )
// }