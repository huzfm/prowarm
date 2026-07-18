"use client";

import { useEffect, useRef } from "react";
import {
  DeckCard,
  type StackedProduct,
} from "@/components/products/stacked-product-reveal";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/** Scale a card rests at before its zoom phase grows it to full size. */
const CARD_IN_SCALE = 0.82;
/** Depth the incoming card starts at / the outgoing card retreats to, in px. */
const DEPTH = 520;

// Each product owns three phases of scroll: it grows in, turns a full 360°,
// then hands over to the next one.
const ZOOM_PHASE = 1;
const SPIN_PHASE = 1.6;
const HANDOFF_PHASE = 0.8;
const SEGMENT = ZOOM_PHASE + SPIN_PHASE + HANDOFF_PHASE;

/** Scroll distance per product, as a multiple of viewport height. */
const SCROLL_PER_CARD = 1.1;

/**
 * Scroll-driven 3D product turntable. Each card zooms up to full size, rotates
 * a full 360° on its vertical axis, then recedes as the next card comes
 * forward out of depth.
 *
 * Falls back to a plain static stack when the user prefers reduced motion.
 */
export function Product360Reveal({
  products,
  className,
}: {
  products: StackedProduct[];
  className?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduced = usePrefersReducedMotion();

  const deckKey = products.map((p) => p.slug).join("|");

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    // Dev double-invoke of effects can leave a previous timeline attached to
    // this same section. Two live timelines both driving rotationY is what
    // makes the card appear to turn more than once — clear any first.
    ScrollTrigger.getAll()
      .filter((t) => t.trigger === section)
      .forEach((t) => t.kill());
    gsap.killTweensOf(cards);

    const ctx = gsap.context(() => {
      // Only the first card is present at rest; the others wait back in depth.
      cards.forEach((card, i) => {
        gsap.set(card, {
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
          zIndex: cards.length - i,
          scale: i === 0 ? CARD_IN_SCALE : CARD_IN_SCALE * 0.9,
          rotationY: 0,
          z: i === 0 ? 0 : -DEPTH,
          autoAlpha: i === 0 ? 1 : 0,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () =>
            `+=${window.innerHeight * SCROLL_PER_CARD * SEGMENT * cards.length}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, i) => {
        const start = i * SEGMENT;

        // Phase 1 — grow into full size.
        tl.to(
          card,
          { scale: 1, duration: ZOOM_PHASE, ease: "none" },
          start,
        );

        // Phase 2 — exactly one turn on the vertical axis. fromTo pins both
        // ends absolutely: a relative tween would compound on rebuild and spin
        // the card twice. The card has a back face, so the reverse of the turn
        // shows a branded panel rather than mirrored text.
        tl.fromTo(
          card,
          { rotationY: 0 },
          {
            rotationY: 360,
            duration: SPIN_PHASE,
            ease: "none",
          },
          start + ZOOM_PHASE,
        );

        // Phase 3 — recede, and bring the next card forward out of depth.
        const handoffAt = start + ZOOM_PHASE + SPIN_PHASE;
        const next = cards[i + 1];
        if (!next) return;

        tl.to(
          card,
          {
            z: -DEPTH,
            scale: CARD_IN_SCALE * 0.9,
            autoAlpha: 0,
            duration: HANDOFF_PHASE,
            ease: "none",
          },
          handoffAt,
        ).to(
          next,
          {
            z: 0,
            scale: CARD_IN_SCALE,
            autoAlpha: 1,
            duration: HANDOFF_PHASE,
            ease: "none",
          },
          handoffAt,
        );
      });
    }, section);

    // Card images load late; re-measure so the pin bounds aren't stale.
    let cancelled = false;
    const images = Array.from(section.querySelectorAll("img"));
    const pending = images.filter((img) => !img.complete);
    const onSettled = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };
    pending.forEach((img) => {
      img.addEventListener("load", onSettled, { once: true });
      img.addEventListener("error", onSettled, { once: true });
    });
    if (pending.length === 0) ScrollTrigger.refresh();

    return () => {
      cancelled = true;
      pending.forEach((img) => {
        img.removeEventListener("load", onSettled);
        img.removeEventListener("error", onSettled);
      });
      ctx.revert();
    };
  }, [reduced, deckKey]);

  // ---- Reduced motion: plain vertical stack, no pin, no 3D ----
  if (reduced) {
    return (
      <div className={className}>
        <div className="container-site space-y-8">
          {products.map((product) => (
            <DeckCard key={product.slug} product={product} static />
          ))}
        </div>
      </div>
    );
  }

  return (
    // Stable wrapper React owns — ScrollTrigger reparents the pinned <section>
    // into a pin-spacer, so React must never remove that node itself.
    <div className={className}>
      <section ref={sectionRef} className="relative">
        <div
          className="relative left-1/2 flex h-svh w-screen -translate-x-1/2 items-center justify-center overflow-hidden"
          // Perspective on the stage is what makes the turn read as depth
          // rather than a flat horizontal squash.
          style={{ perspective: "1600px" }}
        >
          {products.map((product, i) => (
            <div
              key={product.slug}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute h-[min(78svh,42rem)] w-[min(92vw,64rem)] will-change-transform [transform-style:preserve-3d]"
            >
              {/* Front face */}
              <div className="h-full [backface-visibility:hidden]">
                <DeckCard product={product} />
              </div>

              {/* Back face — seen through the middle of the turn. */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-card bg-charcoal-900 text-center ring-1 ring-white/10 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <p className="text-xs uppercase tracking-[0.2em] text-copper-400">
                  {product.spec.label}
                </p>
                <p className="font-display text-4xl text-cream-50">
                  {product.spec.value}
                </p>
                <p className="max-w-md text-charcoal-300">{product.tagline}</p>
                <p className="font-display text-xl text-copper-300">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
