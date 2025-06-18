import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "../app/globals.css";
import {
  useQuery,
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import User from "@/types/User";
import { useEffect, useState } from "react";
import Product from "@/types/Product";
import ProductCard from "@/components/ProductCard";
import axios from "axios";

const client = new QueryClient();
let user: User = {
  id: 0,
  email: "",
  password: "",
  name: "",
  role: "",
  avatar: "",
  creationAt: "",
  updatedAt: "",
};

function Body() {
  const [allProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: (): User => {
      return user;
    },
  });

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
        data.forEach((e) => {
          allProducts.push(e);
          products.push(e);
        });
        setLoading(false);
      });

    user = {
      id: Number(sessionStorage.getItem("id")),
      email: String(sessionStorage.getItem("email")),
      password: String(sessionStorage.getItem("password")),
      name: String(sessionStorage.getItem("name")),
      role: String(sessionStorage.getItem("role")),
      avatar: String(sessionStorage.getItem("avatar")),
      creationAt: String(sessionStorage.getItem("creationAt")),
      updatedAt: String(sessionStorage.getItem("updatedAt")),
    };

    sessionStorage.clear();
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
    <QueryClientProvider client={client}>
      <Body />
    </QueryClientProvider>
  );
}
