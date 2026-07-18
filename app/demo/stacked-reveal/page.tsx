import type { Metadata } from "next";
import { StackedProductReveal } from "@/components/products/stacked-product-reveal";
import { getStackedDeck } from "@/lib/product-deck";

export const metadata: Metadata = {
  title: "Stacked reveal demo",
  robots: { index: false, follow: false },
};

/** Isolated harness for tuning the deck animation, away from the real page. */
export default function StackedRevealDemoPage() {
  return (
    <div className="bg-charcoal-950">
      <section className="container-site flex min-h-svh flex-col justify-center py-24">
        <p className="text-xs uppercase tracking-[0.2em] text-copper-400">
          The range
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.05] text-cream-50 md:text-7xl">
          Three ways to warm a floor.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-charcoal-300">
          Scroll to pull back each system in turn.
        </p>
      </section>

      <StackedProductReveal products={getStackedDeck()} className="relative" />

      <section className="container-site flex min-h-svh items-center justify-center py-24">
        <p className="text-charcoal-400">Normal scroll resumes here.</p>
      </section>
    </div>
  );
}
