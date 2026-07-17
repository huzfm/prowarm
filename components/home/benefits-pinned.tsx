"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Leaf, ShieldCheck, Waves, type LucideIcon } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";

interface Benefit {
  Icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  alt: string;
}

const benefits: Benefit[] = [
  {
    Icon: Waves,
    title: "Even warmth, wall to wall",
    description:
      "A radiant floor heats the whole room from below  no hot corner by the blower and cold draught by the window. Just one gentle, even temperature from skirting to skirting, and warm stone under bare feet in January.",
    image:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1400&auto=format&fit=crop",
    alt: "Sunlit bathroom with evenly heated stone tiles",
  },
  {
    Icon: Leaf,
    title: "Up to 40% lower running costs",
    description:
      "Warm feet let you keep the air 3–4 °C cooler for the same comfort, and zoned thermostats heat only the rooms you're using. Across 214 metered homes last winter, customers cut heating electricity by a third or more.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1400&auto=format&fit=crop",
    alt: "Cosy, efficiently heated reading corner with warm wooden flooring",
  },
  {
    Icon: ShieldCheck,
    title: "Installed once, guaranteed for a decade",
    description:
      "Every circuit is resistance-tested three times before it disappears under your floor, photographed for your records, and backed by a 10-year full-replacement warranty  with our own engineers on the phone, not a call centre.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1400&auto=format&fit=crop",
    alt: "ProWarm engineer testing a floor heating circuit during installation",
  },
];

/**
 * "Why us" section  pins in place on desktop while the three benefit
 * panels crossfade as the user scrolls (GSAP ScrollTrigger pin).
 * On mobile / reduced motion it renders as a simple stacked list.
 */
export function BenefitsPinned() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 64rem) and (prefers-reduced-motion: no-preference)",
      () => {
        const slides = gsap.utils.toArray<HTMLElement>(
          section.querySelectorAll("[data-benefit-slide]")
        );
        gsap.set(slides, { position: "absolute", inset: 0 });
        gsap.set(slides.slice(1), { autoAlpha: 0, y: 48 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${(slides.length - 1) * 100}%`,
            pin: true,
            scrub: 0.5,
            onUpdate: (self) => {
              setActive(
                Math.min(
                  slides.length - 1,
                  Math.round(self.progress * (slides.length - 1))
                )
              );
            },
          },
        });

        slides.forEach((slide, i) => {
          if (i === 0) return;
          tl.to(slides[i - 1], { autoAlpha: 0, y: -48, duration: 1 })
            .fromTo(
              slide,
              { autoAlpha: 0, y: 48 },
              { autoAlpha: 1, y: 0, duration: 1 },
              "<0.25"
            );
        });
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-cream-100 py-24 lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:py-0"
    >
      <div className="container-site">
        <SectionHeading
          eyebrow="Why ProWarm"
          title="The case for heating from the floor up"
          lead="Three reasons twelve thousand Indian households chose radiant warmth."
        />

        <div className="relative mt-12 lg:mt-16 lg:h-105">
          {benefits.map(({ Icon, title, description, image, alt }, i) => (
            <div
              key={title}
              data-benefit-slide
              className="mb-16 grid items-center gap-8 last:mb-0 lg:mb-0 lg:grid-cols-2 lg:gap-16"
            >
              <div>
                <span className="grid size-14 place-items-center rounded-2xl bg-copper-100 text-copper-600">
                  <Icon className="size-7" aria-hidden />
                </span>
                <p className="mt-6 text-eyebrow text-charcoal-400">
                  {String(i + 1).padStart(2, "0")} / {String(benefits.length).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-display-3 text-charcoal-900">{title}</h3>
                <p className="mt-5 max-w-lg text-lead text-charcoal-600">{description}</p>
              </div>
              <div className="relative aspect-4/3 overflow-hidden rounded-card shadow-card">
                <Image
                  src={image}
                  alt={alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Progress dots  desktop pin only */}
        <div className="mt-10 hidden gap-2 lg:flex" aria-hidden>
          {benefits.map((b, i) => (
            <span
              key={b.title}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i === active ? "w-10 bg-copper-500" : "w-4 bg-charcoal-900/15"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
