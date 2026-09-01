import React from 'react';

interface Product {
  id: string;
  name: string;
  image?: string;
  price: number;
  rating: number;
  reviews: number;
}

interface TrendingProps {
  products?: Product[];
}

const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'Aura-Series RTX 4090 Build',
    image: '/images/product-1.jpg',
    price: 4500.00,
    rating: 5,
    reviews: 42,
  },
  {
    id: '2',
    name: 'Sonic-X Pro Headphones',
    image: '/images/product-2.jpg',
    price: 349.00,
    rating: 5,
    reviews: 128,
  },
  {
    id: '3',
    name: 'Nebula RGB Mechanical Keyboard',
    image: '/images/product-3.jpg',
    price: 219.00,
    rating: 4.5,
    reviews: 18,
  },
  {
    id: '4',
    name: 'Pro Streamer Mic',
    image: '/images/product-4.jpg',
    price: 149.00,
    rating: 4.5,
    reviews: 84,
  },
];

export default function Trending({ products = defaultProducts }: TrendingProps) {
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-lg ${
              i < Math.floor(rating) ? 'text-red-500' : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <section className="w-full py-16 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-blue-600">
            TRENDING NOW
          </h2>
          <a href="#" className="text-blue-500 hover:text-blue-700 font-semibold text-sm">
            VIEW ALL
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 cursor-pointer group"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden bg-gray-200">
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
                <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  {renderStars(product.rating)}
                  <span className="text-xs text-gray-600">
                    ({product.reviews})
                  </span>
                </div>

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
