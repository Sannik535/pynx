import React from 'react';


interface HeroProps {
  backgroundImage?: string;
}

export default function Hero({ backgroundImage = "/images/hero-bg.jpg" }: HeroProps) {
  return (
    <section
      className="relative min-h-screen w-full flex items-center justify-start overflow-hidden"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="max-w-2xl">
          {/* New Arrivals Badge */}
          <div className="mb-6 inline-block">
            <span className="text-sm font-semibold text-blue-400 bg-blue-400/20 px-4 py-2 rounded-full border border-blue-400/50">
              NEW ARRIVALS
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-blue-500 mb-6 leading-tight drop-shadow-lg">
            POWER YOUR <br />
            DIGITAL WORLD
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-100 mb-8 leading-relaxed max-w-xl drop-shadow">
            Discover our latest high-performance setups. Precision engineering meets high-end electronics.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex gap-4 flex-wrap">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
              SHOP NOW
            </button>
            <button className="bg-transparent hover:bg-blue-400/20 text-blue-400 font-semibold px-8 py-3 rounded-lg border-2 border-blue-400 transition duration-300 ease-in-out">
              EXPLORE
            </button>
          </div>
        </div>
      </div>

      {/* Decorative gradient overlay (optional) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
    </section>
  );
}
