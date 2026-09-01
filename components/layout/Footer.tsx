import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white text-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Top section */}
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight"
            >
              PYNX
            </Link>

            <p className="mt-4 max-w-md text-sm leading-6 text-gray-600">
              Premium tech and electronics built for what&apos;s next.
              Discover high-performance computing, audio, gaming,
              peripherals, mobile devices and components.
            </p>

            {/* Social links */}
            <div className="mt-6 flex gap-4">
              <Link
                href="#"
                className="text-sm text-gray-500 transition hover:text-black"
              >
                Instagram
              </Link>

              <Link
                href="#"
                className="text-sm text-gray-500 transition hover:text-black"
              >
                Facebook
              </Link>

              <Link
                href="#"
                className="text-sm text-gray-500 transition hover:text-black"
              >
                X
              </Link>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold">Shop</h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/products"
                  className="text-sm text-gray-600 transition hover:text-black"
                >
                  All Products
                </Link>
              </li>

              <li>
                <Link
                  href="/category/computing"
                  className="text-sm text-gray-600 transition hover:text-black"
                >
                  Earbuds
                </Link>
              </li>

              <li>
                <Link
                  href="/category/gaming"
                  className="text-sm text-gray-600 transition hover:text-black"
                >
                  Headsets
                </Link>
              </li>

              <li>
                <Link
                  href="/category/audio"
                  className="text-sm text-gray-600 transition hover:text-black"
                >
                  Accessories
                </Link>
              </li>

              <li>
                <Link
                  href="/category/mobile"
                  className="text-sm text-gray-600 transition hover:text-black"
                >
                  Cables
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold">Support</h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 transition hover:text-black"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  href="/shipping"
                  className="text-sm text-gray-600 transition hover:text-black"
                >
                  Shipping & Delivery
                </Link>
              </li>

              <li>
                <Link
                  href="/returns"
                  className="text-sm text-gray-600 transition hover:text-black"
                >
                  Returns & Refunds
                </Link>
              </li>

              <li>
                <Link
                  href="/faq"
                  className="text-sm text-gray-600 transition hover:text-black"
                >
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  href="/track-order"
                  className="text-sm text-gray-600 transition hover:text-black"
                >
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold">Company</h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 transition hover:text-black"
                >
                  About PYNX
                </Link>
              </li>

              <li>
                <Link
                  href="/careers"
                  className="text-sm text-gray-600 transition hover:text-black"
                >
                  Careers
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-600 transition hover:text-black"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-600 transition hover:text-black"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 border-t border-gray-200 pt-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-sm font-semibold">
                Stay in the loop
              </h3>

              <p className="mt-1 text-sm text-gray-600">
                Get updates on new products, launches and exclusive offers.
              </p>
            </div>

            <form className="flex w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="min-w-0 flex-1 rounded-l-md border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-black"
              />

              <button
                type="submit"
                className="rounded-r-md bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-3 border-t border-gray-200 pt-8 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} PYNX. All rights reserved.
          </p>

          <p>
            Premium technology. Built for what&apos;s next.
          </p>
        </div>
      </div>
    </footer>
  );
}

