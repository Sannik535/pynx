"use client";

import Link from "next/link";
import { useState } from "react";
import MobileNav from "@/components/layout/Mobilenav";
import SearchIcon from "@/components/ui/SearchIcon";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-bold tracking-tight text-blue-500"
          aria-label="PYNX Home"
        >
          PYNX
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex text-black">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-gray-500"
          >
            Home
          </Link>

          <Link
            href="/products"
            className="text-sm font-medium transition-colors hover:text-gray-500"
          >
            Shop
          </Link>

          <Link
            href="/category"
            className="text-sm font-medium transition-colors hover:text-gray-500"
          >
            Categories
          </Link>

          <Link
            href="/deals"
            className="text-sm font-medium transition-colors hover:text-gray-500"
          >
            Deals
          </Link>

          <Link
            href="/new-arrivals"
            className="text-sm font-medium transition-colors hover:text-gray-500"
          >
            New Arrivals
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-5 md:flex">
          <SearchIcon />

          {/* Account */}
          <Link
            href="/account"
            aria-label="Account"
            className="transition-opacity hover:opacity-60 text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="5" />
              <path d="M20 21a8 8 0 0 0-16 0" />
            </svg>
          </Link>

          {/* Cart */}
          <Link href="/cart">
            <button className="transition-opacity hover:opacity-60 relative">
              🛒
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </button>
          </Link>
        </div>

        
        
        <MobileNav />
      </nav>

     
    </header>
  );
}