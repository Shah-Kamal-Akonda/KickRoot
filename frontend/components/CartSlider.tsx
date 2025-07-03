import { useCart } from './CartContext';
import Image from 'next/image';

interface CartSliderProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSlider({ isOpen, onClose }: CartSliderProps) {
  const { cartItems, updateQuantity } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * (1 - item.discount / 100) * item.quantity,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } z-50`}
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-green-900">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 mb-4 border-b pb-2"
              >
                <Image
             src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  sizes="64px"
                  className="object-cover rounded-xl"
                  priority={false}
                />
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-black">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    ${(item.price * (1 - item.discount / 100)).toFixed(2)} x {item.quantity}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-200 text-gray-700 font-bold w-6 h-6 rounded-full hover:bg-gray-300 transition duration-300"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold text-black">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-200 text-gray-700 font-bold w-6 h-6 rounded-full hover:bg-gray-300 transition duration-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="mt-4">
            <p className="text-base font-bold text-green-900">
              Total: ${totalPrice.toFixed(2)}
            </p>
            <button className="w-full mt-2 bg-blue-600 text-white font-bold text-base py-2 rounded-3xl hover:bg-blue-700 transition duration-300">
              Buy Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}