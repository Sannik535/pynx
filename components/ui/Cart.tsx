'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 300;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shipping = subtotal >= freeShippingThreshold ? 0 : 50;
  const total = subtotal + shipping;

  // Empty Cart State
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
        <h1 className="text-4xl font-bold mb-4">PYNX</h1>

        {/* Cart Icon */}
        <div className="mb-8 text-gray-300">
          <svg
            className="w-24 h-24"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>

        {/* Empty Cart Message */}
        <h2 className="text-3xl font-bold mb-3">Your cart is empty</h2>
        <p className="text-gray-600 text-center mb-8 max-w-md">
          Looks like you haven't added anything to your cart yet. Discover the latest in tech-luxe fashion.
        </p>

        {/* Shop Button */}
        <Link href="/shop">
          <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition font-semibold">
            Shop New Arrivals →
          </button>
        </Link>

        {/* Sign In Link */}
        <Link href="/signin">
          <button className="mt-8 text-gray-600 hover:text-black transition">
            👤 SIGN IN TO VIEW SAVED ITEMS
          </button>
        </Link>
      </div>
    );
  }

  // Shopping Cart with Items
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <h1 className="text-4xl font-bold mb-2">PYNX</h1>
          <h2 className="text-3xl font-bold mb-2">Shopping Cart</h2>
          <p className="text-gray-600">{cartItems.length} items in your cart.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            {/* Free Shipping Progress */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-gray-800 mb-2">
                You're ${amountToFreeShipping.toFixed(2)} away from Free Shipping
              </p>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black transition-all duration-300"
                  style={{
                    width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="space-y-6 mb-8">
              {/* Header */}
              <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-200">
                <div className="col-span-6 text-sm font-semibold text-gray-800">PRODUCT</div>
                <div className="col-span-3 text-sm font-semibold text-gray-800">QUANTITY</div>
                <div className="col-span-3 text-sm font-semibold text-gray-800 text-right">PRICE</div>
              </div>

              {/* Items List */}
              {cartItems.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-4 pb-6 border-b border-gray-200">
                  {/* Product Image & Info */}
                  <div className="col-span-6 flex gap-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0">
                      <div
                        className="w-full h-full bg-cover bg-center rounded-lg"
                        style={{
                          backgroundImage: item.image
                            ? `url(${item.image})`
                            : 'linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 100%)',
                        }}
                      ></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">Color: {item.color}</p>
                      <button className="text-sm text-gray-600 hover:text-red-600 transition mt-2">
                        ❤️ Save
                      </button>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-3 flex items-center">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-600 hover:text-black transition"
                      >
                        −
                      </button>
                      <span className="px-4 py-1 border-l border-r border-gray-300">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-600 hover:text-black transition"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="col-span-3 flex items-center justify-between">
                    <span className="font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-600 transition"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
              <h3 className="text-2xl font-bold mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6 border-b border-gray-200 pb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? 'Free' : `Calculated at checkout`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Tax</span>
                  <span className="font-semibold">$0.00</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between mb-6">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold">${total.toFixed(2)}</span>
              </div>

              {/* Promo Code */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Enter Promo Code"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-100 transition">
                  Apply
                </button>
              </div>

              {/* Checkout Button */}
              <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-semibold mb-3">
                Proceed to Checkout →
              </button>

              {/* Secure Checkout */}
              <p className="text-center text-sm text-gray-600">
                🔒 Secure Checkout
              </p>
            </div>
          </div>
        </div>

        {/* Frequently Bought Together Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8">Frequently Bought Together</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-48"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
