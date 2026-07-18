"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export interface Milestone {
  year: string;
  text: string;
}

/**
 * The journey as a horizontally scrolling track. Vertical scroll is pinned and
 * translated into sideways travel, so the years read left-to-right the way a
 * timeline should.
 *
 * Falls back to a plain vertical list when the user prefers reduced motion.
 */
export function JourneyTrack({
  milestones,
  className,
}: {
  milestones: Milestone[];
  className?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Clear anything left attached to this section before rebuilding, so a
    // second timeline can never drive the same track alongside the first.
    ScrollTrigger.getAll()
      .filter((t) => t.trigger === section)
      .forEach((t) => t.kill());

    const ctx = gsap.context(() => {
      // Travel is measured, not guessed — recomputed on every refresh so it
      // survives resizes and late-loading content.
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // The container tween must be linear — anything else desynchronises the
      // track from the scrollbar.
      tl.to(track, { x: () => -distance(), ease: "none" }, 0);

      if (progressRef.current) {
        tl.fromTo(
          progressRef.current,
          { scaleX: 0 },
          { scaleX: 1, ease: "none" },
          0,
        );
      }
    }, section);

    return () => ctx.revert();
  }, [reduced, milestones.length]);

  // ---- Reduced motion: plain vertical list, no pin, no horizontal travel ----
  if (reduced) {
    return (
      <div className={className}>
        <ol className="container-site mx-auto max-w-2xl space-y-12">
          {milestones.map((m) => (
            <li key={m.year}>
              <p className="font-display text-2xl text-copper-600">{m.year}</p>
              <p className="mt-2 leading-relaxed text-charcoal-600">{m.text}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    // Stable wrapper React owns — ScrollTrigger reparents the pinned <section>
    // into a pin-spacer, so React must never remove that node itself.
    <div className={className}>
      <section ref={sectionRef} className="relative">
        <div className="relative left-1/2 flex h-svh w-screen -translate-x-1/2 flex-col justify-center overflow-hidden">
          {/* Rail the cards travel along, with a scrub-linked progress fill. */}
          <div aria-hidden className="relative mx-[8vw] h-px bg-charcoal-900/10">
            <span
              ref={progressRef}
              // Starts empty in CSS as well as in GSAP, so it never flashes
              // full before the timeline takes over.
              className="absolute inset-0 origin-left scale-x-0 bg-copper-500"
            />
          </div>

          <ol ref={trackRef} className="flex items-start gap-[6vw] pl-[8vw] will-change-transform">
            {milestones.map((m, i) => (
              <li
                key={m.year}
                className="w-[min(78vw,22rem)] shrink-0 pt-10"
              >
                <span
                  aria-hidden
                  className="mb-6 block size-3 -translate-y-[calc(2.5rem+6px)] rounded-full border-2 border-copper-500 bg-cream-100"
                />
                <p className="font-display text-5xl text-copper-600">{m.year}</p>
                <p className="mt-4 leading-relaxed text-charcoal-600">
                  {m.text}
                </p>
                <span className="mt-6 block text-xs uppercase tracking-[0.2em] text-charcoal-400">
                  {String(i + 1).padStart(2, "0")} / {String(milestones.length).padStart(2, "0")}
                </span>
              </li>
            ))}
            {/* Tail spacer so the last milestone can clear the right edge. */}
            <li aria-hidden className="w-[8vw] shrink-0" />
          </ol>
        </div>
      </section>
    </div>
  );
}
