// app/admin/products/new/page.tsx
import prisma from "@/prisma/db";
import Link from "next/link";
import { createProduct } from "@/lib/actions/create-product";

export default async function NewProductPage({
  searchParams,
}: {
  searchParams: { success?: string };
}) {
  const showSuccess = searchParams?.success === "1";
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Add New Product</h1>
      <p className="mt-1 text-sm text-gray-500">
        This writes directly to your database — the product will appear on{" "}
        <code>/products</code> immediately after saving.
      </p>

      {showSuccess && (
        <div className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
          Product added successfully. Add another below.
        </div>
      )}

      <form action={createProduct} className="mt-8 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name *
          </label>
          <input
            name="name"
            required
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black"
            placeholder="Sony WH-1000XM6"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            rows={3}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black"
            placeholder="Premium wireless noise-cancelling headphones."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price (₹) *
            </label>
            <input
              name="price"
              type="number"
              step="0.01"
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black"
              placeholder="39999"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Brand
            </label>
            <input
              name="brand"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black"
              placeholder="Sony"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              SKU *
            </label>
            <input
              name="sku"
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black"
              placeholder="SONY-XM6-001"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stock
            </label>
            <input
              name="stock"
              type="number"
              defaultValue={0}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rating (0–5)
            </label>
            <input
              name="rating"
              type="number"
              step="0.1"
              min={0}
              max={5}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black"
              placeholder="4.7"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category *
            </label>
            {categories.length === 0 ? (
              <p className="mt-1 text-xs text-amber-600">
                No categories yet.{" "}
                <Link href="/admin/categories" className="underline">
                  Add one first
                </Link>
                .
              </p>
            ) : (
              <select
                name="category"
                required
                defaultValue=""
                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-black"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            name="imageUrl"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black"
            placeholder="/images/sony-wh1000xm6.jpg"
          />
          <p className="mt-1 text-xs text-gray-400">
            Path to a file in <code>/public/images</code>, or a full image
            URL.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image Alt Text
          </label>
          <input
            name="imageAlt"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black"
            placeholder="Sony WH-1000XM6"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-black py-2.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          Add Product
        </button>
      </form>
    </main>
  );
}