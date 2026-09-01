import Image from "next/image";
import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { FilterSidebar } from "./FilterSidebar";
import { SortAndView } from "./SortAndView";

const PAGE_SIZE = 12;

type SearchParams = {
  category?: string; // comma-separated category slugs
  brand?: string; // comma-separated brand names
  color?: string; // comma-separated color values
  maxPrice?: string;
  sort?: string;
  view?: string;
  page?: string;
};

export default async function CategoryPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const selectedSlugs = params.category
    ? params.category.split(",").filter(Boolean)
    : [];
  const selectedBrands = params.brand
    ? params.brand.split(",").filter(Boolean)
    : [];
  const selectedColors = params.color
    ? params.color.split(",").filter(Boolean)
    : [];
  const maxPrice = Number(params.maxPrice ?? 10000);
  const sort = params.sort ?? "recommended";
  const view = params.view === "list" ? "list" : "grid";
  const page = Math.max(1, Number(params.page ?? 1));

  const productWhere = {
    price: { lte: maxPrice },
    ...(selectedSlugs.length > 0
      ? { category: { slug: { in: selectedSlugs } } }
      : {}),
    ...(selectedBrands.length > 0
      ? { brand: { in: selectedBrands } }
      : {}),
    ...(selectedColors.length > 0
      ? { color: { in: selectedColors } }
      : {}),
  };

  const [categories, brandRows, colorRows, products, totalCount] =
    await Promise.all([
      prisma.category.findMany({ orderBy: { name: "asc" } }),
      prisma.product.findMany({
        where: { brand: { not: null } },
        distinct: ["brand"],
        select: { brand: true },
        orderBy: { brand: "asc" },
      }),
      prisma.product.findMany({
        where: { color: { not: null } },
        distinct: ["color"],
        select: { color: true },
        orderBy: { color: "asc" },
      }),
      prisma.product.findMany({
        where: productWhere,
        orderBy: getOrderBy(sort),
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        include: {
          category: true,
          images: { orderBy: { position: "asc" }, take: 1 },
        },
      }),
      prisma.product.count({ where: productWhere }),
    ]);

  const brands = brandRows
    .map((row) => row.brand)
    .filter((brand): brand is string => Boolean(brand));
  const colors = colorRows
    .map((row) => row.color)
    .filter((color): color is string => Boolean(color));

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <main className="mx-auto max-w-7xl bg-white px-6 py-10 text-black">
      <Breadcrumb />

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr]">
        <FilterSidebar
          categories={categories.map((category) => ({
            slug: category.slug,
            name: category.name,
          }))}
          brands={brands}
          colors={colors}
          selectedSlugs={selectedSlugs}
          selectedBrands={selectedBrands}
          selectedColors={selectedColors}
          maxPrice={maxPrice}
        />

        <div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-black/60">
              {totalCount === 0
                ? "No products found"
                : `Showing ${(page - 1) * PAGE_SIZE + 1}-${Math.min(
                    page * PAGE_SIZE,
                    totalCount
                  )} of ${totalCount} products`}
            </p>

            <SortAndView sort={sort} view={view} />
          </div>

          <div className="mt-6 border-t border-black/10" />

          {products.length === 0 ? (
            <EmptyState />
          ) : (
            <div
              className={
                view === "grid"
                  ? "mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
                  : "mt-8 flex flex-col gap-5"
              }
            >
              {products.map((product) =>
                view === "grid" ? (
                  <ProductCard key={product.id} product={product} />
                ) : (
                  <ProductRow key={product.id} product={product} />
                )
              )}
            </div>
          )}

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            baseParams={params}
          />
        </div>
      </div>
    </main>
  );
}

function getOrderBy(sort: string) {
  switch (sort) {
    case "price-asc":
      return { price: "asc" as const };
    case "price-desc":
      return { price: "desc" as const };
    case "newest":
      return { createdAt: "desc" as const };
    case "rating":
      return { rating: "desc" as const };
    default:
      return { createdAt: "desc" as const };
  }
}

function Breadcrumb() {
  return (
    <div>
      <nav className="flex items-center gap-2 text-sm text-black/60">
        <Link href="/" className="hover:text-black">
          Home
        </Link>
        <span>&gt;</span>
        <span className="text-black">All Products</span>
      </nav>
      <h1 className="mt-3 text-4xl font-extrabold text-black">
        All Products
      </h1>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mt-16 rounded-xl border border-dashed border-black/15 py-16 text-center">
      <p className="text-sm font-medium text-black">
        No products match these filters.
      </p>
      <p className="mt-1 text-sm text-black/60">
        Try widening your price range or clearing a category.
      </p>
    </div>
  );
}

