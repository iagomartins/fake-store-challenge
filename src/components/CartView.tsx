"use client";
import React from "react";
import { useCart } from "@/context/Cart";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function CartView() {
  const [open, setOpen] = useState(false);
  const { cart, subtotal, removeFromCart } = useCart();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative p-2 text-gray-400 hover:text-gray-500 transition-colors duration-200"
      >
        <FontAwesomeIcon icon={faCartShopping} className="w-6 h-6" />
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
            {cart.length}
          </span>
        )}
      </button>

      <Dialog
        open={open}
        onClose={setOpen}
        className="cart-index relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-semibold text-gray-900">
                        Carrinho de Compras
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500 transition-colors duration-200"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        {cart.length === 0 ? (
                          <div className="text-center py-12">
                            <FontAwesomeIcon
                              icon={faCartShopping}
                              className="w-12 h-12 text-gray-300 mx-auto mb-4"
                            />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                              Seu carrinho está vazio
                            </h3>
                            <p className="text-gray-500">
                              Adicione alguns produtos para começar!
                            </p>
                          </div>
                        ) : (
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {cart.map((item) => (
                              <li key={item.product.id} className="flex py-6">
                                <div className="size-24 shrink-0 overflow-hidden rounded-lg border border-gray-200">
                                  <img
                                    alt={item.product.description}
                                    src={item.product.images[0]}
                                    className="size-full object-cover"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3 className="line-clamp-2">
                                        {item.product.title}
                                      </h3>
                                      <p className="ml-4 font-bold text-red-600">
                                        R$ {item.product.price}
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {item.product.category.name}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">
                                      Qtd: {item.quantity}
                                    </p>
                                    <div className="flex">
                                      <button
                                        onClick={() => removeFromCart(item)}
                                        className="flex items-center space-x-1 font-medium text-red-600 hover:text-red-700 transition-colors duration-200"
                                      >
                                        <TrashIcon className="w-4 h-4" />
                                        <span>Remover</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>

                  {cart.length > 0 && (
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900 mb-2">
                        <p>Subtotal</p>
                        <p className="text-red-600 font-bold">R$ {subtotal}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500 mb-6">
                        Frete e taxas serão calculadas no checkout.
                      </p>
                      <div className="space-y-3">
                        <button className="w-full btn-primary flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium text-sm">
                          <span>Finalizar Compra</span>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => setOpen(false)}
                          className="w-full text-center text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors duration-200"
                        >
                          Continuar Comprando
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
