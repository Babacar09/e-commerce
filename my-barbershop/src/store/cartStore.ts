import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
};

type CartItem = Product & {
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  updateQuantity: (id: number, quantity: number) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addToCart: (product) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { ...product, quantity: 1 }],
          };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      clearCart: () => set({ items: [] }),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),
    }),
    {
      name: 'cart-storage',
    }
  )
);









































// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import { CartItem } from '@/lib/types/cart';

// // Ton type Product basé sur ta base de données
// type Product = {
//   id: number;
//   title: string;
//   price: number;
//   images: string[]; // images[] dans la base
// };

// // État du panier
// type CartState = {
//   items: CartItem[]; // le panier final
//   addToCart: (product: Product, quantity?: number) => void;
//   removeFromCart: (id: number) => void;
//   clearCart: () => void;
//   updateQuantity: (id: number, quantity: number) => void;
// };

// export const useCartStore = create<CartState>()(
//   persist(
//     (set) => ({
//       items: [],

//       addToCart: (product, quantity = 1) =>
//         set((state) => {
//           const existingItem = state.items.find((item) => item.id === product.id);

//           if (existingItem) {
//             return {
//               items: state.items.map((item) =>
//                 item.id === product.id
//                   ? { ...item, quantity: item.quantity + quantity }
//                   : item
//               ),
//             };
//           }

//           return {
//             items: [
//               ...state.items,
//               {
//                 id: product.id,
//                 title: product.title,
//                 price: product.price,
//                 imageUrl: product.images?.[0] ?? '/placeholder.jpg', // conversion ici
//                 quantity,
//               },
//             ],
//           };
//         }),

//       removeFromCart: (id) =>
//         set((state) => ({
//           items: state.items.filter((item) => item.id !== id),
//         })),

//       clearCart: () => set({ items: [] }),

//       updateQuantity: (id, quantity) =>
//         set((state) => ({
//           items: state.items.map((item) =>
//             item.id === id ? { ...item, quantity } : item
//           ),
//         })),
//     }),
//     {
//       name: 'cart-storage', // localStorage key
//     }
//   )
// );







// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import { CartItem } from '@/lib/types/cart';


// type Product = {
//   id: number;
//   title: string;
//   price: number;
//   images: string[];
// };

// type CartItem = Product & {
//   quantity: number;
// };

// type CartState = {
//   items: CartItem[];
//   cart: CartItem[];
//   addToCart: (product: Product) => void;
//   removeFromCart: (id: number) => void;
//   clearCart: () => void;
//   updateQuantity: (id: number, quantity: number) => void;
// };

// export const useCartStore = create<CartState>()(
//   persist(
//     (set) => ({
//       items: [], // ✅ changement ici

//       addToCart: (product) =>
//         set((state) => {
//           const existingItem = state.items.find((item) => item.id === product.id);

//           if (existingItem) {
//             return {
//               items: state.items.map((item) =>
//                 item.id === product.id
//                   ? { ...item, quantity: item.quantity + 1 }
//                   : item
//               ),
//             };
//           }

//           return {
//             items: [...state.items, { ...product, quantity: 1 }],
//           };
//         }),

//       removeFromCart: (id) =>
//         set((state) => ({
//           items: state.items.filter((item) => item.id !== id),
//         })),

//       clearCart: () =>
//         set(() => ({
//           items: [],
//         })),

//       updateQuantity: (id, quantity) =>
//         set((state) => ({
//           items: state.items.map((item) =>
//             item.id === id ? { ...item, quantity } : item
//           ),
//         })),
//     }),
//     {
//       name: 'cart-storage',
//     }
//   )
// );


// export const useCartStore = create<CartState>()(
//   persist(
//     (set) => ({
//       cart: [],

//       addToCart: (product) =>
//         set((state) => {
//           const existingItem = state.cart.find((item) => item.id === product.id);

//           if (existingItem) {
//             return {
//               cart: state.cart.map((item) =>
//                 item.id === product.id
//                   ? { ...item, quantity: item.quantity + 1 }
//                   : item
//               ),
//             };
//           }

//           return {
//             cart: [...state.cart, { ...product, quantity: 1 }],
//           };
//         }),

//       removeFromCart: (id) =>
//         set((state) => ({
//           cart: state.cart.filter((item) => item.id !== id),
//         })),

//       clearCart: () =>
//         set(() => ({
//           cart: [],
//         })),

//       updateQuantity: (id, quantity) =>
//         set((state) => ({
//           cart: state.cart.map((item) =>
//             item.id === id ? { ...item, quantity } : item
//           ),
//         })),
//     }),
//     {
//       name: 'cart-storage', // clé utilisée dans localStorage
//     }
//   )
// );





















