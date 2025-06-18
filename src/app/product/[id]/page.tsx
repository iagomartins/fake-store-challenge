"use client";
import { Toast } from "@/context/Toast";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { use, useState, useEffect } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import axios from "axios";
import Product from "@/types/Product";
import Category from "@/types/Category";
import Link from "next/link";
import { useCart } from "@/context/Cart";

export const dynamic = 'force-dynamic';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

type Breadcrumb = {
  name: string;
  href: string;
};

const crumb: Breadcrumb = {
  name: "Gallery",
  href: "/gallery",
};
const sizes = ["P", "M", "G"];
const baseCategory: Category = {
  id: 0,
  name: "string",
  slug: "string",
  image: "string",
  creationAt: "string",
  updatedAt: "string",
};
const baseProduct: Product = {
  id: 0,
  title: "string",
  slug: "string",
  price: 0,
  description: "string",
  category: baseCategory,
  images: [],
  creationAt: "string",
  updatedAt: "string",
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ProductPage: React.FC<ProductPageProps> = ({ params }: ProductPageProps) => {
  const { id } = use(params);
  const { addToCart } = useCart();
  const [product, setProduct] = useState(baseProduct);
  const [selectedSize, setSelectedSize] = useState(["P"]);
  const [loading, setLoading] = useState(false);
  const [breadcrumb] = useState([crumb]);

  useEffect(() => {
    setLoading(true);
    axios
      .get<Product>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/${id}`
      )
      .then(({ data }) => {
        setProduct(data);
        setLoading(false);
      });
  }, []);

  return (
    <Toast>
      {loading && (
        <div className="ofuscate-background">
          <div className="loading-spinner">Carregando...</div>
        </div>
      )}
      <header className="main-header flex gap-[24px] flex-wrap items-center justify-center">
        <Header emitCategory={() => 0} showMenu={false} />
      </header>
      <div className="bg-white pt-25">
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              {breadcrumb.map((b, index) => (
                <li key={index}>
                  <div className="flex items-center">
                    <Link
                      href={b.href}
                      className="mr-2 text-sm font-medium text-gray-900"
                    >
                      {b.name || ''}
                    </Link>
                    <svg
                      fill="currentColor"
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
              ))}
              <li className="text-sm">
                <span
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product.title}
                </span>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8">
            {product.images.map((i, index) => (
              <img
                alt={product.description}
                src={i}
                className="row-span-2 aspect-3/4 size-full rounded-lg object-cover max-lg:hidden"
                key={index}
              />
            ))}
          </div>
          <div className="mx-auto mt-6 flex mobile-view">
              <img
                alt={product.description}
                src={product.images[0]}
                className="row-span-2 aspect-3/4 size-full rounded-lg object-cover"
              />
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Informações</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                R$ {product.price}
              </p>

              <form className="mt-10">
                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <a
                      href="#"
                      className="text-sm font-medium text-primary hover:text-indigo-500"
                    >
                      Guia de tamanhos
                    </a>
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-4">
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                    >
                      {sizes.map((size, index) => (
                        <Radio
                          key={index}
                          value={size}
                          className={classNames(
                            size
                              ? "cursor-pointer bg-white text-gray-900 shadow-xs"
                              : "cursor-not-allowed bg-gray-50 text-gray-200",
                            "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-hidden data-focus:ring-2 data-focus:ring-indigo-500 sm:flex-1 sm:py-6"
                          )}
                        >
                          <span>{size}</span>
                          {size ? (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-checked:border-indigo-500 group-data-focus:border"
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                            >
                              <svg
                                stroke="currentColor"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                className="absolute inset-0 size-full stroke-2 text-gray-200"
                              >
                                <line
                                  x1={0}
                                  x2={100}
                                  y1={100}
                                  y2={0}
                                  vectorEffect="non-scaling-stroke"
                                />
                              </svg>
                            </span>
                          )}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>

                <span
                  onClick={() => addToCart(product)}
                  className="cursor-pointer mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                >
                  Adicionar ao carrinho
                </span>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Descrição</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="py-6 row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Footer />
      </footer>
    </Toast>
  );
};

export default ProductPage;