type ProductWithRelations = {
  id: string;
  slug: string;
  name: string;
  price: number;
  brand: string | null;
  color: string | null;
  rating: number | null;
  stock: number;
  createdAt: Date;
  category: { name: string };
  images: { url: string; alt: string | null }[];
};

function isNewProduct(createdAt: Date) {
  const fourteenDaysMs = 14 * 24 * 60 * 60 * 1000;
  return Date.now() - createdAt.getTime() < fourteenDaysMs;
}

function ProductCard({ product }: { product: ProductWithRelations }) {
  const image = product.images[0];
  const soldOut = product.stock === 0;
  const badge = soldOut ? "SOLD OUT" : isNewProduct(product.createdAt) ? "NEW" : null;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-black/5">
        {badge && (
          <span
            className={`absolute left-3 top-3 z-10 rounded-md px-2.5 py-1 text-xs font-semibold ${
              badge === "NEW" ? "bg-black text-white" : "bg-rose-600 text-white"
            }`}
          >
            {badge}
          </span>
        )}

        <button
          type="button"
          aria-label="Save to wishlist"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-black/50 transition hover:text-rose-500"
        >
          <HeartIcon />
        </button>

        {image ? (
          <Image
            src={image.url}
            alt={image.alt ?? product.name}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
            sizes="(min-width: 1024px) 270px, 45vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-black/40">
            No image
          </div>
        )}

        {soldOut && <div className="absolute inset-0 bg-white/50" />}

        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black py-3 text-center text-sm font-semibold text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
          Quick Add
        </div>
      </div>

      <p className="mt-4 text-xs font-semibold tracking-wide text-black/60">
        {product.category.name.toUpperCase()}
      </p>
      <h3 className="mt-1 text-base font-semibold text-black">
        {product.name}
      </h3>
      <div className="mt-1 flex items-center justify-between">
        <span className="text-sm text-black/80">${product.price}</span>
        <span className="flex items-center gap-1 text-xs text-black/60">
          <StarIcon /> {(product.rating ?? 0).toFixed(1)}
        </span>
      </div>
    </Link>
  );
}

function ProductRow({ product }: { product: ProductWithRelations }) {
  const image = product.images[0];

  return (
    <Link
  href={`/products/${product.slug}`}
  className="flex items-center gap-5 rounded-xl border border-black/10 p-3 transition hover:border-black/30"
>
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-black/5">
        {image && (
          <Image
            src={image.url}
            alt={image.alt ?? product.name}
            fill
            className="object-cover"
            sizes="96px"
          />
        )}
      </div>
      <div className="flex-1">
        <p className="text-xs font-semibold tracking-wide text-black/60">
          {product.category.name.toUpperCase()}
        </p>
        <h3 className="mt-1 text-base font-semibold text-black">
          {product.name}
        </h3>
      </div>
      <div className="text-right">
        <p className="text-sm text-black/80">${product.price}</p>
        <p className="mt-1 flex items-center justify-end gap-1 text-xs text-black/60">
          <StarIcon /> {(product.rating ?? 0).toFixed(1)}
        </p>
      </div>
    </Link>
  );
}

function Pagination({
  currentPage,
  totalPages,
  baseParams,
}: {
  currentPage: number;
  totalPages: number;
  baseParams: SearchParams;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1);

  function pageHref(page: number) {
    const query = new URLSearchParams();
    if (baseParams.category) query.set("category", baseParams.category);
    if (baseParams.brand) query.set("brand", baseParams.brand);
    if (baseParams.color) query.set("color", baseParams.color);
    if (baseParams.maxPrice) query.set("maxPrice", baseParams.maxPrice);
    if (baseParams.sort) query.set("sort", baseParams.sort);
    if (baseParams.view) query.set("view", baseParams.view);
    query.set("page", String(page));
    return `?${query.toString()}`;
  }

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      <Link
        href={pageHref(Math.max(1, currentPage - 1))}
        aria-label="Previous page"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/15 text-black/60 transition hover:border-black/40"
      >
        &lsaquo;
      </Link>

      {pages.map((page) => (
        <Link
          key={page}
          href={pageHref(page)}
          className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition ${
            currentPage === page
              ? "bg-black text-white"
              : "border border-black/15 text-black/80 hover:border-black/40"
          }`}
        >
          {page}
        </Link>
      ))}

      {totalPages > 3 && <span className="px-1 text-black/40">...</span>}

      <Link
        href={pageHref(Math.min(totalPages, currentPage + 1))}
        aria-label="Next page"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/15 text-black/60 transition hover:border-black/40"
      >
        &rsaquo;
      </Link>
    </div>
  );
}

function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  );
}