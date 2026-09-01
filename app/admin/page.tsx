// app/admin/page.tsx
import prisma from "@/prisma/db";
import Link from "next/link";
import { Package, Layers, Boxes, AlertTriangle } from "lucide-react";

export default async function AdminOverviewPage() {
  const [productCount, categoryCount, products] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.product.findMany({
      select: { price: true, stock: true },
    }),
  ]);

  const totalUnits = products.reduce((sum, p) => sum + p.stock, 0);
  const inventoryValue = products.reduce(
    (sum, p) => sum + p.price * p.stock,
    0
  );
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock < 5).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;

  const stats = [
    { label: "Products", value: productCount.toLocaleString(), icon: Package },
    { label: "Categories", value: categoryCount.toLocaleString(), icon: Layers },
    { label: "Units in stock", value: totalUnits.toLocaleString(), icon: Boxes },
    {
      label: "Low stock (< 5)",
      value: lowStockCount.toLocaleString(),
      icon: AlertTriangle,
    },
  ];

  return (
    <main className="px-8 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Dashboard Overview
        </h1>
        <Link
          href="/admin/products/new"
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Add Product
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-xl border border-gray-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium tracking-wide text-gray-500">
                {label}
              </span>
              <Icon size={16} className="text-gray-400" strokeWidth={1.75} />
            </div>
            <p className="mt-3 text-2xl font-semibold text-gray-900">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5">
        <p className="text-sm font-medium text-gray-500">
          Estimated inventory value
        </p>
        <p className="mt-2 text-3xl font-semibold text-gray-900">
          ₹{inventoryValue.toLocaleString("en-IN")}
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Sum of price × stock across all products.
        </p>
        {outOfStockCount > 0 && (
          <p className="mt-3 text-xs text-amber-600">
            {outOfStockCount} product{outOfStockCount > 1 ? "s are" : " is"}{" "}
            currently out of stock.
          </p>
        )}
      </div>

      <div className="mt-6 rounded-xl border border-dashed border-gray-300 bg-white p-6">
        <h2 className="text-sm font-semibold text-gray-900">
          Orders, Customers, and Analytics aren&apos;t connected yet
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Those sections need their own database models (Order, Customer) and
          checkout flow before they can show real data. Build those next when
          you&apos;re ready — for now this dashboard only reports what
          actually exists in your database: products and categories.
        </p>
      </div>
    </main>
  );
}