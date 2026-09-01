// app/admin/analytics/page.tsx
export default function AdminAnalyticsPage() {
  return (
    <main className="px-8 py-8">
      <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
      <div className="mt-6 rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
        <p className="text-sm font-medium text-gray-700">
          No analytics data yet
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Sales and traffic analytics depend on Orders existing first. Not
          built yet.
        </p>
      </div>
    </main>
  );
}