import Product from "@/types/Product";
import { useCart } from "@/context/Cart";
import Link from "next/link";
import { useState } from "react";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate loading
    addToCart(product);
    setIsAdding(false);
  };

  return (
    <div
      className="product-card group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-red-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square overflow-hidden bg-gray-100 relative">
        <img
          alt={product.description}
          src={product.images[0]}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <div
          className={`absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 ${
            isHovered ? "bg-opacity-10" : ""
          }`}
        />

        {/* Quick view overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link
            href={`/product/${product.id}`}
            className="bg-white text-gray-900 px-4 py-2 rounded-full font-medium shadow-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Ver detalhes
          </Link>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <Link href={`/product/${product.id}`} className="block">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 hover:text-red-600 transition-colors duration-200">
              {product.title}
            </h3>
          </Link>
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
            {product.category.name || ""}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-gray-900">
              R$ {product.price}
            </p>
            <div className="flex items-center space-x-1">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-3 h-3 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-500">(4.5)</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full btn-primary flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
            isAdding ? "opacity-75 cursor-not-allowed" : ""
          }`}
        >
          {isAdding ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Adicionando...</span>
            </>
          ) : (
            <>
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                />
              </svg>
              <span>Adicionar ao carrinho</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
