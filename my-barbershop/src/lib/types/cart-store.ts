import { create } from "zustand";



type CartItem = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addToCart: (item) =>
    set((state) => {
      const exists = state.items.find((i) => i.id === item.id);
      if (exists) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
        };
      }
      return { items: [...state.items, item] };
    }),
  removeFromCart: (id) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),
  incrementQuantity: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),
  decrementQuantity: (id) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0),
    })),
  clearCart: () => set({ items: [] }),
}));










// // lib/cart-store.ts
// import { create } from "zustand";



// type CartItem = {
//   id: string;
//   title: string;
//   imageUrl: string;
//   price: number;
//   quantity: number;
// };

// type CartState = {
//   items: CartItem[];
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (id: string) => void;
//   updateQuantity: (id: string, quantity: number) => void;
//    incrementQuantity: (id: string) => void; 
//    decrementQuantity: (id: string) => void;
//   clearCart: () => void;
// };

// export const useCartStore = create<CartState>((set) => ({
//   items: [],
//   addToCart: (item) =>
//     set((state) => {
//       const exists = state.items.find((i) => i.id === item.id);
//       if (exists) {
//         return {
//           items: state.items.map((i) =>
//             i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
//           ),
//         };
//       }
//       return { items: [...state.items, item] };
//     }),
//   removeFromCart: (id) =>
//     set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
//   updateQuantity: (id, quantity) =>
//     set((state) => ({
//       items: state.items.map((item) =>
//         item.id === id ? { ...item, quantity } : item
//       ),
//     })),
//     incrementQuantity: (id) =>
//       set((state) =>({
//         items:state.items.map((item)=>
//         item.id ===id ? {...item, quantity:item.quantity +1}:item),
//       })
//   clearCart: () => set({ items: [] }),
// })),
//   decrementQuantity: (id) =>
//     set((state) => ({
//       items: state.items
//         .map((item) =>
//           item.id === id ? { ...item, quantity: item.quantity - 1 } : item
//         )
//         .filter((item) => item.quantity > 0), // supprime si quantity <= 0
//     })),
  