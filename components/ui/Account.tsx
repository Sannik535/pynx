"use client"
import React, { useState } from 'react';

interface Order {
  id: string;
  orderNumber: string;
  productName: string;
  productImage?: string;
  price: number;
  status: 'SHIPPED' | 'DELIVERED' | 'PENDING';
  orderDate: string;
  expectedDelivery?: string;
  deliveredDate?: string;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface AccountProps {
  user?: UserProfile;
  orders?: Order[];
}

const defaultUser: UserProfile = {
  name: 'Alex Mercer',
  email: 'alex.mercer@example.com',
  phone: '+1 (555) 019-2834',
  address: '1240 Tech Blvd, Suite 400',
  city: 'Neo-Tokyo',
  state: 'NY',
  zipCode: '10012',
  country: 'United States',
};

const defaultOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'PYNX-89234',
    productName: 'AeroWeave Runner',
    productImage: '/images/order-1.jpg',
    price: 295.0,
    status: 'SHIPPED',
    orderDate: 'Oct 24',
    expectedDelivery: 'Oct 24',
  },
  {
    id: '2',
    orderNumber: 'PYNX-89102',
    productName: 'Syntax Tech Tote',
    productImage: '/images/order-2.jpg',
    price: 450.0,
    status: 'DELIVERED',
    orderDate: 'Oct 12',
    deliveredDate: 'Oct 12',
  },
];

export default function Account({ user = defaultUser, orders = defaultOrders }: AccountProps) {
  const [editingProfile, setEditingProfile] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SHIPPED':
        return 'bg-blue-100 text-blue-800';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full sm:w-64 bg-gray-200 p-6 flex flex-col">
        {/* Logo */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-black">PYNX</h1>

        {/* User Welcome Card */}
        <div className="mb-8 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-400 flex-shrink-0">
            <img
              src="https://via.placeholder.com/48"
              alt="User"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="hidden sm:block">
            <p className="font-semibold text-black text-sm">Welcome to PYNX</p>
            <p className="text-xs text-gray-600">Modern Tech-Luxe Fashion</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-4 mb-8 flex-1">
          <a
            href="#"
            className="flex items-center gap-3 text-gray-700 hover:text-black transition"
          >
            <span>🏠</span>
            <span className="hidden sm:inline">Home</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 text-gray-700 hover:text-black transition"
          >
            <span>🛍️</span>
            <span className="hidden sm:inline">Shop</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 text-gray-700 hover:text-black transition"
          >
            <span>📂</span>
            <span className="hidden sm:inline">Categories</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 text-gray-700 hover:text-black transition"
          >
            <span>❤️</span>
            <span className="hidden sm:inline">Wishlist</span>
          </a>
          <button className="w-full flex items-center gap-3 bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-800 transition">
            <span>👤</span>
            <span className="hidden sm:inline">Account</span>
          </button>
        </nav>

        {/* Logout */}
        <button className="flex items-center gap-3 text-red-600 hover:text-red-700 transition">
          <span>🚪</span>
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 sm:p-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-2 text-black">My Account</h2>
            <p className="text-gray-600">Manage your profile, orders, and preferences.</p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Orders - Left Side */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-black">Recent Orders</h3>
                <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                  View All →
                </a>
              </div>

              {/* Orders List */}
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="w-full sm:w-24 h-24 rounded-lg bg-gray-200 flex-shrink-0">
                        <div
                          className="w-full h-full bg-cover bg-center rounded-lg"
                          style={{
                            backgroundImage: order.productImage
                              ? `url(${order.productImage})`
                              : 'linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 100%)',
                          }}
                        ></div>
                      </div>

                      {/* Order Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-lg">{order.productName}</h4>
                            <p className="text-sm text-gray-600">Order #{order.orderNumber}</p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </div>

                        <p className="text-lg font-bold text-gray-900 mb-2">${order.price.toFixed(2)}</p>
                        <p className="text-sm text-gray-600 mb-3">
                          {order.status === 'SHIPPED'
                            ? `Expected Delivery: ${order.expectedDelivery}`
                            : `Delivered on: ${order.deliveredDate}`}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          {order.status === 'SHIPPED' && (
                            <button className="px-4 py-2 border-2 border-black text-black rounded-lg hover:bg-black hover:text-white transition font-semibold text-sm">
                              Track Order
                            </button>
                          )}
                          {order.status === 'DELIVERED' && (
                            <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition font-semibold text-sm">
                              Buy Again
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Overview - Right Side */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Profile Overview</h3>

              {/* Personal Info Card */}
              <div className="bg-white rounded-lg p-6 shadow-md mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-lg">PERSONAL INFO</h4>
                  <button
                    onClick={() => setEditingProfile(!editingProfile)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    ✏️
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-600 font-semibold mb-1">Name</p>
                    <p className="text-sm font-semibold">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold mb-1">Email</p>
                    <p className="text-sm font-semibold">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold mb-1">Phone</p>
                    <p className="text-sm font-semibold">{user.phone}</p>
                  </div>
                </div>
              </div>

              {/* Default Address Card */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-lg">DEFAULT ADDRESS</h4>
                  <button className="text-blue-600 hover:text-blue-700">
                    ✏️
                  </button>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-sm">{user.name}</p>
                  <p className="text-sm text-gray-700">{user.address}</p>
                  <p className="text-sm text-gray-700">
                    {user.city}, {user.state} {user.zipCode}
                  </p>
                  <p className="text-sm text-gray-700">{user.country}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
