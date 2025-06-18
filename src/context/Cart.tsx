"use client";
import React, { createContext, useContext, useState } from "react";
import Product from "@/types/Product";
import { ToastContainer, toast, Bounce } from "react-toastify";

interface CartContextType {
  cart: Product[];
  subtotal: number;
  addToCart: (item: Product) => void;
  removeFromCart: (item: Product) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  const addToCart = (item: Product) => {
    setCart((prev) => [...prev, { ...item }]);
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

  const removeFromCart = (item: Product) => {
    setCart((prev) => prev.filter((p: Product) => p.id !== item.id));
    setSubtotal((prev) => prev - item.price);
  };

  return (
    <CartContext.Provider value={{ cart, subtotal, addToCart, removeFromCart }}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
