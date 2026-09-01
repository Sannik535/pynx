// app/admin/categories/page.tsx
import prisma from "@/prisma/db";
import { createCategory } from "@/lib/actions/create-category";
import { deleteCategory } from "@/lib/actions/delete-category";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <main className="px-8 py-8">
      <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>
      <p className="mt-1 text-sm text-gray-500">
        {categories.length} categor{categories.length === 1 ? "y" : "ies"}{" "}
        total
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            {categories.length === 0 ? (
              <div className="p-10 text-center">
                <p className="text-sm text-gray-500">
                  No categories yet. Add one on the right.
                </p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left text-xs font-medium tracking-wide text-gray-500">
                    <th className="px-5 py-3">Name</th>
                    <th className="px-5 py-3">Slug</th>
                    <th className="px-5 py-3">Products</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr
                      key={category.id}
                      className="border-b border-gray-50 last:border-0"
                    >
                      <td className="px-5 py-3 font-medium text-gray-900">
                        {category.name}
                      </td>
                      <td className="px-5 py-3 text-gray-400">
                        {category.slug}
                      </td>
                      <td className="px-5 py-3 text-gray-500">
                        {category._count.products}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <form action={deleteCategory}>
                          <input
                            type="hidden"
                            name="id"
                            value={category.id}
                          />
                          <button
                            type="submit"
                            disabled={category._count.products > 0}
                            className="text-xs font-medium text-gray-400 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-gray-400"
                            title={
                              category._count.products > 0
                                ? "Move or delete its products first"
                                : "Delete category"
                            }
                          >
                            Delete
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-900">
            Add category
          </h2>
          <form action={createCategory} className="mt-4 space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600">
                Name *
              </label>
              <input
                name="name"
                required
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                placeholder="Accessories"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600">
                Description
              </label>
              <textarea
                name="description"
                rows={2}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                placeholder="Optional"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-gray-900 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Add Category
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}