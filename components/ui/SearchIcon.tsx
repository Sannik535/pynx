import React, { useState } from 'react';

export default function SearchIcon() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchQuery('');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
    // Add your search logic here
  };

  return (
    <div className="relative">
      {/* Search Button */}
      <button
        onClick={handleSearchToggle}
        className="text-gray-800 hover:text-blue-600 transition duration-300 p-2"
        aria-label="Search"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>

      {/* Search Modal/Overlay */}
      {isSearchOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={handleSearchToggle}
          ></div>

          {/* Search Box */}
          <div className="absolute top-12 right-0 z-50 w-80 sm:w-96">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-3 rounded-lg border-2 border-blue-600 focus:outline-none focus:border-blue-700 shadow-lg"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-700"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>

            {/* Search Results (Optional) */}
            {searchQuery && (
              <div className="mt-4 bg-white rounded-lg shadow-lg p-4 max-h-96 overflow-y-auto">
                <p className="text-gray-600 text-sm">
                  Search results for "{searchQuery}"
                </p>
                {/* Add your search results here */}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
