'use client';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "../globals.css";
import { useEffect, useState } from "react";
import Product from "@/types/Product";
import ProductCard from "@/components/ProductCard";
import axios from "axios";

function Body() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  function changeCategory(id: number) {
    const result = allProducts.filter((e) => e.category.id === id);
    setProducts(result);
    return id;
  }
  
  useEffect(() => {
    setLoading(true);
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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="main-header flex gap-[24px] flex-wrap items-center justify-center">
        <Header emitCategory={changeCategory} />
      </header>
      <main className="product-grid row-start-2 items-center sm:items-start">
        {loading && <div className="ofuscate-background"><div className="loading-spinner">Carregando...</div></div>}
        {products.length === 0 && <span>Não há produtos nessa categoria...</span>}
        {products.map((p, index) => (
          <ProductCard product={p} key={index} />
        ))}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Footer />
      </footer>
    </div>
  );
}

export default function Gallery() {
  return (
      <Body />
  );
}
