import ProductGrid from "@/components/products/ProductGrid";
import { getAllProducts } from "@/lib/products";

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold">Shop</h1>
        <p className="mt-2 text-gray-500">Explore all PYNX products.</p>
      </div>

      <ProductGrid products={products} />
    </main>
  );
}