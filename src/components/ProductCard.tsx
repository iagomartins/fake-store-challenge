import Product from "@/types/Product";
import { useCart } from "@/context/Cart";
import Link from "next/link";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div key={product.id} className="group relative">
      <img
        alt={product.description}
        src={product.images[0]}
        className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
      />
      <div className="mt-4 column justify-between">
        <div className="w-full mb-4">
          <h3 className="text-sm text-gray-400">
            <Link href={`/product/${product.id}`} className="elipsis-text">
              {product.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-300">{product.category.name || ''}</p>
          <p className="text-sm font-medium text-gray-200">
            R$ {product.price}
          </p>
        </div>
        <span
          className="cursor-pointer flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => addToCart(product)}
        >
          Adicionar ao carrinho
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
