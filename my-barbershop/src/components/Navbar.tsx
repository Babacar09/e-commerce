'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from '@/components/Button';
import Avatar from "./Avatar";
import Logo from "./Logo";
import CategoryList from "./CategoryList";
import SearchBar from "./SearchBar";
import useCart from "@/app/cart/CartContex"; // ✅ ici : on utilise ton CartContext

interface User {
  name: string;
  email: string;
  avatar?: string;
}

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const router = useRouter();

  const { cart } = useCart(); // ✅ récupère le panier via contexte

  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("authToken");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    console.log("Stored User:", storedUser);
    console.log("Token récupéré dans Navbar:", storedToken);
    console.log("Cart in Navbar:", cart);
  }, []); // ✅ fix boucle infinie

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Recherche :", search);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    setUser(null);
    router.push("/auth/login");
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        <Logo />
      </Link>

      <div className="hidden md:flex space-x-6">
        <Link href="/" className="hover:text-gray-600">Accueil</Link>
        <Link href="/products" className="hover:text-gray-600">Produits</Link>
        <Link href="/about" className="hover:text-gray-600">À propos</Link>
        <Link href="/contact" className="hover:text-gray-600">Contact</Link>
        <Link href="/orders" className="hover:text-gray-600">Commandes</Link>

        <div
          className="relative group"
          onMouseEnter={() => setIsCategoryOpen(true)}
          onMouseLeave={() => setIsCategoryOpen(false)}
        >
          <div
            className={`absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg transition ${
              isCategoryOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            <CategoryList />
          </div>
        </div>

        <SearchBar />
      </div>

      <div className="flex items-center space-x-4">
        <Link href="/cart" className="relative">
          <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-gray-600" />
          {cartQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full z-10">
              {cartQuantity}
            </span>
          )}
        </Link>

        {user ? (
          <div className="flex items-center space-x-4">
            <Avatar name={user.name} size={40} />
            <button onClick={handleLogout} className="text-sm text-red-600">
              Déconnexion
            </button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link href="/auth/login">
              <Button className="px-3 py-3 bg-gray-900 text-white font-bold rounded-3xl hover:bg-blue-900 transition">
                Connexion
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="px-3 py-3 bg-gray-600 text-white font-bold rounded-3xl hover:bg-blue-900 transition">
                Inscription
              </Button>
            </Link>
          </div>
        )}
      </div>

      <div className="md:hidden">
        <Menu className="w-6 h-6 cursor-pointer" />
      </div>
    </nav>
  );
}















// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { ChevronDown, Menu, ShoppingCart } from "lucide-react";
// import Button from '@/components/Button';
// import { useRouter } from "next/navigation";
// import Avatar from "./Avatar";
// import Logo from "./Logo";
// import CategoryList from "./CategoryList";
// import SearchBar from "./SearchBar";
// import { useCartStore } from "@/store/cartStore"; // ✅ chemin corrigé si nécessaire
// import { CartItem } from "@/lib/types/cart";

// interface User {
//   name: string;
//   email: string;
//   avatar?: string;
// }

// export default function Navbar() {
//   const [search, setSearch] = useState("");
//   const [user, setUser] = useState<User | null>(null);
//   const [isCategoryOpen, setIsCategoryOpen] = useState(false);
//   const router = useRouter();

//   const cart = useCartStore((state) => state.items) ??[]; // ✅ zustand cart

//   // Calcul total quantité panier
//   const cartQuantity = cart.reduce((total:number, item:CartItem) => total + item.quantity, 0);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const storedToken = localStorage.getItem("authToken");

//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }

//     // Logs utiles au debug (optionnel)
//     console.log("Stored User:", storedUser);
//     console.log("Token récupéré dans Navbar:", storedToken);
//     console.log("Cart in Navbar:", cart);
//   //}, [cart]);
//   }, []); // ✅ ajout de [] pour le hook useEffect

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Recherche :", search);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("accessToken");
//     setUser(null);
//     router.push("/auth/login");
//   };

//   return (
//     <nav className="bg-white shadow-md p-4 flex justify-between items-center">
//       <Link href="/" className="text-xl font-bold">
//         <Logo />
//       </Link>

//       <div className="hidden md:flex space-x-6">
//         <Link href="/" className="hover:text-gray-600">Accueil</Link>
//         <Link href="/products" className="hover:text-gray-600">Produits</Link>
//         <Link href="/about" className="hover:text-gray-600">À propos</Link>
//         <Link href="/contact" className="hover:text-gray-600">Contact</Link>
//         <Link href="/orders" className="hover:text-gray-600">Commandes</Link>

//         <div
//           className="relative group"
//           onMouseEnter={() => setIsCategoryOpen(true)}
//           onMouseLeave={() => setIsCategoryOpen(false)}
//         >
//           {/* Si tu veux réactiver le bouton catégories */}
//           {/* <button className="flex items-center gap-2 hover:text-gray-600 transition">
//             Catégories <ChevronDown className="w-4 h-4" />
//           </button> */}
//           <div
//             className={`absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg transition ${
//               isCategoryOpen ? "opacity-100 visible" : "opacity-0 invisible"
//             }`}
//           >
//             <CategoryList />
//           </div>
//         </div>

//         <SearchBar />
//       </div>

//       <div className="flex items-center space-x-4">
//         <Link href="/cart" className="relative">
//           <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-gray-600" />
//           {cartQuantity > 0 && (
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full z-10">
//               {cartQuantity}
//             </span>
//           )}
//         </Link>

//         {user ? (
//           <div className="flex items-center space-x-4">
//             <Avatar name={user.name} size={40} />
//             <button onClick={handleLogout} className="text-sm text-red-600">
//               Déconnexion
//             </button>
//           </div>
//         ) : (
//           <div className="flex space-x-4">
//             <Link href="/auth/login">
//               <Button className="px-3 py-3 bg-gray-900 text-white font-bold rounded-3xl hover:bg-blue-900 transition">
//                 Connexion
//               </Button>
//             </Link>
//             <Link href="/auth/register">
//               <Button className="px-3 py-3 bg-gray-600 text-white font-bold rounded-3xl hover:bg-blue-900 transition">
//                 Inscription
//               </Button>
//             </Link>
//           </div>
//         )}
//       </div>

//       <div className="md:hidden">
//         <Menu className="w-6 h-6 cursor-pointer" />
//       </div>
//     </nav>
//   );
// }







// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { ChevronDown, Menu, ShoppingCart } from "lucide-react";
// import Button from '@/components/Button';
// // import useCart from "@/app/cart/CartContex";
// import { useRouter } from "next/navigation";
// import Avatar from "./Avatar";
// import Logo from "./Logo";
// import CategoryList from "./CategoryList";
// import SearchBar from "./SearchBar";
// import { useCartStore } from "@/store/cartStore";

// interface User {
//   name: string;
//   email: string;
//   avatar?: string;
// }

// export default function Navbar() {
//   const [search, setSearch] = useState("");
//   const [user, setUser] = useState<User | null>(null);
//   const [isCategoryOpen, setIsCategoryOpen] = useState(false);
//   const router = useRouter();
//   const cart = useCartStore((state)=>state.items)
//   // const { cart } = useCart();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const storedToken = localStorage.getItem("authToken");

//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }

//     console.log("Stored User:", storedUser);
//     console.log("Token récupéré dans Navbar:", storedToken);
//     console.log("Cart in Navbar:", cart);
//   }, [cart]);

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Recherche :", search);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//      localStorage.removeItem("accessToken"); 
//     setUser(null);
//     router.push("/auth/login");
//   };

//   return (
//     <nav className="bg-white shadow-md p-4 flex justify-between items-center">
//       <Link href="/" className="text-xl font-bold">
//         <Logo />
//       </Link>

//       <div className="hidden md:flex space-x-6">
//         <Link href="/" className="hover:text-gray-600">Accueil</Link>
//         <Link href="/products" className="hover:text-gray-600">Produits</Link>
//         <Link href="/about" className="hover:text-gray-600">À propos</Link>
//         <Link href="/contact" className="hover:text-gray-600">Contact</Link>
//         <Link href="/orders" className="hover:text-gray-600">commandes</Link>

//         <div
//           className="relative group"
//           onMouseEnter={() => setIsCategoryOpen(true)}
//           onMouseLeave={() => setIsCategoryOpen(false)}
//         >
//           {/* <button className="flex items-center gap-2 hover:text-gray-600 transition">
//             Catégories <ChevronDown className="w-4 h-4" />
//           </button> */}
//           <div
//             className={`absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg transition ${
//               isCategoryOpen ? "opacity-100 visible" : "opacity-0 invisible"
//             }`}
//           >
//             <CategoryList />
//           </div>
//         </div>

//         <SearchBar />
//       </div>

//       <div className="flex items-center space-x-4">
//         <Link href="/cart" className="relative">
//             <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-gray-600" />
//             {cart.reduce((total, item) => total + item.quantity, 0) > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full z-10">
//                 {cart.reduce((total, item) => total + item.quantity, 0)}
//                 </span>
//             )}
//         </Link>



//         {user ? (
//           <div className="flex items-center space-x-4">
//             <Avatar name={user.name} size={40} />
//             <button onClick={handleLogout} className="text-sm text-red-600">
//               Déconnexion
//             </button>
//           </div>
//         ) : (
//           <div className="flex space-x-4">
//             <Link href="/auth/login">
//               <Button className="px-3 py-3 bg-gray-900 text-white font-bold rounded-3xl hover:bg-blue-900 transition">
//                 Connexion
//               </Button>
//             </Link>
//             <Link href="/auth/register">
//               <Button className="px-3 py-3 bg-gray-600 text-white font-bold rounded-3xl hover:bg-blue-900 transition">
//                 Inscription
//               </Button>
//             </Link>
//           </div>
//         )}
//       </div>

//       <div className="md:hidden">
//         <Menu className="w-6 h-6 cursor-pointer" />
//       </div>
//     </nav>
//   );
// }























