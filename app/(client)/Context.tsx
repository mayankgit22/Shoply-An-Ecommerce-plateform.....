"use client"
import React from 'react'
import { createContext, useContext } from 'react'
// type Item = any;

type CartContextType = {
  cartMap: Map<string, number>;
  setCartMap: React.Dispatch<React.SetStateAction<Map<string, number>>>;
  wishMap: Map<string, number>;
  setWishMap: React.Dispatch<React.SetStateAction<Map<string, number>>>;
  count:number;
  setCount:React.Dispatch<React.SetStateAction<number>>

};



const CartContext = createContext<CartContextType | undefined>(undefined);
export const Contextshare=({children}:{children:React.ReactNode})=> {
    // const [cartItems, setCartItems] = React.useState<Item[]>([]);
const [cartMap,setCartMap]=React.useState<Map<string ,number>>(new Map()) 
const[wishMap,setWishMap]=React.useState<Map<string ,number>>(new Map()) 
const[count,setCount]=React.useState<number>(0)             
  return (
    <CartContext.Provider value={{cartMap,setCartMap,wishMap,setWishMap,count,setCount}}>
    <div>
      {children}
    </div>
    </CartContext.Provider>
  )
}
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a ContextShare (CartContext.Provider)");
  }
  return context;
};
