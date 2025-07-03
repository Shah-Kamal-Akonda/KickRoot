import Link from 'next/link';
import { Product } from '../data/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountedPrice = product.price * (1 - product.discount / 100);

  return (
    <Link href={`/products/${product.id}`} className="block">
      <div className="bg-white rounded-3xl md:p-6 shadow-sm overflow-hidden transition duration-500 hover:shadow-lg hover:border border-green-600 cursor-pointer flex flex-col max-w-[120px] sm:max-w-[380px]">
        <div className="w-full aspect-square relative">
          <img
            src={product.images[0]} // Use first image
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-1 sm:p-3 flex flex-col flex-grow">
          <h3 className="text-[10px] sm:text-base font-bold text-black truncate">
            {product.name}
          </h3>
          <p className="text-[8px] sm:text-sm font-bold text-gray-500 mt-0.5 sm:mt-1 truncate">
            {product.description.substring(0, 25)}...
          </p>
          <div className="mt-0.5 sm:mt-1.5 flex items-center justify-between">
            <div>
              <span className="text-blue-600 font-bold text-[10px] sm:text-base">
                ${discountedPrice.toFixed(2)}
              </span>
              {product.discount > 0 && (
                <span className="ml-1 text-[8px] sm:text-sm font-bold text-gray-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[8px] sm:text-sm font-bold bg-green-300 text-green-700 px-1 sm:px-2 py-0.5 rounded-full">
              {product.discount}%
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}