// app/admin/settings/page.tsx
export default function AdminSettingsPage() {
  return (
    <main className="px-8 py-8">
      <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      <div className="mt-6 rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
        <p className="text-sm font-medium text-gray-700">
          Nothing to configure yet
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Store settings (currency, shipping, admin access) haven&apos;t been
          built yet.
        </p>
      </div>
    </main>
  );
}