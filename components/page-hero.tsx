"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE },
});

/** Dark hero band used at the top of every inner page. */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt = "",
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-charcoal-950 pt-40 pb-20 md:pt-48 md:pb-28">
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-charcoal-950 via-charcoal-950/60 to-charcoal-950/40"
          />
        </>
      )}
      <div
        aria-hidden
        className="absolute -top-32 right-0 size-96 rounded-full bg-copper-500/15 blur-3xl"
      />
      <div className="container-site relative">
        <motion.p {...enter(0)} className="text-eyebrow text-copper-400">
          {eyebrow}
        </motion.p>
        <motion.h1 {...enter(0.1)} className="mt-5 max-w-3xl text-display-1 text-white">
          {title}
        </motion.h1>
        {lead && (
          <motion.p {...enter(0.2)} className="mt-6 max-w-2xl text-lead text-white/70">
            {lead}
          </motion.p>
        )}
        {children && (
          <motion.div {...enter(0.3)} className="mt-10">
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
