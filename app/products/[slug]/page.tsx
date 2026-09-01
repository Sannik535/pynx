import { notFound } from "next/navigation";
import Link from "next/link";

import { getProductBySlug } from "@/lib/products";
import { ProductDetailClient } from "./ProductDetailClient";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl bg-background px-6 py-8 text-foreground">
      <nav className="flex items-center gap-2 text-sm text-foreground/60">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span>&gt;</span>
        <Link href="/shop" className="hover:text-foreground">
          Shop
        </Link>
        <span>&gt;</span>
        <Link
          href={`/category?category=${product.category.slug}`}
          className="hover:text-foreground"
        >
          {product.category.name}
        </Link>
        <span>&gt;</span>
        <span className="font-medium text-foreground">{product.name}</span>
      </nav>

      <div className="mt-6">
        <ProductDetailClient product={product} />
      </div>
    </main>
  );
}