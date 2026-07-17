"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/components/section-heading";
import { testimonials } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);
  const current = testimonials[index];

  const paginate = (dir: number) =>
    setIndex(([i]) => [
      (i + dir + testimonials.length) % testimonials.length,
      dir,
    ]);

  return (
    <section className="bg-cream-200 py-24 md:py-32">
      <div className="container-site">
        <SectionHeading
          eyebrow="Word of mouth"
          title="Warm floors, warmer reviews"
          align="center"
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          <Quote
            className="absolute -top-6 left-0 size-12 text-copper-300 md:-left-6"
            aria-hidden
          />
          <div className="min-h-64 md:min-h-56" aria-live="polite">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction >= 0 ? 48 : -48 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction >= 0 ? -48 : 48 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <p className="font-display text-xl leading-relaxed text-charcoal-800 md:text-2xl">
                  &ldquo;{current.quote}&rdquo;
                </p>
                <footer className="mt-8">
                  <p className="font-semibold text-charcoal-900">{current.name}</p>
                  <p className="mt-1 text-sm text-charcoal-500">{current.role}</p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              onClick={() => paginate(-1)}
              aria-label="Previous testimonial"
              className="grid size-11 cursor-pointer place-items-center rounded-full border border-charcoal-900/15 text-charcoal-600 transition-colors hover:border-copper-500 hover:bg-copper-500 hover:text-white"
            >
              <ArrowLeft className="size-4.5" aria-hidden />
            </button>
            <div className="flex gap-2" aria-hidden>
              {testimonials.map((t, i) => (
                <span
                  key={t.name}
                  className={cn(
                    "size-1.5 rounded-full transition-all duration-300",
                    i === index ? "w-6 bg-copper-500" : "bg-charcoal-900/20"
                  )}
                />
              ))}
            </div>
            <button
              onClick={() => paginate(1)}
              aria-label="Next testimonial"
              className="grid size-11 cursor-pointer place-items-center rounded-full border border-charcoal-900/15 text-charcoal-600 transition-colors hover:border-copper-500 hover:bg-copper-500 hover:text-white"
            >
              <ArrowRight className="size-4.5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
