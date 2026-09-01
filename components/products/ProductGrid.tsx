import type { ProductWithRelations } from "@/types/product";
import ProductCard from "./ProductCard";

type ProductGridProps = {
  products: ProductWithRelations[];
};

export default function ProductGrid({
  products,
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}