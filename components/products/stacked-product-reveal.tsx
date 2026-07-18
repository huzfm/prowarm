"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export interface StackedProduct {
  slug: string;
  name: string;
  tagline: string;
  /** The single headline spec shown on the card, e.g. "200 W/m²". */
  spec: { label: string; value: string };
  price: string;
  image: { src: string; alt: string };
}

/**
 * Each card gets this much scroll distance (as a multiple of viewport height).
 * Higher = the card's phases are spread over more scrolling, so the animation
 * reads slower for the same flick of the wheel.
 */
const SCROLL_PER_CARD = 1.5;
/**
 * Seconds the animation takes to catch up to the scrollbar. `true` would snap
 * to the scroll position exactly and feel twitchy; a number eases the playhead
 * toward it, which is what makes the motion feel smooth.
 */
const SCRUB_SMOOTHING = 1.2;
/** How much smaller each card sits behind the one in front of it. */
const SCALE_STEP = 0.045;
/** Vertical peek of each card's edge from behind the one in front, in px. */
const PEEK_STEP = 18;
/**
 * A card arrives in the front position at CARD_IN_SCALE and grows to
 * ACTIVE_ZOOM across its zoom phase. The gap between the two is what makes the
 * zoom legible — keep it wide enough to read as deliberate growth.
 */
const CARD_IN_SCALE = 0.84;
const ACTIVE_ZOOM = 1;

// Each card owns a two-phase segment of the scroll: it zooms in slowly while
// it is the active card, then peels away to hand over to the one beneath.
const ZOOM_PHASE = 1.2;
const PEEL_PHASE = 1;
const SEGMENT = ZOOM_PHASE + PEEL_PHASE;

/**
 * Scroll-driven deck of product cards. The section pins, and each card in turn
 * peels upward while a clip-path sweep uncovers the card beneath it.
 *
 * Falls back to a plain static stack when the user prefers reduced motion.
 */
