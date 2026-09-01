import Link from "next/link";
import type { ProductWithRelations } from "@/types/product";

type ProductCardProps = {
  product: ProductWithRelations;
};

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images[0]?.url ?? "/images/placeholder.jpg";

  return (
    <article className="group">
      <Link href={`/products/${product.slug}`}>
        <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
          <img
            src={imageUrl}
            alt={product.images[0]?.alt ?? product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="mt-4">
          <h2 className="text-base font-medium text-gray-900">
            {product.name}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {product.category.name}
          </p>

          <p className="mt-2 text-base font-semibold text-gray-900">
            ₹{product.price.toLocaleString("en-IN")}
          </p>
        </div>
      </Link>
    </article>
  );
}