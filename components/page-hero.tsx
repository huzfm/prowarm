
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import type { ReactNode } from "react";
import { Parallax } from "@/components/motion/parallax";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
});

interface PageHeroFeature {
  /** Pass a rendered icon element, e.g. `<Home className="size-4.5" />` —
   *  not the icon component itself. Server Components can't pass component
   *  references as props to Client Components, only serializable data or
   *  already-rendered elements. */
  icon: ReactNode;
  title: string;
  /** Only used in the "inline" layout (icon left, text right). */
  subtitle?: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  image: string;
  imageAlt: string;
  /** Optional row of small trust/feature badges under the lead copy. */
  features?: PageHeroFeature[];
  /** "inline": icon left of a title+subtitle pair (About page).
   *  "stacked": icon centered above a single label (Services page). */
  featuresLayout?: "inline" | "stacked";
  /** Short accent rule between the headline and the lead paragraph. */
  afterTitleRule?: boolean;
  /** Optional scroll-cue link under the actions. Omit to hide it. */
  discoverLabel?: string;
  discoverHref?: string;
  /** Buttons or other actions, rendered below the features row. */
  children?: ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  features,
  featuresLayout = "inline",
  afterTitleRule = false,
  discoverLabel,
  discoverHref = "#next",
  children,
}: PageHeroProps) {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-charcoal-950 pt-24 pb-16 md:pt-28">
      {/* Background photo */}
      <Parallax fromTop amount={16} className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-r from-black/75 via-black/45 to-black/10"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-black/10"
        />
      </Parallax>

      {/* Decorative concentric arcs, left side */}
      <svg
        aria-hidden
        className="pointer-events-none absolute top-1/2 -left-40 z-0 hidden -translate-y-1/2 opacity-[0.08] md:block"
        width="560"
        height="560"
        viewBox="0 0 560 560"
        fill="none"
      >
        <circle cx="280" cy="280" r="120" stroke="white" strokeWidth="1" />
        <circle cx="280" cy="280" r="190" stroke="white" strokeWidth="1" />
        <circle cx="280" cy="280" r="260" stroke="white" strokeWidth="1" />
      </svg>

      <div className="container-site relative z-10">
        <motion.p
          {...enter(0)}
          className="text-xs font-semibold tracking-[0.3em] text-copper-500 uppercase"
        >
          {eyebrow}
        </motion.p>

        <motion.div {...enter(0.08)} className="mt-3 flex items-center gap-1.5">
          <span
            aria-hidden
            className="h-px w-10 bg-linear-to-r from-copper-500 to-copper-500/30"
          />
          <span aria-hidden className="size-1 rounded-full bg-copper-500/60" />
        </motion.div>

        <motion.h1
          {...enter(0.14)}
          className="mt-6 max-w-2xl font-serif text-5xl leading-[1.15] text-white md:text-6xl lg:text-[3.4rem]"
        >
          {title}
        </motion.h1>

        {afterTitleRule && (
          <motion.span
            {...enter(0.2)}
            className="mt-6 block h-px w-44 bg-linear-to-r from-copper-500 to-copper-500/0"
            aria-hidden
          />
        )}

        <motion.p
          {...enter(0.26)}
          className="mt-6 max-w-md leading-relaxed text-white/70"
        >
          {lead}
        </motion.p>

        {features && features.length > 0 && (
          <motion.div
            {...enter(0.36)}
            className={cn(
              "mt-10 flex flex-wrap",
              featuresLayout === "stacked" ? "gap-x-10 gap-y-8" : "gap-x-10 gap-y-6"
            )}
          >
            {features.map(({ icon, title: featureTitle, subtitle }) =>
              featuresLayout === "stacked" ? (
                <div
                  key={featureTitle}
                  className="flex w-28 flex-col items-center gap-3 text-center"
                >
                  <span className="relative flex size-15 shrink-0 items-center justify-center rounded-full border border-copper-500/40 text-copper-400">
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-copper-500/15 opacity-0 blur-md transition-opacity duration-500 hover:opacity-100"
                    />
                    <span className="relative">{icon}</span>
                  </span>
                  <p className="text-sm leading-snug text-white/75">
                    {featureTitle}
                  </p>
                </div>
              ) : (
                <div key={featureTitle} className="flex items-center gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-copper-500/50 text-copper-400">
                    {icon}
                  </span>
                  <div className="leading-tight">
                    <p className="text-sm font-medium text-white">{featureTitle}</p>
                    {subtitle && (
                      <p className="text-xs text-white/50">{subtitle}</p>
                    )}
                  </div>
                </div>
              )
            )}
          </motion.div>
        )}

        {children && (
          <motion.div {...enter(0.44)} className="mt-10 flex flex-wrap items-center gap-4">
            {children}
          </motion.div>
        )}

        {discoverLabel && (
          <motion.a
            {...enter(0.52)}
            href={discoverHref}
            className="group mt-14 inline-flex items-center gap-3 text-white/60 transition-colors hover:text-white"
          >
            <span className="flex size-9 items-center justify-center rounded-full border border-white/25 transition-colors group-hover:border-white/50">
              <ArrowDown className="size-3.5" aria-hidden />
            </span>
            <span className="text-xs font-medium tracking-[0.2em] uppercase">
              {discoverLabel}
            </span>
          </motion.a>
        )}
      </div>
    </section>
  );
}