export function StackedProductReveal({
  products,
  className,
}: {
  products: StackedProduct[];
  className?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduced = usePrefersReducedMotion();

  // Identity of the current deck. Filtering or sorting changes this, which
  // rebuilds the timeline in place — no remount, so the pinned section is
  // never torn out from under ScrollTrigger.
  const deckKey = products.map((p) => p.slug).join("|");

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length < 2) return;

    const panelsOf = (card: HTMLDivElement) =>
      card.querySelectorAll("[data-curtain-panel]");

    const ctx = gsap.context(() => {
      // Resting state of the deck: each card slightly smaller and nudged down,
      // so a thin edge of every card peeks out from behind the one in front.
      cards.forEach((card, i) => {
        gsap.set(card, {
          zIndex: cards.length - i,
          scale: CARD_IN_SCALE - i * SCALE_STEP,
          y: i * PEEK_STEP,
          // Every card starts unclipped; the peel is what introduces the sweep.
          clipPath: "inset(0% 0% 0% 0%)",
          transformOrigin: "center center",
        });
        // Reset the corner radius too, so a rebuilt timeline (filter change)
        // doesn't inherit the squared-off corners from the previous run.
        gsap.set(card.firstElementChild, { borderRadius: "1.25rem" });

        // Only the front card starts uncovered; every card behind stays
        // curtained until the peel above it draws its panels back.
        gsap.set(panelsOf(card), {
          yPercent: i === 0 ? -100 : 0,
          transformOrigin: "top center",
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () =>
            `+=${window.innerHeight * SCROLL_PER_CARD * SEGMENT * (cards.length - 1)}`,
          pin: true,
          scrub: SCRUB_SMOOTHING,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, i) => {
        const segmentStart = i * SEGMENT;

        // Phase 1 — the active card zooms in slowly as it holds the viewport,
        // squaring off its corners as it reaches true full-bleed.
        tl.to(
          card,
          { scale: ACTIVE_ZOOM, duration: ZOOM_PHASE, ease: "none" },
          segmentStart,
        ).to(
          card.firstElementChild,
          { borderRadius: 0, duration: ZOOM_PHASE, ease: "none" },
          segmentStart,
        );

        // The last card has no peel; its zoom is the final beat of the section.
        if (i === cards.length - 1) return;

        const next = cards[i + 1];
        const peelAt = segmentStart + ZOOM_PHASE;

        // Phase 2 — the zoomed card peels away and uncovers the next one.
        tl.to(
          card,
          {
            yPercent: -108,
            // Curtain sweep: the card erases itself from the bottom edge up
            // in step with its exit, so the card beneath is uncovered
            // continuously rather than being snapped into view.
            clipPath: "inset(0% 0% 100% 0%)",
            duration: PEEL_PHASE,
            ease: "none",
          },
          peelAt,
        )
          .to(
            card,
            { scale: 0.94, duration: PEEL_PHASE, ease: "none" },
            peelAt,
          )
          // The card underneath moves into the front position as the peel
          // clears — landing at CARD_IN_SCALE, so its own zoom phase has the
          // full range to grow through rather than starting already at size.
          .to(
            next,
            {
              scale: CARD_IN_SCALE,
              y: 0,
              duration: PEEL_PHASE,
              ease: "none",
            },
            peelAt,
          )
          // The curtain over the incoming card lifts panel by panel. The
          // stagger is budgeted inside PEEL_PHASE so the last panel clears
          // before the next card's zoom phase begins.
          .to(
            panelsOf(next),
            {
              yPercent: -100,
              duration: PEEL_PHASE * 0.65,
              ease: "none",
              stagger: { each: PEEL_PHASE * 0.07, from: "start" },
            },
            peelAt,
          );

        // Cards further back creep forward one step in the deck.
        cards.slice(i + 2).forEach((behind, j) => {
          tl.to(
            behind,
            {
              scale: CARD_IN_SCALE - (j + 1) * SCALE_STEP,
              y: (j + 1) * PEEK_STEP,
              duration: PEEL_PHASE,
              ease: "none",
            },
            peelAt,
          );
        });
      });
    }, section);

    // The cards are full-viewport images inside a Suspense boundary, so the
    // pin distance is measured before they load. Re-measure once each image
    // settles, otherwise the trigger keeps stale bounds and never scrubs.
    const images = Array.from(section.querySelectorAll("img"));
    const pending = images.filter((img) => !img.complete);
    // Guarded: a late image load must not refresh triggers after this effect
    // has torn down, which would rebuild pin spacers React no longer expects.
    let cancelled = false;
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

  // ---- Reduced motion: plain vertical stack, no pin, no clip-path ----
  if (reduced) {
    return (
      <section className={className}>
        <div className="container-site space-y-8">
          {products.map((product) => (
            <DeckCard key={product.slug} product={product} static />
          ))}
        </div>
      </section>
    );
  }

  return (
    // The outer wrapper is React's. ScrollTrigger's pin reparents the <section>
    // into a pin-spacer, so React must never be the one removing that node —
    // on unmount it removes this div, whose own parent GSAP never touches.
    <div className={className}>
      <section ref={sectionRef} className="relative">
      {/*
        The stage is the full pinned viewport, and every card fills it. Cards
        rest at CARD_IN_SCALE so they read as inset, then zoom to exactly 1 —
        full width and height — before peeling away.
      */}
        <div className="relative left-1/2 h-svh w-screen -translate-x-1/2 overflow-hidden">
          {products.map((product, i) => (
            <div
              key={product.slug}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute inset-0 will-change-transform"
            >
              <DeckCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function DeckCard({
  product,
  static: isStatic = false,
}: {
  product: StackedProduct;
  static?: boolean;
}) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.995 }}
      transition={{ type: "spring", stiffness: 320, damping: 30 }}
      className={`relative grid overflow-hidden rounded-card bg-charcoal-900 shadow-card-hover ring-1 ring-white/10 md:grid-cols-2 ${
        isStatic ? "" : "h-full"
      }`}
    >
      {/*
        Curtain panels. They sit over the whole card and are lifted away in a
        staggered sweep as the card takes the front position, so the next
        product is drawn back into view rather than simply appearing.
      */}
      {!isStatic && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 flex"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              data-curtain-panel
              // Parked off-card by default. GSAP drops the curtain into place
              // for the cards that need it, so if the animation never runs the
              // card is simply visible rather than hidden behind black panels.
              className="h-full flex-1 -translate-y-full bg-charcoal-950"
            />
          ))}
        </div>
      )}

      <div className="relative min-h-56 md:min-h-full">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          priority={!isStatic}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 to-transparent md:bg-gradient-to-r" />
      </div>

      <div className="flex flex-col justify-center gap-6 p-8 md:p-12">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-copper-400">
            {product.spec.label}
          </p>
          <p className="mt-1 font-display text-2xl text-cream-100">
            {product.spec.value}
          </p>
        </div>

        <div>
          <h3 className="font-display text-3xl leading-tight text-cream-50 md:text-4xl">
            {product.name}
          </h3>
          <p className="mt-3 max-w-prose text-charcoal-300">{product.tagline}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <span className="font-display text-xl text-copper-300">
            {product.price}
          </span>
          <Link
            href={`/products/${product.slug}`}
            className="rounded-field bg-copper-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-copper-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper-300"
          >
            View details
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
