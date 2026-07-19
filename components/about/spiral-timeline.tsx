"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export interface Milestone {
  year: string;
  text: string;
}

// The Three.js scene is heavy, browser-only code — load it lazily on the
// client so it never blocks the initial page render.
const SpiralScene = dynamic(() => import("./spiral-scene"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center">
      <span className="size-10 animate-pulse rounded-full border-2 border-copper-500/40" />
    </div>
  ),
});

function supportsWebgl() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") || canvas.getContext("webgl"),
    );
  } catch {
    return false;
  }
}

/**
 * The journey as a 3D spiral staircase: milestones step upward around a
 * central pole, and scrolling rotates the whole helix one full turn while it
 * sinks, so each year climbs into view facing the camera.
 *
 * The section pins for the duration; scroll progress is written to a ref and
 * the scene renders on demand (no free-running render loop). Falls back to a
 * plain vertical list when the user prefers reduced motion or WebGL is
 * unavailable.
 */
export function SpiralTimeline({
  milestones,
  className,
}: {
  milestones: Milestone[];
  className?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef(0);
  const invalidateRef = useRef<(() => void) | null>(null);
  const reduced = usePrefersReducedMotion();
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    setWebgl(supportsWebgl());
  }, []);

  // The scene calls this once mounted, handing us its on-demand render
  // trigger; keeping it behind a ref means no Three.js code in this bundle.
  const registerInvalidate = useCallback((fn: (() => void) | null) => {
    invalidateRef.current = fn;
    fn?.();
  }, []);

  const count = milestones.length;

  useEffect(() => {
    if (reduced || !webgl) return;
    const section = sectionRef.current;
    if (!section) return;

    // Clear anything left attached to this section before rebuilding, so a
    // second trigger can never drive the same spiral alongside the first.
    ScrollTrigger.getAll()
      .filter((t) => t.trigger === section)
      .forEach((t) => t.kill());

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=320%",
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          invalidateRef.current?.();
          if (counterRef.current) {
            const active = Math.round(self.progress * (count - 1)) + 1;
            counterRef.current.textContent = String(active).padStart(2, "0");
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reduced, webgl, count]);

  // ---- Fallback: plain vertical list, no 3D, no pin ----
  if (reduced || !webgl) {
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
      {/* The milestone copy inside the canvas overlay is decorative and
          scroll-gated; this list is the accessible source of truth. */}
      <ol className="sr-only">
        {milestones.map((m) => (
          <li key={m.year}>
            {m.year}: {m.text}
          </li>
        ))}
      </ol>

      <section ref={sectionRef} className="relative">
        <div aria-hidden className="relative h-svh w-full">
          <SpiralScene
            milestones={milestones}
            progressRef={progressRef}
            registerInvalidate={registerInvalidate}
          />

          {/* Milestone counter, updated imperatively from scroll progress. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center">
            <p className="text-xs uppercase tracking-[0.25em] text-charcoal-400">
              <span ref={counterRef}>01</span>
              {" / "}
              {String(count).padStart(2, "0")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
