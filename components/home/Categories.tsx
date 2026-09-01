import React from 'react';

interface Category {
  id: string;
  name: string;
  image?: string;
}

interface CategoriesProps {
  categories?: Category[];
}

const defaultCategories: Category[] = [
  { id: '1', name: 'EARBUDS', image: '/images/earbuds.jpg' },
  { id: '2', name: 'HEADSETS', image: '/images/headsets.jpg' },
  { id: '3', name: 'WATCHES', image: '/images/watches.jpg' },
  { id: '4', name: 'CABLES', image: '/images/cables.jpg' },
  { id: '5', name: 'LIGHTS', image: '/images/lights.jpg' },
  { id: '6', name: 'ACCESSORIES', image: '/images/accessories.jpg' },
];

export default function Categories({ categories = defaultCategories }: CategoriesProps) {
  return (
    <section className="w-full py-16 px-6 sm:px-8 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl sm:text-5xl font-bold text-center text-blue-600 mb-12">
          SHOP BY CATEGORY
        </h2>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative h-64 rounded-2xl overflow-hidden cursor-pointer group"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-300 group-hover:scale-110"
                style={{
                  backgroundImage: category.image
                    ? `url(${category.image})`
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
              ></div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-blue-600/40 group-hover:bg-blue-600/50 transition duration-300"></div>

              {/* Category Label */}
              <div className="absolute inset-0 flex items-end p-6">
                <h3 className="text-2xl font-bold text-white">
                  {category.name}
                </h3>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center bg-black/20">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition">
                  View Category
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
