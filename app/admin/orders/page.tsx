// app/admin/orders/page.tsx
export default function AdminOrdersPage() {
  return (
    <main className="px-8 py-8">
      <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
      <div className="mt-6 rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
        <p className="text-sm font-medium text-gray-700">
          No order data yet
        </p>
        <p className="mt-1 text-sm text-gray-500">
          This needs an Order model and a checkout flow before it can show
          real orders. Not built yet.
        </p>
      </div>
    </main>
  );
}