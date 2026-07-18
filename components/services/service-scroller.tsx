"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export interface ScrollerService {
  id: string;
  /**
   * A rendered element, not a component type. Server Components can serialize
   * elements across the boundary but not functions, so the page passes
   * `<Icon />` rather than `Icon`.
   */
  icon: ReactNode;
  title: string;
  summary: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Services as a sticky split panel: the left side holds while the six services
 * scroll past on the right, cross-fading to whichever is currently centred.
 *
 * Deliberately unpinned — the hold is CSS `position: sticky`, and ScrollTrigger
 * is used only to report the active index. Nothing is reparented, so this
 * carries none of the pin-spacer/React teardown hazards.
 */
export function ServiceScroller({
  services,
  className,
}: {
  services: ScrollerService[];
  className?: string;
}) {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const items = itemRefs.current.filter(Boolean) as HTMLLIElement[];
    if (items.length === 0) return;

    // One trigger per service, reporting which is currently under the middle
    // of the viewport. No pinning, no scrubbed timeline — just state.
    const triggers = items.map((el, i) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) setActive(i);
        },
      }),
    );

    return () => triggers.forEach((t) => t.kill());
  }, [reduced, services.length]);

  const current = services[active] ?? services[0];

  return (
    <div className={className}>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Held panel — swaps to whichever service is centred. */}
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <div className="relative min-h-64">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <span className="grid size-14 place-items-center rounded-xl bg-copper-100 text-copper-600">
                  {current.icon}
                </span>
                <p className="mt-8 font-display text-[clamp(3.5rem,9vw,6rem)] leading-none text-copper-500/25">
                  {String(active + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-display text-3xl text-charcoal-900 md:text-4xl">
                  {current.title}
                </h3>
                <p className="mt-4 max-w-md leading-relaxed text-charcoal-600">
                  {current.summary}
                </p>
                <a
                  href={`#${current.id}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-copper-600 hover:text-copper-700"
                >
                  Read the detail
                  <ArrowRight className="size-4" aria-hidden />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress through the set. */}
          <div
            aria-hidden
            className="mt-10 flex gap-2"
          >
            {services.map((s, i) => (
              <span
                key={s.id}
                className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${
                  i <= active ? "bg-copper-500" : "bg-charcoal-900/10"
                }`}
              />
            ))}
          </div>
        </div>

        {/* The list that drives it. */}
        <ol className="space-y-4">
          {services.map((service, i) => (
            <li
              key={service.id}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              // Tall enough that each service gets a clear turn under the
              // centre line without the page becoming a forced sequence.
              className="flex min-h-[46svh] flex-col justify-center"
            >
              <a
                href={`#${service.id}`}
                data-active={i === active}
                className="group rounded-card border border-charcoal-900/8 bg-white/60 p-7 transition-all duration-500 ease-(--ease-out-quart) data-[active=false]:opacity-45 data-[active=true]:border-copper-200 data-[active=true]:bg-white data-[active=true]:shadow-card motion-reduce:transition-none"
              >
                <div className="flex items-center gap-4">
                  <span className="font-display text-sm text-copper-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="font-display text-xl text-charcoal-900">
                    {service.title}
                  </h4>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-500">
                  {service.summary}
                </p>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
