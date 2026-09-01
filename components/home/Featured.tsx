import React from 'react';

interface FeaturedProps {
  backgroundImage?: string;
  collectionImage?: string;
}

export default function Featured({ 
  backgroundImage = '/images/featured-bg.jpg',
  collectionImage = '/images/featured-collection.jpg'
}: FeaturedProps) {
  return (
    <section className="w-full py-16 px-6 sm:px-8 lg:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Collection Image */}
          <div className="flex justify-center">
            <div 
              className="w-full h-96 sm:h-[500px] rounded-3xl bg-cover bg-center shadow-xl"
              style={{
                backgroundImage: collectionImage
                  ? `url(${collectionImage})`
                  : 'linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 100%)',
              }}
            ></div>
          </div>

          {/* Right Side - Content */}
          <div className="flex flex-col justify-center">
            {/* Label */}
            <span className="text-blue-500 font-semibold text-sm tracking-widest mb-4">
              FEATURED COLLECTION
            </span>

            {/* Main Heading */}
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-blue-600 mb-6 leading-tight">
              BUILT FOR<br />
              WHAT'S NEXT
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-md">
              Built for creators on the move, it blends featherlight carbon-fiber strength with app-connected precision control.
            </p>

            {/* Call-to-Action Button */}
            <div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                EXPLORE COLLECTION
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
