'use client'
import { useState,useEffect,use } from 'react';

import { notFound } from 'next/navigation';

import { productCategories } from '../../../../data/product';

import { Product } from '../../../../data/types';
import { useCart } from '../../../../components/CartContext';
import CartSlider from '../../../../components/CartSlider';

export default function ProductPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = use(params);
  const { cartItems, addToCart, updateQuantity } = useCart();
  const product = productCategories
    .flatMap((category) => category.products)
    .find((p) => p.id === Number(productId));

  if (!product) {
    notFound();
  }

  // Initialize quantity based on cart if product exists
  const cartItem = cartItems.find((item) => item.id === product.id);
  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 1);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Total items in cart for badge
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Sync local quantity with cart when cartItems change
  useEffect(() => {
    const cartItem = cartItems.find((item) => item.id === product.id);
    setQuantity(cartItem ? cartItem.quantity : 1);
  }, [cartItems, product.id]);

  const handleQuantityChange = (newQuantity: number) => {
    const updatedQuantity = Math.max(1, newQuantity);
    setQuantity(updatedQuantity);
    if (cartItem) {
      updateQuantity(product.id, updatedQuantity);
    }
  };

  const handleAddToCart = () => {
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity + quantity);
    } else {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        discount: product.discount,
        image: product.images[0],
        quantity,
      });
    }
    setIsCartOpen(true);
  };

  const discountedPrice = product.price * (1 - product.discount / 100);
  const [mainImage, setMainImage] = useState(product.images[0]);

  return (
    <div className="bg-gray-100 py-6 relative">
      {/* Cart Icon with Badge */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed top-4 right-4 z-50 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition duration-300"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>
      {/* Cart Slider */}
      <CartSlider isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="bg-white rounded-3xl shadow-sm p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row gap-6">
          {/* Left: Image Section */}
          <div className="w-full sm:w-1/2 flex flex-col">
            <div className="w-[240px] h-[154px] mx-auto">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
            <div className="flex gap-2 mt-4 justify-center">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(image)}
                  className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 ${
                    mainImage === image ? 'border-blue-600' : 'border-gray-200'
                  } hover:border-blue-400 transition duration-300`}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          {/* Right: Details Section */}
          <div className="w-full sm:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-900">
                {product.name}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-2">
                {product.description}
              </p>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold text-xl sm:text-2xl">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  {product.discount > 0 && (
                    <span className="text-gray-400 text-sm sm:text-base line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </div>
                {/* Quantity Selector */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="bg-gray-200 text-gray-700 font-bold w-8 h-8 rounded-full hover:bg-gray-300 transition duration-300"
                  >
                    -
                  </button>
                  <span className="text-base font-bold text-black">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="bg-gray-200 text-gray-700 font-bold w-8 h-8 rounded-full hover:bg-gray-300 transition duration-300"
                  >
                    +
                  </button>
                </div>
              </div>
              {product.discount > 0 && (
                <span className="inline-block mt-2 text-sm sm:text-base font-bold bg-green-300 text-green-700 px-3 py-1 rounded-full">
                  {product.discount}% OFF
                </span>
              )}
              <div className="mt-4">
                <h3 className="text-base sm:text-lg font-bold text-green-900">
                  Customer Reviews
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  No reviews yet. Be the first to review this product!
                </p>
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              <button className="flex-1 bg-blue-600 text-white font-bold text-sm sm:text-base py-2 sm:py-3 rounded-3xl hover:bg-blue-700 transition duration-300">
                Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-green-600 text-white font-bold text-sm sm:text-base py-2 sm:py-3 rounded-3xl hover:bg-green-700 transition duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}