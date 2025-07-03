"use client"

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface Product {
  id: number;
  product_title: string;
  product_description: string;
  product_price: string;
  product_images: string[];
  avgrating: string | null;
  category: {
    id: number;
    title: string;
  };
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();

  const limit = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const category = searchParams.get('category');
        let url = `http://localhost:3000/api/v1/products?page=${currentPage}&limit=${limit}`;
        if (category) {
          url += `&category=${encodeURIComponent(category)}`;
        }

        console.log('Fetching URL:', url);

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`Erreur HTTP: ${res.status}`);
        }

        const data = await res.json();

        console.log('API response:', data);

        if (data.products && Array.isArray(data.products)) {
          const transformedProducts = data.products.map((p: any) => ({
            id: p.id,
            product_title: p.title,
            product_description: p.description,
            product_price: p.price,
            product_images: p.images || [],
            avgrating: p.avgrating || null,
            category: {
              id: p.category?.id || 0,
              title: p.category?.title || 'Non catégorisé',
            },
          }));

          setProducts(transformedProducts);
          setTotalPages(data.totalPages || 1);
        } else {
          setError('Format de données invalide');
        }
      } catch (err: any) {
        setError(err.message || 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams, currentPage]);

  if (loading) {
    return <div className="p-8">Chargement des produits...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Erreur : {error}</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Nos Produits</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <p>Aucun produit trouvé.</p>
        ) : (
          products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
            
                <ProductCard 
                //@ts-ignore
                product={product} />
      
            </Link>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-10">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Précédent
        </button>
        <span className="px-4 py-2">
          {currentPage} / {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}










// 'use client';

// import { useEffect, useState } from 'react';
// import ProductCard from '@/components/ProductCard';
// import Link from 'next/link';
// import { useSearchParams } from 'next/navigation';
// import { Lexend_Tera } from 'next/font/google';

// interface Product {
//   id: number;
//   product_title: string;
//   product_description: string;
//   product_price: string;
//   product_images: string[];
//   avgrating: string | null;
//   category: {
//     id: number;
//     title: string;
//   };
// }

// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [currentPage, setPage] = useState<number>(1);
//   const [totalPages, setTotalPages] = useState<number>(1);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const searchParams = useSearchParams();



//   const limit = 8;

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         setError(null);

        
//         const category = searchParams.get('category');
//          const res = await fetch(`http://localhost:3000/api/v1/products?page=${currentPage}&limit=${limit}`);
       
      


//         //const res = await fetch(url);

//         if (!res.ok) {
//           throw new Error(`Erreur HTTP: ${res.status}`);
//         }

//         const data = await res.json();
//         console.log(data);
        

//         if (data.products && Array.isArray(data.products)) {
//           const transformedProducts: Product[] = data.products.map((apiProduct: any) => ({
//             id: apiProduct.id,
//             product_title: apiProduct.title,
//             product_description: apiProduct.description,
//             product_price: apiProduct.price,
//             product_images: apiProduct.images,
//             avgrating: null,
//             category: {
//               id: apiProduct.category?.id || 0,
//               title: apiProduct.category?.title || 'Non catégorisé',
//             },
//           }));

//           setProducts(transformedProducts);
//           setTotalPages(Math.ceil(Number(data.totalPages)));
//         } else {
//           console.error('Format de données invalide:', data);
//           setError('Format de données invalide');
//         }
//       } catch (error) {
//         console.error('Erreur:', error);
//         setError(error instanceof Error ? error.message : 'Une erreur est survenue');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [currentPage]);

//   if (loading) {
//     return <div className="p-8">Chargement des produits...</div>;
//   }

//   if (error) {
//     return <div className="p-8 text-red-500">Erreur : {error}</div>;
//   }

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6 text-center">Nos Produits</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <Link key={product.id} href={`products/${product.id}`}>
//           <ProductCard 
//           //@ts-ignore
//           product={product} 
         
//           />
//           </Link>
//         ))}
//         </div>
//       {/* Pagination */}
//       <div className="flex justify-center gap-2 mt-10">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setPage((p) => Math.max(p - 1, 1))}
//           className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
//         >
//           Précédent
//         </button>
//         <span className="px-4 py-2">{currentPage} / {totalPages}</span>
//         <button
//          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
//           disabled={currentPage === totalPages}
         
//           className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
//         >
//           Suivant
//         </button>
//       </div>
//     </div>
//   )
//   }





