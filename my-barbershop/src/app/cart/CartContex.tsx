"use client"
import{createContext, useContext, useState, ReactNode, useEffect} from "react";
import Product from "../products/page";
import Footer from "@/components/Footer";

interface Product{
    quantity: number;
    id:number;
    title:string;
    price:number;
   images:string[]

}
interface CartContextType{
    cart:Product[];
    addToCart:(product:Product)=>void;
    removeFromCart:(id:number)=>void;
    clearCart:()=>void;
    decreaseQuantity:(id:number)=>void

}
const CartContext = createContext<CartContextType|undefined>(undefined)
export function CartProvider({children}:{children:ReactNode}){
    const [cart, setCart] = useState<Product[]>([])
//Charger le panier depuis le LocalStorage au demmarrage
  useEffect(()=>{
    const storedCart = localStorage.getItem('cart')
    if(storedCart){
        setCart(JSON.parse(storedCart))
    }
  },[])
  //Sauvegarde le panier dans le LocalStorage a chaque modification
  useEffect(()=>{
    localStorage.setItem("cart", JSON.stringify(cart))
  },[cart])

  const addToCart = (product:Product & {quantity:number})=>{
    setCart((prevCart)=>{
      const existing = prevCart.find((item)=>item.id === product.id)
      let updatedCart;
      if(existing){
        updatedCart = prevCart.map((item)=>
          item.id === product.id
          ? {...item, quantity:item.quantity + product.quantity}
          : item
          )
      }else{
        updatedCart =[ ...prevCart, product]
      }

        //const newCart = [...prevCart, product];
        //localStorage.setItem("cart",JSON.stringify(newCart))
        //return newCart

        localStorage.setItem("cart", JSON.stringify(updatedCart))
        return updatedCart
    })
  }
  const removeFromCart = (id:number)=>{
    setCart((prevCart)=>{
        const newCart = prevCart.filter((item)=>item.id !==id)
        localStorage.setItem("cart", JSON.stringify(newCart))
        return newCart
    })
  }
  const clearCart =()=>{
    setCart([])
    localStorage.removeItem("cart")
  }
  const decreaseQuantity = (id:number)=>{
    setCart((prevCart)=>
      prevCart
        .map((item)=>
          item.id ===id 
            ? { ...item, quantity:item.quantity - 1}
                :item
              )
              .filter((item)=>item.quantity>0)
    )
  }
    return(
        <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart, decreaseQuantity}}>
          
            {children}
          
        </CartContext.Provider>
    )
}
export default function useCart(){
    const context = useContext(CartContext)
    if(!context){
        throw new Error('useCart must be used within a CartProvider')
    }
    return(
       context
    )
}