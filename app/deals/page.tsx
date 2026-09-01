import Image from "next/image";
import Link from "next/link";
import { FlashDealsCountdown } from "./FlashDealsCountdown";

// Swap these for your real data source (Prisma query, CMS, etc.)
const flashDeals = [
  {
    id: "arctic-shell-jacket",
    name: "Arctic Shell Jacket",
    price: 315,
    originalPrice: 450,
    discountLabel: "30% OFF",
    image: "/deals/arctic-shell-jacket.jpg",
  },
  {
    id: "ridge-fleece",
    name: "Ridge Fleece",
    price: 108,
    originalPrice: 180,
    discountLabel: "40% OFF",
    image: "/deals/ridge-fleece.jpg",
  },
  {
    id: "vector-cargo-pants",
    name: "Vector Cargo Pants",
    price: 160,
    originalPrice: 320,
    discountLabel: "50% OFF",
    image: "/deals/vector-cargo-pants.jpg",
  },
  {
    id: "transit-backpack",
    name: "Transit Backpack",
    price: 135,
    originalPrice: 180,
    discountLabel: "25% OFF",
    image: "/deals/transit-backpack.jpg",
  },
];

export default function DealsPage() {
  return (
    <main>
      <HeroSection />
      <FlashDealsSection deals={flashDeals} />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="px-6 pt-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl">
        <div className="relative aspect-[16/8] w-full md:aspect-[16/6]">
          {/* Replace src with your hero image */}
          <Image
            src="/deals/hero-seasonal-drop.jpg"
            alt="Model wearing technical outerwear from the seasonal drop"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1280px) 1152px, 100vw"
          />
          <div className="absolute inset-0 bg-indigo-600/70" />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <span className="text-sm font-semibold tracking-wide text-teal-300">
            The Seasonal Drop
          </span>
          <h1 className="mt-3 text-4xl font-extrabold text-white md:text-6xl">
            Up to 50% Off
          </h1>
          <p className="mt-5 max-w-xl text-sm text-indigo-50 md:text-base">
            High-performance outerwear and technical apparel for the urban
            explorer. Limited quantities available.
          </p>

          <div className="mt-7 flex gap-3">
            <Link
              href="/shop?audience=men"
              className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Shop Men
            </Link>
            <Link
              href="/shop?audience=women"
              className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Shop Women
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

type Deal = {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discountLabel: string;
  image: string;
};

function FlashDealsSection({ deals }: { deals: Deal[] }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <div className="flex items-end justify-between border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Flash Deals</h2>
          <p className="mt-1 text-sm text-slate-600">
            Limited time offers on premium gear.
          </p>
        </div>

        <FlashDealsCountdown endsInSeconds={4 * 3600 + 23 * 60 + 59} />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </section>
  );
}

function DealCard({ deal }: { deal: Deal }) {
  return (
    <Link
      href={`/products/${deal.id}`}
      className="group block overflow-hidden rounded-2xl bg-slate-100 transition hover:bg-slate-200/70"
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <span className="absolute left-3 top-3 z-10 rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white">
          {deal.discountLabel}
        </span>
        {/* Replace src with your product image */}
        <Image
          src={deal.image}
          alt={deal.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 270px, 45vw"
        />
      </div>

      <div className="px-4 pb-4 pt-3">
        <h3 className="text-sm font-semibold text-slate-900">{deal.name}</h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-semibold text-rose-600">
            ${deal.price}
          </span>
          <span className="text-xs text-slate-400 line-through">
            ${deal.originalPrice}
          </span>
        </div>
      </div>
    </Link>
  );
}