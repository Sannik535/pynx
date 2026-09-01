// app/admin/products/[id]/edit/page.tsx
import prisma from "@/prisma/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { updateProduct } from "@/lib/actions/update-product";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: { orderBy: { position: "asc" }, take: 1 },
      },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!product) {
    notFound();
  }

  const currentImage = product.images[0];

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Edit Product</h1>
      <p className="mt-1 text-sm text-gray-500">
        Updating <code>{product.name}</code>. Changes appear on{" "}
        <code>/products</code> immediately after saving.
      </p>

      <form action={updateProduct} className="mt-8 space-y-5">
        <input type="hidden" name="id" value={product.id} />

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name *
          </label>
          <input
            name="name"
            required
            defaultValue={product.name}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            rows={3}
            defaultValue={product.description ?? ""}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black"
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
              defaultValue={product.price}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Brand
            </label>
            <input
              name="brand"
              defaultValue={product.brand ?? ""}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black"
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
              defaultValue={product.sku}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stock
            </label>
            <input
              name="stock"
              type="number"
              defaultValue={product.stock}
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
              defaultValue={product.rating ?? ""}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category *
            </label>
            <select
              name="category"
              required
              defaultValue={product.category.name}
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-black"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            name="imageUrl"
            defaultValue={currentImage?.url ?? ""}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black"
            placeholder="/images/sony-wh1000xm6.jpg"
          />
          <p className="mt-1 text-xs text-gray-400">
            Path to a file in <code>/public/images</code>, or a full image
            URL. Leave unchanged to keep the current image.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image Alt Text
          </label>
          <input
            name="imageAlt"
            defaultValue={currentImage?.alt ?? ""}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 rounded-lg bg-black py-2.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            Save Changes
          </button>
          <Link
            href="/admin/products"
            className="flex items-center justify-center rounded-lg border border-gray-300 px-5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}