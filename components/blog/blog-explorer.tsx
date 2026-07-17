"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Search, SearchX } from "lucide-react";
import { useMemo, useState } from "react";
import { PostCard } from "@/components/blog/post-card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { PostMeta } from "@/lib/blog";

const PAGE_SIZE = 6;

export function BlogExplorer({
  posts,
  categories,
}: {
  posts: PostMeta[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const inCategory = category === "all" || post.category === category;
      const inQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));
      return inCategory && inQuery;
    });
  }, [posts, query, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pagePosts = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function update(fn: () => void) {
    fn();
    setPage(1);
  }

  return (
    <div>
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {["all", ...categories].map((c) => (
            <button
              key={c}
              onClick={() => update(() => setCategory(c))}
              aria-pressed={category === c}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium capitalize transition-colors duration-300",
                category === c
                  ? "border-charcoal-900 bg-charcoal-900 text-white"
                  : "border-charcoal-900/15 bg-white text-charcoal-600 hover:border-charcoal-900/40 hover:text-charcoal-900"
              )}
            >
              {c === "all" ? "All topics" : c}
            </button>
          ))}
        </div>

        <div className="relative md:w-72">
          <Search
            className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-charcoal-400"
            aria-hidden
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => update(() => setQuery(e.target.value))}
            placeholder="Search articles…"
            aria-label="Search articles"
            className="pl-11"
          />
        </div>
      </div>

      <p className="mt-6 text-sm text-charcoal-400" aria-live="polite">
        {filtered.length} article{filtered.length === 1 ? "" : "s"}
        {category !== "all" && ` in ${category}`}
        {query && ` matching “${query}”`}
      </p>

      <motion.ul layout className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {pagePosts.map((post) => (
            <motion.li
              layout
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <PostCard post={post} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {filtered.length === 0 && (
        <div className="mt-16 flex flex-col items-center text-center">
          <SearchX className="size-10 text-charcoal-300" aria-hidden />
          <p className="mt-4 font-display text-xl text-charcoal-700">No articles found</p>
          <p className="mt-2 text-sm text-charcoal-500">
            Try a different search, or browse all topics.
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <nav aria-label="Blog pages" className="mt-14 flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            aria-label="Previous page"
            className="grid size-11 cursor-pointer place-items-center rounded-full border border-charcoal-900/15 text-charcoal-600 transition-colors hover:border-copper-500 hover:text-copper-600 disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowLeft className="size-4.5" aria-hidden />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              aria-label={`Page ${n}`}
              aria-current={n === safePage ? "page" : undefined}
              className={cn(
                "grid size-11 cursor-pointer place-items-center rounded-full text-sm font-medium transition-colors",
                n === safePage
                  ? "bg-charcoal-900 text-white"
                  : "text-charcoal-600 hover:bg-charcoal-900/5"
              )}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            aria-label="Next page"
            className="grid size-11 cursor-pointer place-items-center rounded-full border border-charcoal-900/15 text-charcoal-600 transition-colors hover:border-copper-500 hover:text-copper-600 disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowRight className="size-4.5" aria-hidden />
          </button>
        </nav>
      )}
    </div>
  );
}
