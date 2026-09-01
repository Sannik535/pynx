// app/admin/products/page.tsx
import prisma from "@/prisma/db";
import Link from "next/link";
import { deleteProduct } from "@/lib/actions/delete-product";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true, images: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="px-8 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
          <p className="mt-1 text-sm text-gray-500">
            {products.length} product{products.length === 1 ? "" : "s"} total
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Add Product
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
        {products.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm text-gray-500">
              No products yet. Add your first one to get started.
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs font-medium tracking-wide text-gray-500">
                <th className="px-5 py-3">Product</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3">Stock</th>
                <th className="px-5 py-3">SKU</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-50 last:border-0"
                >
                  <td className="flex items-center gap-3 px-5 py-3">
                    <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      {product.images[0]?.url && (
                        <img
                          src={product.images[0].url}
                          alt={product.images[0].alt ?? product.name}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <span className="font-medium text-gray-900">
                      {product.name}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-500">
                    {product.category.name}
                  </td>
                  <td className="px-5 py-3 text-gray-900">
                    ₹{product.price.toLocaleString("en-IN")}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={
                        product.stock === 0
                          ? "text-red-600"
                          : product.stock < 5
                          ? "text-amber-600"
                          : "text-gray-900"
                      }
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-400">{product.sku}</td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="text-xs font-medium text-gray-400 hover:text-gray-900"
                      >
                        Edit
                      </Link>
                      <form action={deleteProduct}>
                        <input type="hidden" name="id" value={product.id} />
                        <button
                          type="submit"
                          className="text-xs font-medium text-gray-400 hover:text-red-600"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}