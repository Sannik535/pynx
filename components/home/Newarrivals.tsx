import React from 'react';

interface Product {
  id: string;
  name: string;
  image?: string;
  price: number;
  isNew?: boolean;
}

interface NewArrivalsProps {
  products?: Product[];
}

const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'Quantum SSD 2TB',
    image: '/images/newarrival-1.jpg',
    price: 245.00,
    isNew: true,
  },
  {
    id: '2',
    name: 'Mesh WiFi Router',
    image: '/images/newarrival-2.jpg',
    price: 185.00,
    isNew: true,
  },
  {
    id: '3',
    name: 'Ergonomic Mouse',
    image: '/images/newarrival-3.jpg',
    price: 110.00,
    isNew: true,
  },
  {
    id: '4',
    name: 'Capture Card Pro',
    image: '/images/newarrival-4.jpg',
    price: 165.00,
    isNew: true,
  },
];

export default function NewArrivals({ products = defaultProducts }: NewArrivalsProps) {
  return (
    <section className="w-full py-16 px-6 sm:px-8 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-blue-600">
            NEW ARRIVALS
          </h2>
          <a href="#" className="text-blue-500 hover:text-blue-700 font-semibold text-sm">
            SHOP ALL
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 cursor-pointer group"
            >
              {/* Product Image Container */}
              <div className="relative h-72 overflow-hidden bg-gray-200">
                {/* NEW Badge */}
                {product.isNew && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      NEW
                    </span>
                  </div>
                )}

                {/* Product Image */}
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition duration-300"
                  style={{
                    backgroundImage: product.image
                      ? `url(${product.image})`
                      : 'linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 100%)',
                  }}
                ></div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                {/* Product Name */}
                <h3 className="text-sm font-semibold text-blue-600 mb-3">
                  {product.name}
                </h3>

                {/* Price */}
                <p className="text-lg font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
