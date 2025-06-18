"use client";
import { ToastContainer, Bounce } from "react-toastify";

interface ToastProps {
  children: React.ReactNode;
}

export const Toast = ({ children }: ToastProps) => {
  return (
    <>
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
    </>
  );
};
