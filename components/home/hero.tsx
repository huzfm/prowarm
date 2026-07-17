"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Magnetic } from "@/components/motion/magnetic";
import { Parallax } from "@/components/motion/parallax";
import { Button } from "@/components/ui/button";

const EASE = [0.22, 1, 0.36, 1] as const;

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

export function Hero() {
  return (
    <section className="relative flex min-h-svh items-end overflow-hidden bg-charcoal-950 pb-20 md:items-center md:pb-0">
      <Parallax fromTop amount={16} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2400&auto=format&fit=crop"
          alt="Warm, softly lit living room with a bare-foot-friendly heated floor"
          fill
          priority
          sizes="100vw"
          className="scale-110 object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-charcoal-950/95 via-charcoal-950/55 to-charcoal-950/35"
        />
      </Parallax>

      <div className="container-site relative pt-32 md:pt-40">
        <motion.p {...enter(0)} className="text-eyebrow text-copper-400">
          Underfloor heating · Engineered for Indian homes
        </motion.p>

        <motion.h1
          {...enter(0.1)}
          className="mt-6 max-w-3xl text-display-1 text-white"
        >
          Warmth you feel.
          <br />
          Heating you never see.
        </motion.h1>

        <motion.p
          {...enter(0.22)}
          className="mt-6 max-w-xl text-lead text-white/75"
        >
          Electric and water-based underfloor heating, designed and installed
          end-to-end  silent, invisible, and up to 40% cheaper to run than
          blown-air heating.
        </motion.p>

        <motion.div {...enter(0.34)} className="mt-10 flex flex-wrap gap-4">
          <Magnetic>
            <Button asChild size="lg">
              <Link href="/products">
                Explore systems
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          </Magnetic>
          <Magnetic>
            <Button asChild size="lg" variant="outline-light">
              <Link href="/contact">Book a free survey</Link>
            </Button>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-20 hidden justify-center md:flex"
        >
          <a
            href="#stats"
            aria-label="Scroll to explore"
            className="flex flex-col items-center gap-1 text-white/50 transition-colors hover:text-white"
          >
            <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
            <ChevronDown className="size-4 animate-bounce motion-reduce:animate-none" aria-hidden />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
