"use client";
import React, { createContext, useContext, useState } from "react";
import CartItem from "@/types/CartItem";
import Product from "@/types/Product";
import { toast, Bounce } from "react-toastify";

interface CartContextType {
  cart: CartItem[];
  subtotal: number;
  addToCart: (item: Product) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  const addToCart = (item: Product) => {
    setCart((prev) => {
      const hasItem = prev.filter((e) => e.product.id === item.id).length > 0;
      let ret = prev.find(e => e.product.id === item.id);
      if (hasItem && ret) {
        const quantity = ret.quantity + 0.5;
        ret.quantity = quantity;
        console.log(ret.quantity);
        return [...prev.filter(e => e.product.id !== item.id), ret];
      }
      else {
        ret = { product: item, quantity: 1 };
        return [...prev, ret];
      }
    });
    setSubtotal((prev) => prev + item.price);
    toast.success("Produto adicionado ao carrinho!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: 0,
      theme: "light",
      transition: Bounce,
    });
  };

  const removeFromCart = (item: CartItem) => {
    setCart((prev) => prev.filter((p: CartItem) => p.product.id !== item.product.id));
    setSubtotal((prev) => prev - item.product.price * item.quantity);
  };

  const clearCart = () => {
    setCart([]);
    setSubtotal(0);
  }

  return (
    <CartContext.Provider value={{ cart, subtotal, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
