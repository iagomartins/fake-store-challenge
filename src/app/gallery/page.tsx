"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "../globals.css";
import { useEffect, useState } from "react";
import Product from "@/types/Product";
import ProductCard from "@/components/ProductCard";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { Toast } from "@/context/Toast";

export const dynamic = "force-dynamic";

function Body() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  function changeCategory(id: number) {
    const result = allProducts.filter((e) => e.category.id === id);
    setProducts(result);
    return id;
  }

  useEffect(() => {
    setLoading(true);
    console.log(queryClient.getQueryData(["user"]));
    axios
      .get<Product[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products?limit=0&offset=0`
      )
      .then(({ data }) => {
        setProducts(data);
        setAllProducts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="main-header">
        <Header emitCategory={changeCategory} showMenu={true} />
      </header>

      <main className="pt-24 pb-16">
        <Toast>
          {loading && (
            <div className="ofuscate-background">
              <div className="loading-spinner">Carregando...</div>
            </div>
          )}

          {/* Hero Section */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Descubra Produtos Incríveis
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Encontre tudo que você precisa com os melhores preços
              </p>
              <div className="flex justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                  <span className="text-sm font-medium">
                    ✨ Mais de 1000 produtos disponíveis
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {products.length === 0 && !loading && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-gray-500">
                  Tente selecionar uma categoria diferente.
                </p>
              </div>
            )}

            <div className="product-grid">
              {products.map((p, index) => (
                <ProductCard product={p} key={index} />
              ))}
            </div>
          </div>
        </Toast>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default function Gallery() {
  return <Body />;
}
