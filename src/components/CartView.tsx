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
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function CartView() {
  const [open, setOpen] = useState(false);
  const { cart, subtotal, removeFromCart } = useCart();

  return (
    <>
      <span
        onClick={() => setOpen(true)}
        className="cursor-pointer rounded-md  bg-primary px-2.5 py-1.5 text-sm font-semibold text-foreground hover:bg-gray-950/10"
      >
        <FontAwesomeIcon icon={faCartShopping} />
      </span>
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
                      <DialogTitle className="text-lg font-medium text-gray-900">
                        Shopping cart
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {cart.map((item) => (
                            <li key={item.product.id} className="flex py-6">
                              <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  alt={item.product.description}
                                  src={item.product.images[0]}
                                  className="size-full object-cover"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{item.product.title}</h3>
                                    <p className="ml-4">{item.product.price}</p>
                                  </div>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">Qty {item.quantity}</p>
                                  <div className="flex">
                                    <span
                                      onClick={() => {
                                        removeFromCart(item);
                                      }}
                                      className="cursor-pointer font-medium text-primary hover:text-indigo-500"
                                    >
                                      Remove
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>{subtotal}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Frete e taxas serão calculadas no checkout.
                    </p>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                      >
                        Checkout
                      </a>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{" "}
                        <span
                          onClick={() => setOpen(false)}
                          className="cursor-pointer font-medium text-primary hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
