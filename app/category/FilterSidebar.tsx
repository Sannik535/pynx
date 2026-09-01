"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Category = { slug: string; name: string };

type FilterSidebarProps = {
  categories: Category[];
  brands: string[];
  colors: string[];
  selectedSlugs: string[];
  selectedBrands: string[];
  selectedColors: string[];
  maxPrice: number;
};

export function FilterSidebar({
  categories,
  brands,
  colors,
  selectedSlugs,
  selectedBrands,
  selectedColors,
  maxPrice,
}: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParam(key: string, values: string[] | null) {
    const params = new URLSearchParams(searchParams.toString());

    if (!values || values.length === 0) {
      params.delete(key);
    } else {
      params.set(key, values.join(","));
    }

    // any filter change resets pagination
    params.delete("page");

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function toggleCategory(slug: string) {
    const next = selectedSlugs.includes(slug)
      ? selectedSlugs.filter((s) => s !== slug)
      : [...selectedSlugs, slug];
    updateParam("category", next);
  }

  function setMaxPrice(value: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("maxPrice", String(value));
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <aside className="text-black">
      <FilterSection title="Products">
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <label
              key={category.slug}
              className="flex items-center gap-2 text-sm text-black/80"
            >
              <input
                type="checkbox"
                checked={selectedSlugs.includes(category.slug)}
                onChange={() => toggleCategory(category.slug)}
                className="h-4 w-4 rounded border-black/30 accent-black"
              />
              {category.name}
            </label>
          ))}
          {categories.length === 0 && (
            <p className="text-sm text-black/40">No categories</p>
          )}
        </div>
      </FilterSection>

      <FilterSection title="Brand">
        <SearchableMultiSelect
          placeholder="Search brands..."
          options={brands}
          selected={selectedBrands}
          onChange={(next) => updateParam("brand", next)}
        />
      </FilterSection>

      <FilterSection title="Colour">
        <SearchableMultiSelect
          placeholder="Search colours..."
          options={colors}
          selected={selectedColors}
          onChange={(next) => updateParam("color", next)}
        />
      </FilterSection>

      <FilterSection title="Price">
        <input
          type="range"
          min={0}
          max={10000}
          step={10}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-black"
        />
        <div className="mt-2 flex items-center justify-between text-xs text-black/60">
          <span>$0</span>
          <span>{maxPrice >= 10000 ? "$10000+" : `$${maxPrice}`}</span>
        </div>
      </FilterSection>
    </aside>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <h3 className="mb-3 text-sm font-semibold text-black">{title}</h3>
      {children}
    </div>
  );
}

function SearchableMultiSelect({
  options,
  selected,
  onChange,
  placeholder,
}: {
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(query.toLowerCase())
  );

  function toggleOption(option: string) {
    const next = selected.includes(option)
      ? selected.filter((o) => o !== option)
      : [...selected, option];
    onChange(next);
  }

  function removeOption(option: string) {
    onChange(selected.filter((o) => o !== option));
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-lg border border-black/20 px-3 py-2 text-left text-sm text-black/80 hover:border-black/40"
      >
        <span>
          {selected.length === 0
            ? placeholder.replace("Search ", "Select ").replace("...", "")
            : `${selected.length} selected`}
        </span>
        <span className="text-black/40">▾</span>
      </button>

      {selected.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {selected.map((option) => (
            <span
              key={option}
              className="flex items-center gap-1 rounded-full bg-black/5 px-2 py-1 text-xs text-black/80"
            >
              {option}
              <button
                type="button"
                onClick={() => removeOption(option)}
                aria-label={`Remove ${option}`}
                className="text-black/40 hover:text-black"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      )}

      {open && (
        <div className="absolute z-20 mt-1 w-full rounded-lg border border-black/15 bg-white shadow-lg">
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full border-b border-black/10 px-3 py-2 text-sm text-black outline-none placeholder:text-black/40"
          />
          <div className="max-h-56 overflow-y-auto py-1">
            {filteredOptions.length === 0 ? (
              <p className="px-3 py-2 text-sm text-black/40">No matches</p>
            ) : (
              filteredOptions.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-black/80 hover:bg-black/5"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(option)}
                    onChange={() => toggleOption(option)}
                    className="h-4 w-4 rounded border-black/30 accent-black"
                  />
                  {option}
                </label>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}