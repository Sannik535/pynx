import Image from "next/image";
import Link from "next/link";

// Swap these for your real data source (Prisma query, CMS, etc.)
const latestProducts = [
  {
    id: "aero-shell-parka",
    name: "Aero-Shell Parka",
    price: 450,
    image: "/products/aero-shell-parka.jpg",
    isNew: true,
  },
  {
    id: "vector-cargo-pants",
    name: "Vector Cargo Pants",
    price: 320,
    image: "/products/vector-cargo-pants.jpg",
    isNew: true,
  },
  {
    id: "modular-sling-bag",
    name: "Modular Sling Bag",
    price: 180,
    image: "/products/modular-sling-bag.jpg",
    isNew: true,
  },
];

export default function NewArrivalsPage() {
  return (
    <main>
      <HeroSection />
      <LatestSection products={latestProducts} />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="bg-indigo-50/40 px-6 pt-16 pb-20 md:pt-20 md:pb-24">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-indigo-700 md:text-6xl">
          Fresh Drops
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
          Discover the latest iterations of high-fidelity technical apparel.
          Engineered for the modern urban environment, featuring progressive
          silhouettes and luminous material integration.
        </p>
      </div>

      <div className="relative mx-auto mt-12 max-w-6xl">
        <div className="relative aspect-[16/8] w-full overflow-hidden rounded-3xl bg-slate-200 md:aspect-[16/7]">
          {/* Replace src with your hero image */}
          <Image
            src="/hero/new-arrivals-hero.jpg"
            alt="Model wearing the new arrivals technical jacket and pants"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1280px) 1152px, 100vw"
          />

          <div className="absolute bottom-8 right-8 hidden items-center gap-2 md:flex">
            <span className="rounded-md bg-white/90 px-4 py-2 text-sm font-medium text-slate-800 backdrop-blur">
              New Arrivals
            </span>
            <div className="flex overflow-hidden rounded-md bg-white/90 backdrop-blur">
              <button
                type="button"
                aria-label="Previous slide"
                className="px-3 py-2 text-slate-500 transition hover:text-slate-900"
              >
                &larr;
              </button>
              <button
                type="button"
                aria-label="Next slide"
                className="px-3 py-2 text-slate-500 transition hover:text-slate-900"
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  isNew?: boolean;
};

function LatestSection({ products }: { products: Product[] }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <div className="flex items-baseline justify-between border-t border-slate-200 pt-10">
        <h2 className="text-2xl font-bold text-slate-900">The Latest</h2>
        <Link
          href="/products"
          className="text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
        >
          View All
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block overflow-hidden rounded-2xl bg-indigo-50/60 transition hover:bg-indigo-50"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        {product.isNew && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
            NEW
          </span>
        )}
        {/* Replace src with your product image */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-6 transition duration-300 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
        />
      </div>

      <div className="px-5 pb-5 pt-2">
        <h3 className="text-base font-semibold text-slate-900">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-slate-600">${product.price}</p>
      </div>
    </Link>
  );
}