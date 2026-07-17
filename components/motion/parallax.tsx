"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Scroll-linked parallax. Wrap an oversized child (e.g. an image scaled
 * ~110%) inside an overflow-hidden parent and it drifts slower than the page.
 * `fromTop`  for heroes that start at the very top of the viewport.
 */
export function Parallax({
  children,
  className,
  amount = 12,
  fromTop = false,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  fromTop?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        el,
        { yPercent: fromTop ? 0 : -amount / 2 },
        {
          yPercent: fromTop ? amount : amount / 2,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: fromTop ? "top top" : "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
    return () => mm.revert();
  }, [amount, fromTop]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
