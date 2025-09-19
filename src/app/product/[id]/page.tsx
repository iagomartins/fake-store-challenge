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

export const dynamic = "force-dynamic";

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

const ProductPage: React.FC<ProductPageProps> = ({
  params,
}: ProductPageProps) => {
  const { id } = use(params);
  const { addToCart } = useCart();
  const [product, setProduct] = useState(baseProduct);
  const [selectedSize, setSelectedSize] = useState(["P"]);
  const [loading, setLoading] = useState(false);
  const [breadcrumb] = useState([crumb]);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    setLoading(true);
    axios
      .get<Product>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/${id}`)
      .then(({ data }) => {
        setProduct(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toast>
        {loading && (
          <div className="ofuscate-background">
            <div className="loading-spinner">Carregando...</div>
          </div>
        )}

        <header className="main-header">
          <Header emitCategory={() => 0} showMenu={false} />
        </header>

        <main className="pt-24">
          <div className="bg-white">
            <div className="pt-6">
              {/* Breadcrumb */}
              <nav
                aria-label="Breadcrumb"
                className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
              >
                <ol className="flex items-center space-x-2 text-sm">
                  {breadcrumb.map((b, index) => (
                    <li key={index} className="flex items-center">
                      <Link
                        href={b.href}
                        className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                      >
                        {b.name || ""}
                      </Link>
                      <svg
                        fill="currentColor"
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        aria-hidden="true"
                        className="h-5 w-4 text-gray-300 mx-2"
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </li>
                  ))}
                  <li className="text-sm">
                    <span className="font-medium text-gray-500">
                      {product.title}
                    </span>
                  </li>
                </ol>
              </nav>

              {/* Product Details */}
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Image Gallery */}
                  <div className="space-y-4">
                    <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
                      <img
                        alt={product.description}
                        src={product.images[selectedImage] || product.images[0]}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Thumbnail Gallery */}
                    {product.images.length > 1 && (
                      <div className="grid grid-cols-4 gap-4">
                        {product.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`aspect-square overflow-hidden rounded-lg ${
                              selectedImage === index
                                ? "ring-2 ring-red-500"
                                : "hover:ring-2 hover:ring-gray-300"
                            } transition-all duration-200`}
                          >
                            <img
                              alt={product.description}
                              src={image}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {product.title}
                      </h1>
                      <p className="text-lg text-gray-600 mb-4">
                        {product.category.name}
                      </p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className="w-5 h-5 fill-current"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                              </svg>
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-600">
                            (4.5) • 128 avaliações
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-4xl font-bold text-gray-900">
                          R$ {product.price}
                        </span>
                        <span className="text-lg text-gray-500 line-through">
                          R$ {(product.price * 1.2).toFixed(2)}
                        </span>
                        <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                          -17%
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Em até 12x sem juros no cartão
                      </p>
                    </div>

                    {/* Size Selection */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">
                          Tamanho
                        </h3>
                        <a
                          href="#"
                          className="text-sm font-medium text-red-600 hover:text-red-500 transition-colors duration-200"
                        >
                          Guia de tamanhos
                        </a>
                      </div>

                      <RadioGroup
                        value={selectedSize}
                        onChange={setSelectedSize}
                        className="grid grid-cols-3 gap-4"
                      >
                        {sizes.map((size) => (
                          <Radio
                            key={size}
                            value={size}
                            className={({ checked }) =>
                              classNames(
                                checked
                                  ? "border-red-500 bg-red-50 text-red-900"
                                  : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50",
                                "flex items-center justify-center rounded-lg border px-4 py-3 text-sm font-medium uppercase cursor-pointer transition-colors duration-200"
                              )
                            }
                          >
                            {size}
                          </Radio>
                        ))}
                      </RadioGroup>
                    </div>

                    {/* Add to Cart */}
                    <div className="space-y-4">
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full btn-primary flex items-center justify-center space-x-2 py-4 px-6 text-lg font-medium rounded-lg"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                          />
                        </svg>
                        <span>Adicionar ao Carrinho</span>
                      </button>

                      <button className="w-full flex items-center justify-center space-x-2 py-4 px-6 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        <span>Adicionar aos Favoritos</span>
                      </button>
                    </div>

                    {/* Product Description */}
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Descrição
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Características
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center">
                          <svg
                            className="w-4 h-4 text-green-500 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Material de alta qualidade
                        </li>
                        <li className="flex items-center">
                          <svg
                            className="w-4 h-4 text-green-500 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Garantia de 1 ano
                        </li>
                        <li className="flex items-center">
                          <svg
                            className="w-4 h-4 text-green-500 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Frete grátis para todo o Brasil
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer>
          <Footer />
        </footer>
      </Toast>
    </div>
  );
};

export default ProductPage;
