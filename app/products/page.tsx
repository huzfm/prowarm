import { Check, Droplets, Minus, Zap } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { CtaBanner } from "@/components/cta-banner";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/page-hero";
import { ProductExplorer } from "@/components/products/product-explorer";
import { StackedProductReveal } from "@/components/products/stacked-product-reveal";
import { SectionHeading } from "@/components/section-heading";
import { getStackedDeck } from "@/lib/product-deck";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Electric heating mats, water-based systems, SenseWarm smart thermostats and insulation  the full ProWarm underfloor heating range with Indian pricing.",
};

const heroStats = [
  { value: "10", label: "Complete systems" },
  { value: "5", label: "Floor finishes covered" },
  { value: "10–25 yr", label: "Warranty as standard" },
];

type Winner = "electric" | "hydronic" | "both";

const comparison: {
  label: string;
  electric: string;
  hydronic: string;
  winner: Winner;
}[] = [
  { label: "Installed cost", electric: "Lower  from ₹1,150/m²", hydronic: "Higher  from ₹1,700/m²", winner: "electric" },
  { label: "Running cost", electric: "Higher per unit of heat", hydronic: "Lowest, especially via heat pump", winner: "hydronic" },
  { label: "Floor build-up", electric: "1–5 mm", hydronic: "18–75 mm", winner: "electric" },
  { label: "Heat-up time", electric: "15–25 minutes", hydronic: "45–90 minutes", winner: "electric" },
  { label: "Best suited to", electric: "Single rooms & renovations", hydronic: "Whole homes & new builds", winner: "both" },
  { label: "Maintenance", electric: "None", hydronic: "Annual health check", winner: "electric" },
  { label: "Warranty", electric: "10 years", hydronic: "25 years on pipework", winner: "hydronic" },
];

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Every layer of a warm floor"
        lead="Heating mats and cables, water-based systems, the thermostats that run them and the insulation that makes them cheap to run  engineered to work as one system."
        image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2400&auto=format&fit=crop"
        imageAlt="Warm, open-plan living space with seamless heated flooring"
      >
        <dl className="flex flex-wrap gap-x-12 gap-y-6">
          {heroStats.map((stat) => (
            <div key={stat.label} className="border-l border-white/15 pl-5">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-3xl text-copper-400">{stat.value}</span>
                <span className="mt-1 block text-sm text-white/60">{stat.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </PageHero>

      {/* Flagship spotlight — scroll-driven stacked deck */}
      <div className="bg-charcoal-950">
        <section className="container-site pt-24 md:pt-32">
          <SectionHeading
            eyebrow="The flagships"
            title="The systems we're known for"
            lead="Three ways we warm the most floors in India  the best-selling mat, the low-profile hydronic retrofit, and the thermostat that runs them both."
            dark
          />
        </section>
        <StackedProductReveal products={getStackedDeck()} className="relative" />
      </div>

      {/* Full range */}
      <section className="bg-cream-200 py-24 md:py-32">
        <div className="container-site">
          <SectionHeading
            eyebrow="The full range"
            title="Browse every system"
            lead="Filter by category, sort by price, and open any product for specs, galleries and compatible floor finishes."
          />
          <div className="mt-14">
            <Suspense>
              <ProductExplorer products={products} />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Electric vs hydronic  editorial dual panel */}
      <section className="bg-charcoal-950 py-24 text-white md:py-32">
        <div className="container-site">
          <SectionHeading
            dark
            eyebrow="Choosing a family"
            title="Electric or water-based?"
            lead="The honest side-by-side we walk through on every first call  copper marks where each system pulls ahead."
            align="center"
          />

          <Reveal className="mx-auto mt-16 max-w-4xl">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Column headers */}
              <div className="flex items-center gap-3 rounded-card border border-white/10 bg-white/5 px-6 py-5">
                <span className="grid size-11 place-items-center rounded-xl bg-copper-500/15 text-copper-400">
                  <Zap className="size-5.5" aria-hidden />
                </span>
                <div>
                  <p className="font-display text-xl">Electric</p>
                  <p className="text-sm text-white/50">Mats, cables & foil</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-card border border-white/10 bg-white/5 px-6 py-5">
                <span className="grid size-11 place-items-center rounded-xl bg-copper-500/15 text-copper-400">
                  <Droplets className="size-5.5" aria-hidden />
                </span>
                <div>
                  <p className="font-display text-xl">Water-based</p>
                  <p className="text-sm text-white/50">Hydronic systems</p>
                </div>
              </div>
            </div>

            <dl className="mt-4 overflow-hidden rounded-card border border-white/10">
              {comparison.map((row, i) => {
                const electricWins = row.winner === "electric" || row.winner === "both";
                const hydronicWins = row.winner === "hydronic" || row.winner === "both";
                return (
                  <div key={row.label} className={cnRow(i)}>
                    <dt className="text-eyebrow text-white/40 sm:col-span-2">{row.label}</dt>
                    <dd className="flex items-start gap-2 text-sm">
                      <CompareMark active={electricWins} />
                      <span className={electricWins ? "text-white" : "text-white/60"}>
                        {row.electric}
                      </span>
                    </dd>
                    <dd className="flex items-start gap-2 text-sm">
                      <CompareMark active={hydronicWins} />
                      <span className={hydronicWins ? "text-white" : "text-white/60"}>
                        {row.hydronic}
                      </span>
                    </dd>
                  </div>
                );
              })}
            </dl>
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title="Not sure which system fits?"
        lead="Send a floor plan and we'll match the system to the rooms  with pricing and running costs for your city."
      />
    </>
  );
}

function cnRow(i: number) {
  return [
    "grid grid-cols-1 gap-2 border-t border-white/8 bg-white/[0.02] px-6 py-5 first:border-t-0 sm:grid-cols-4 sm:items-center sm:gap-6",
    i % 2 === 1 ? "bg-white/[0.04]" : "",
  ].join(" ");
}

function CompareMark({ active }: { active: boolean }) {
  return active ? (
    <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-copper-500">
      <Check className="size-2.5 text-white" aria-hidden />
    </span>
  ) : (
    <span className="mt-0.5 grid size-4 shrink-0 place-items-center text-white/25">
      <Minus className="size-3" aria-hidden />
    </span>
  );
}
