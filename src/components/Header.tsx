"use client";
import CartView from "./CartView";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Link from "next/link";
import Customer from "@/types/Customer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faUser,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
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
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

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
                  className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-500 transition-colors duration-200"
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
                      key={category.name || ""}
                      className={`flex-1 border-b-2 px-1 py-4 text-base font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                        activeCategory === category.id
                          ? "border-red-500 text-red-600"
                          : "border-transparent text-gray-900 hover:text-red-600"
                      }`}
                    >
                      {category.name || ""}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="text-adjustment">
                <span className="mr-6 text-gray-700 font-medium">
                  Olá, {user.name || ""}!
                </span>
                <CartView />
                <Link
                  href="/"
                  className="ml-6 cursor-pointer rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <FontAwesomeIcon icon={faRightToBracket} />
                  <span>Sair</span>
                </Link>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">
        {/* Top banner */}
        <div className="bg-gradient-to-r from-red-600 to-red-700">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-10 items-center justify-center">
              <p className="text-sm font-medium text-white">
                🚚 Frete grátis para compras acima de R$ 100 | Entrega rápida em
                todo o Brasil
              </p>
            </div>
          </div>
        </div>

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center justify-between">
              {showMenu && (
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="relative rounded-md bg-white p-2 text-gray-400 hover:text-gray-500 lg:hidden transition-colors duration-200"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon aria-hidden="true" className="size-6" />
                </button>
              )}

              {/* Logo */}
              <div className="flex lg:ml-0">
                <Link href="/gallery" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">F</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">
                    FakeStore
                  </span>
                </Link>
              </div>

              {/* Search bar - desktop only */}
              <div className="hidden lg:flex lg:flex-1 lg:justify-center lg:px-6">
                <div className="w-full max-w-lg">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Buscar produtos..."
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                {showMenu && (
                  <div className="flex h-full">
                    {categories.map((category) => (
                      <Popover key={category.name || ""} className="flex">
                        <div className="relative flex">
                          <PopoverButton
                            onClick={() => SetActive(category.id)}
                            className={`px-4 relative hover:bg-gray-50 z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out ${
                              activeCategory === category.id
                                ? "border-red-500 text-red-600"
                                : "border-transparent text-gray-700 hover:text-gray-900"
                            }`}
                          >
                            {category.name || ""}
                          </PopoverButton>
                        </div>

                        <PopoverPanel
                          transition
                          className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                        >
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 top-1/2 bg-white shadow-lg rounded-lg"
                          />
                        </PopoverPanel>
                      </Popover>
                    ))}
                  </div>
                )}
              </PopoverGroup>

              <div className="ml-auto flex items-center space-x-4">
                {/* User menu */}
                <div className="hidden lg:flex lg:items-center lg:space-x-2">
                  <button
                    title="User"
                    type="button"
                    className="p-2 text-gray-400 hover:text-gray-500 transition-colors duration-200"
                  >
                    <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
                  </button>
                  <button
                    title="Wishlist"
                    type="button"
                    className="p-2 text-gray-400 hover:text-gray-500 transition-colors duration-200"
                  >
                    <FontAwesomeIcon icon={faHeart} className="w-5 h-5" />
                  </button>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <div className="text-adjustment space-x-4">
                    <span className="hidden lg:block text-gray-700 font-medium">
                      Olá, {user.name || ""}!
                    </span>
                    <CartView />
                    <Link
                      href="/"
                      className="hidden lg:flex cursor-pointer rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors duration-200 items-center space-x-2"
                    >
                      <FontAwesomeIcon icon={faRightToBracket} />
                      <span>Sair</span>
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
