"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { TocEntry } from "@/lib/blog";

/** Table of contents with scroll-spy highlighting. */
export function Toc({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const headings = entries
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (obsEntries) => {
        for (const entry of obsEntries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length < 2) return null;

  return (
    <nav aria-label="Table of contents">
      <p className="text-eyebrow text-charcoal-400">On this page</p>
      <ul className="mt-4 space-y-2.5 border-l border-charcoal-900/10">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              className={cn(
                "-ml-px block border-l-2 py-0.5 text-sm leading-snug transition-colors",
                entry.level === 3 ? "pl-7" : "pl-4",
                activeId === entry.id
                  ? "border-copper-500 font-medium text-copper-700"
                  : "border-transparent text-charcoal-500 hover:text-charcoal-900"
              )}
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
