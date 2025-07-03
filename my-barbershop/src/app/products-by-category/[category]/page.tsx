// app/products-by-category/[category]/page.tsx

// import { getProductsByCategory } from '@/services/getProductsByCategory';

// export default async function Page({ params }: { params: { category: string } }) {
//   const products = await getProductsByCategory(params.category);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Catégorie : {params.category}</h1>
//       {products.length === 0 ? (
//         <p>Aucun produit trouvé.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {products.map((product: any) => (
//             <div key={product.id} className="border rounded p-4 shadow">
//               <h2 className="font-semibold text-lg">{product.title}</h2>
//               <p>{product.description}</p>
//               <p className="text-sm text-gray-500 mt-2">
//                 Ajouté par : {product.addedBy.name}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }












// app/products-by-category/[category]/page.tsx

// import { getProductsByCategory } from '@/services/getProductsByCategory';

// export default async function Page({ params }: { params: { category: string } }) {
//   const products = await getProductsByCategory(params.category);

//   return (
//     <div>
//       <h1>Produits dans la catégorie : {params.category}</h1>
//       <ul>
//         {products.map((product: any) => (
//           <li key={product.id}>{product.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
