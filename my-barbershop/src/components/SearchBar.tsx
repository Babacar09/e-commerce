'use client'

import { useEffect, useState } from "react"

interface Product {
  id: number
  title: string
  description: string
  price: string
  images: string[]
}

export default function SearchBar() {
  const [search, setSearch] = useState<string>("")
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  // Empêcher l'hydratation côté serveur
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Récupération des produits côté client
  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/products`)
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }
      const data = await response.json()
      const productsData = data.products || data
      if (Array.isArray(productsData)) {
        setProducts(productsData)
      } else {
        console.error("Format de données invalide:", productsData)
        setError("Format de données invalide")
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error)
      setError(error instanceof Error ? error.message : "Une erreur est survenue")
    }
  }

  useEffect(() => {
    if (isClient) {
      fetchProducts()
    }
  }, [isClient])

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredProducts([])
    } else {
      const results = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )
      setFilteredProducts(results)
    }
  }, [search, products])

  if (!isClient) return null // évite le décalage SSR/Client

  return (
    <div className="relative w-80">
      <input
        type="text"
        placeholder="Rechercher un produit..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}
      {filteredProducts.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {product.title}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
























// import { useEffect, useState } from "react"

// interface Product {
//     id: number
//     title: string
//     description: string
//     price: string
//     images: string[]
// }

// export default function SearchBar() {
//     const [search, setSearch] = useState<string>("")
//     const [products, setProducts] = useState<Product[]>([])
//     const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
//     const [error, setError] = useState<string | null>(null)

//     // Fonction pour récupérer les produits depuis l'API
//     const fetchProducts = async () => {
//         try {
//             const response = await fetch(`http://localhost:3000/api/v1/products`)
//             if (!response.ok) {
//                 throw new Error(`Erreur HTTP: ${response.status}`)
//             }
//             const data = await response.json()
//             console.log("Données reçues :", data)
            
//             // Vérifier si data.products existe, sinon utiliser data directement
//             const productsData = data.products || data
//             if (Array.isArray(productsData)) {
//                 setProducts(productsData)
//             } else {
//                 console.error("Format de données invalide:", productsData)
//                 setError("Format de données invalide")
//             }
//         } catch (error) {
//             console.error("Erreur lors de la récupération des produits :", error)
//             setError(error instanceof Error ? error.message : "Une erreur est survenue")
//         }
//     }

//     useEffect(() => {
//         fetchProducts()
//     }, [])

//     // Filtrage des produits en fonction de la recherche
//     useEffect(() => {
//         if (search.trim() === "") {
//             setFilteredProducts([])
//         } else {
//             const results = products.filter((product) =>
//                 product.title.toLowerCase().includes(search.toLowerCase())
//             )
//             setFilteredProducts(results)
//         }
//     }, [search, products])

//     return (
//         <div className="relative w-80">
//             <input
//                 type="text"
//                 placeholder="Rechercher un produit..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {error && (
//                 <div className="text-red-500 text-sm mt-2">
//                     {error}
//                 </div>
//             )}
//             {filteredProducts.length > 0 && (
//                 <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                     {filteredProducts.map((product) => (
//                         <div
//                             key={product.id}
//                             className="p-2 hover:bg-gray-100 cursor-pointer"
//                         >
//                             {product.title}
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     )
// }