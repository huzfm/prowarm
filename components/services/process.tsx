"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";

const steps = [
  {
    title: "Survey & heat-loss study",
    text: "We measure your rooms, subfloor, insulation and glazing, then model the heat each space actually loses. Free, on site or from your architect's drawings.",
    duration: "Day 0 · free",
  },
  {
    title: "Design & transparent quote",
    text: "You receive a room-by-room layout drawing, the system we recommend and why, and running-cost estimates at your local tariff. No line item is vague.",
    duration: "Within 2 working days",
  },
  {
    title: "Installation",
    text: "Our own crews — never subcontractors — install with the three-test discipline: every circuit resistance-tested before, during and after the floor goes down.",
    duration: "1–3 days per zone",
  },
  {
    title: "Commissioning & handover",
    text: "Thermostats programmed, first-heat ramp scheduled, and a handover pack with test logs, cable photographs and your registered warranty.",
    duration: "Half a day",
  },
  {
    title: "Aftercare for the long haul",
    text: "10 years on electric systems, 25 on hydronic pipework — with our Mumbai engineering team on the phone, and annual health checks for hydronic homes.",
    duration: "Years 1–25",
  },
];

/** Numbered process timeline; the copper spine draws itself as you scroll. */
export function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!listRef.current || !lineRef.current) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 75%",
            end: "bottom 55%",
            scrub: 0.5,
          },
        }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="bg-charcoal-950 py-24 text-white md:py-32">
      <div className="container-site">
        <SectionHeading
          dark
          eyebrow="How we work"
          title="From cold floor to warm one, in five steps"
        />
        <div className="relative mx-auto mt-16 max-w-3xl">
          <div aria-hidden className="absolute top-2 bottom-2 left-6 w-px bg-white/10" />
          <div
            ref={lineRef}
            aria-hidden
            className="absolute top-2 bottom-2 left-6 w-px origin-top bg-copper-500 motion-reduce:hidden"
          />
          <ol ref={listRef} className="space-y-14">
            {steps.map((step, i) => (
              <li key={step.title} className="relative pl-20">
                <Reveal delay={0.05}>
                  <span
                    aria-hidden
                    className="absolute top-0 left-0 grid size-12 place-items-center rounded-full border border-copper-500/40 bg-charcoal-900 font-display text-lg text-copper-400"
                  >
                    {i + 1}
                  </span>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="font-display text-2xl">{step.title}</h3>
                    <span className="text-sm text-copper-400">{step.duration}</span>
                  </div>
                  <p className="mt-3 max-w-xl leading-relaxed text-white/60">{step.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
