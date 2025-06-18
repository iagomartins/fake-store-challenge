"use client";
import CartView from "./CartView";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Link from "next/link";
import Customer from "@/types/Customer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Category from "@/types/Category";
import axios from "axios";
import "../app/globals.css";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  emitCategory(index: number): number;
  showMenu: boolean;
}

const Header: React.FC<Props> = ({ emitCategory, showMenu }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const [user] = useState(queryClient.getQueryData(["user"]) as Customer);
  const [activeCategory, setActiveCategory] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);

  function SetActive(id: number) {
    setActiveCategory(id);
    emitCategory(id);
  }

  useEffect(() => {
    axios
      .get<Category[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories?limit=0`
      )
      .then(({ data }) => {
        setCategories(data);
      });
  }, []);

  return (
    <div className="bg-white w-full">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2">
              {showMenu && (
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              )}
            </div>

            {/* Links */}
            <div className="mt-2">
              <div className="border-b border-gray-200">
                <div className="-mb-px flex space-x-8 px-4 mobile-menu">
                  {categories.map((category) => (
                    <span
                      onClick={() => {
                        if (activeCategory !== category.id) {
                          SetActive(category.id);
                        }
                        setOpen(false);
                      }}
                      key={category.name || ''}
                      className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-900 data-selected:border-indigo-600 data-selected:text-indigo-600"
                    >
                      {category.name || ''}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="text-adjustment">
                <span className="mr-6 text-dark">Olá, {user.name || ''}!</span>
                <CartView />
                <Link
                  href="/"
                  className="ml-6 cursor-pointer rounded-md bg-primary px-2.5 py-1.5 text-sm font-semibold text-foreground hover:bg-gray-950/10"
                >
                  <FontAwesomeIcon icon={faRightToBracket} />
                </Link>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-primary px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Ganhe frete grátis acima de R$100
        </p>

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              {showMenu && (
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon aria-hidden="true" className="size-6" />
                </button>
              )}

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="#">
                  <span className="sr-only">Fake Store!!</span>
                  <img
                    alt=""
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                {showMenu && (
                  <div className="flex h-full">
                    {categories.map((category) => (
                      <Popover key={category.name || ''} className="flex">
                        <div className="relative flex">
                          <PopoverButton
                            onClick={() => SetActive(category.id)}
                            className="px-4 relative hover:bg-gray-700 hover:text-white z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-open:border-indigo-600 data-open:text-indigo-600"
                          >
                            {category.name || ''}
                          </PopoverButton>
                        </div>

                        <PopoverPanel
                          transition
                          className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                        >
                          {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 top-1/2 bg-white shadow-sm"
                          />
                        </PopoverPanel>
                      </Popover>
                    ))}
                  </div>
                )}
              </PopoverGroup>

              <div className="ml-auto flex items-center">
                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <div className="text-adjustment">
                    <span className="mr-6 text-dark">Olá, {user.name || ''}!</span>
                    <CartView />
                    <Link
                      href="/"
                      className="ml-6 cursor-pointer rounded-md  bg-primary px-2.5 py-1.5 text-sm font-semibold text-foreground hover:bg-gray-950/10"
                    >
                      <FontAwesomeIcon icon={faRightToBracket} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
