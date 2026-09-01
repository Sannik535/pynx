"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function SortAndView({
  sort,
  view,
}: {
  sort: string;
  view: "grid" | "list";
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-4">
      <label className="flex items-center gap-2 text-sm text-slate-500">
        Sort by:
        <select
          value={sort}
          onChange={(event) => updateParam("sort", event.target.value)}
          className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-800"
        >
          <option value="recommended">Recommended</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="newest">Newest</option>
          <option value="rating">Top Rated</option>
        </select>
      </label>

      <div className="flex overflow-hidden rounded-md border border-slate-200">
        <button
          type="button"
          aria-label="Grid view"
          onClick={() => updateParam("view", "grid")}
          className={`px-2.5 py-2 ${
            view === "grid" ? "bg-slate-900 text-white" : "text-slate-500"
          }`}
        >
          <GridIcon />
        </button>
        <button
          type="button"
          aria-label="List view"
          onClick={() => updateParam("view", "list")}
          className={`px-2.5 py-2 ${
            view === "list" ? "bg-slate-900 text-white" : "text-slate-500"
          }`}
        >
          <ListIcon />
        </button>
      </div>
    </div>
  );
}

function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}