"use client";

import { SearchX } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { StackedProductReveal } from "@/components/products/stacked-product-reveal";
import { toStackedProduct } from "@/lib/product-deck";
import { categories, type Product, type ProductCategory } from "@/lib/products";
import { cn } from "@/lib/utils";

type SortKey = "featured" | "price-asc" | "price-desc" | "name";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name A–Z" },
];

export function ProductExplorer({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<ProductCategory | "all">(() => {
    const initial = searchParams.get("category");
    return categories.some((c) => c.value === initial)
      ? (initial as ProductCategory)
      : "all";
  });
  const [sort, setSort] = useState<SortKey>("featured");

  const visible = useMemo(() => {
    const filtered =
      category === "all" ? products : products.filter((p) => p.category === category);
    return [...filtered].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.priceValue - b.priceValue;
        case "price-desc":
          return b.priceValue - a.priceValue;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return Number(b.featured ?? false) - Number(a.featured ?? false);
      }
    });
  }, [products, category, sort]);

  return (
    <div>
      <div className="sticky top-20 z-30 -mx-4 rounded-card border border-charcoal-900/8 bg-cream-100/80 px-4 py-4 shadow-[0_8px_24px_-16px_rgb(26_26_26/0.25)] backdrop-blur-xl md:top-24 md:mx-0 md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Category filter pills */}
          <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                aria-pressed={category === c.value}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300",
                  category === c.value
                    ? "border-charcoal-900 bg-charcoal-900 text-white"
                    : "border-charcoal-900/15 bg-white text-charcoal-600 hover:border-charcoal-900/40 hover:text-charcoal-900"
                )}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <label htmlFor="product-sort" className="text-sm text-charcoal-500">
              Sort
            </label>
            <select
              id="product-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-10 cursor-pointer rounded-field border border-charcoal-900/15 bg-white px-3 text-sm text-charcoal-800 focus:border-copper-500 focus:outline-none"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <p className="mt-8 text-sm text-charcoal-400" aria-live="polite">
        Showing <span className="font-semibold text-charcoal-700">{visible.length}</span> of{" "}
        {products.length} products
      </p>

      {/*
        The filtered range as a scroll-driven curtain deck. It rebuilds its own
        timeline when the visible set changes — deliberately not keyed, since
        remounting a pinned section mid-animation detaches the pin-spacer that
        ScrollTrigger wrapped around it and breaks React's DOM removal.
      */}
      {visible.length > 0 && (
        <StackedProductReveal
          products={visible.map(toStackedProduct)}
          className="relative mt-6"
        />
      )}

      {visible.length === 0 && (
        <div className="mt-16 flex flex-col items-center text-center">
          <SearchX className="size-10 text-charcoal-300" aria-hidden />
          <p className="mt-4 font-display text-xl text-charcoal-700">
            Nothing in this category yet
          </p>
        </div>
      )}
    </div>
  );
}
