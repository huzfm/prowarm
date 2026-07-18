"use client";

import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { testimonials } from "@/lib/site";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
/** Seconds a quote stays up before autoplay advances. */
const DWELL = 9;
const RING_R = 21;
const RING_C = 2 * Math.PI * RING_R;

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

export function Testimonials() {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const current = testimonials[index];

  const go = (next: number, dir: number) =>
    setIndex([(next + testimonials.length) % testimonials.length, dir]);
  const paginate = (dir: number) => go(index + dir, dir);

  // Autoplay doubles as the progress ring on the "next" button.
  const progress = useMotionValue(0);
  const dash = useTransform(progress, (p) => RING_C * (1 - p));
  useEffect(() => progress.set(0), [index, progress]);
  useAnimationFrame((_, delta) => {
    if (paused || reduced) return;
    const next = progress.get() + delta / 1000 / DWELL;
    if (next >= 1) {
      progress.set(0);
      setIndex(([i]) => [(i + 1) % testimonials.length, 1]);
    } else {
      progress.set(next);
    }
  });

  // Pointer tilt — a few degrees, springed, so the card feels physical.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 150, damping: 20, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-6, 6]), spring);

  return (
    <section
      className="relative isolate overflow-hidden bg-charcoal-950 py-24 md:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Warm copper glow + hairline grid, both purely decorative. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(60rem 40rem at 15% 0%, rgb(200 118 58 / 0.22), transparent 65%), radial-gradient(45rem 35rem at 95% 100%, rgb(200 118 58 / 0.12), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "5.5rem 5.5rem",
          maskImage:
            "radial-gradient(70% 60% at 50% 45%, black, transparent 100%)",
        }}
      />

      <div className="container-site">
        <div className="grid gap-14 lg:grid-cols-[20rem_1fr] lg:gap-20">
          {/* Editorial column */}
          <div className="lg:pt-2">
            <Reveal className="max-w-none">
              <p className="text-eyebrow text-copper-400">Word of mouth</p>
              <h2 className="mt-4 text-display-2 text-white">
                Warm floors,
                <br />
                <span className="text-copper-300">warmer reviews</span>
              </h2>
              <p className="mt-6 max-w-sm text-lead text-white/55">
                Homeowners, architects and hoteliers on what changed after the
                first winter.
              </p>
            </Reveal>

            <Reveal delay={0.12} className="max-w-none">
              <div className="mt-10 flex items-center gap-5">
                <button
                  type="button"
                  onClick={() => paginate(-1)}
                  aria-label="Previous testimonial"
                  className="grid size-12 cursor-pointer place-items-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:-translate-x-0.5 hover:border-copper-400 hover:text-copper-300"
                >
                  <ArrowLeft className="size-4.5" aria-hidden />
                </button>

                <button
                  type="button"
                  onClick={() => paginate(1)}
                  aria-label="Next testimonial"
                  className="group relative grid size-12 cursor-pointer place-items-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:translate-x-0.5 hover:border-copper-400 hover:text-copper-300"
                >
                  <svg
                    className="absolute inset-0 size-full -rotate-90"
                    viewBox="0 0 48 48"
                    aria-hidden
                  >
                    <motion.circle
                      cx="24"
                      cy="24"
                      r={RING_R}
                      fill="none"
                      stroke="var(--color-copper-500)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray={RING_C}
                      style={{ strokeDashoffset: dash }}
                    />
                  </svg>
                  <ArrowRight className="size-4.5" aria-hidden />
                </button>

                <p className="ml-1 font-display text-sm tabular-nums text-white/40">
                  <span className="text-white/85">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {" / "}
                  {String(testimonials.length).padStart(2, "0")}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Quote card */}
          <Reveal delay={0.08} className="max-w-none">
            <div className="[perspective:1400px]">
              <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                onPointerMove={(e) => {
                  if (reduced) return;
                  const r = e.currentTarget.getBoundingClientRect();
                  px.set((e.clientX - r.left) / r.width - 0.5);
                  py.set((e.clientY - r.top) / r.height - 0.5);
                }}
                onPointerLeave={() => {
                  px.set(0);
                  py.set(0);
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.14}
                onDragEnd={(_, info) => {
                  if (Math.abs(info.offset.x) > 70)
                    paginate(info.offset.x < 0 ? 1 : -1);
                }}
                className="relative cursor-grab rounded-card border border-white/10 bg-white/[0.035] p-8 backdrop-blur-xl active:cursor-grabbing md:p-12"
              >
                {/* Oversized quote glyph, keyed so it re-animates per quote. */}
                <motion.span
                  key={`glyph-${index}`}
                  aria-hidden
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="pointer-events-none absolute -top-6 left-6 font-display text-[7rem] leading-none text-copper-500/25 select-none md:left-10 md:text-[9rem]"
                >
                  &ldquo;
                </motion.span>

                <div
                  className="relative min-h-[19rem] sm:min-h-[15rem] md:min-h-[16rem]"
                  aria-live="polite"
                >
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.blockquote
                      key={index}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      custom={direction}
                      variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.018 } },
                        exit: {
                          opacity: 0,
                          x: direction >= 0 ? -32 : 32,
                          transition: { duration: 0.3, ease: EASE },
                        },
                      }}
                    >
                      {/* Word-by-word so the quote reads in, rather than pops. */}
                      <p className="font-display text-xl leading-[1.45] text-white/90 md:text-[1.75rem] md:leading-[1.4]">
                        {current.quote.split(" ").map((word, i) => (
                          <motion.span
                            key={`${index}-${i}`}
                            className="inline-block whitespace-pre"
                            variants={{
                              hidden: { opacity: 0, y: 14 },
                              visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.5, ease: EASE },
                              },
                            }}
                          >
                            {word}{" "}
                          </motion.span>
                        ))}
                      </p>

                      <motion.footer
                        variants={{
                          hidden: { opacity: 0, y: 12 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                              duration: 0.6,
                              delay: 0.25,
                              ease: EASE,
                            },
                          },
                        }}
                        className="mt-9 flex items-center gap-4"
                      >
                        <span
                          aria-hidden
                          className="grid size-12 shrink-0 place-items-center rounded-full border border-copper-400/30 bg-copper-500/12 font-display text-base text-copper-200"
                        >
                          {initials(current.name)}
                        </span>
                        <span>
                          <span className="block font-semibold text-white">
                            {current.name}
                          </span>
                          <span className="mt-0.5 block text-sm text-white/45">
                            {current.role}
                          </span>
                        </span>
                      </motion.footer>
                    </motion.blockquote>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Name rail — jump straight to a voice. */}
            <div className="mt-8 flex flex-wrap gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => go(i, i > index ? 1 : -1)}
                  aria-label={`Read the testimonial from ${t.name}`}
                  aria-current={i === index}
                  className={cn(
                    "cursor-pointer rounded-full border px-4 py-2 text-sm transition-all duration-300",
                    i === index
                      ? "border-copper-400/60 bg-copper-500/15 text-copper-100"
                      : "border-white/10 text-white/45 hover:border-white/25 hover:text-white/75"
                  )}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
