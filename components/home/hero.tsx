// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { ArrowRight, ChevronDown } from "lucide-react";
// import { Magnetic } from "@/components/motion/magnetic";
// import { Parallax } from "@/components/motion/parallax";
// import { Button } from "@/components/ui/button";

// const EASE = [0.22, 1, 0.36, 1] as const;

// const enter = (delay: number) => ({
//   initial: { opacity: 0, y: 32 },
//   animate: { opacity: 1, y: 0 },
//   transition: { duration: 0.8, delay, ease: EASE },
// });

// export function Hero() {
//   return (
//     <section className="relative flex min-h-svh items-end overflow-hidden bg-charcoal-950 pb-20 md:items-center md:pb-0">
//       <Parallax fromTop amount={16} className="absolute inset-0">
//         <Image
//           src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2400&auto=format&fit=crop"
//           alt="Warm, softly lit living room with a bare-foot-friendly heated floor"
//           fill
//           priority
//           sizes="100vw"
//           className="scale-110 object-cover"
//         />
//         <div
//           aria-hidden
//           className="absolute inset-0 bg-linear-to-t from-charcoal-950/95 via-charcoal-950/55 to-charcoal-950/35"
//         />
//       </Parallax>

//       <div className="container-site relative pt-32 md:pt-40">
//         <motion.p {...enter(0)} className="text-eyebrow text-copper-400">
//           Underfloor heating · Engineered for Indian homes
//         </motion.p>

//         <motion.h1
//           {...enter(0.1)}
//           className="mt-6 max-w-3xl text-display-1 text-white"
//         >
//           Warmth you feel.
//           <br />
//           Heating you never see.
//         </motion.h1>

//         <motion.p
//           {...enter(0.22)}
//           className="mt-6 max-w-xl text-lead text-white/75"
//         >
//           Electric and water-based underfloor heating, designed and installed
//           end-to-end  silent, invisible, and up to 40% cheaper to run than
//           blown-air heating.
//         </motion.p>

//         <motion.div {...enter(0.34)} className="mt-10 flex flex-wrap gap-4">
//           <Magnetic>
//             <Button asChild size="lg">
//               <Link href="/products">
//                 Explore systems
//                 <ArrowRight aria-hidden />
//               </Link>
//             </Button>
//           </Magnetic>
//           <Magnetic>
//             <Button asChild size="lg" variant="outline-light">
//               <Link href="/contact">Book a free survey</Link>
//             </Button>
//           </Magnetic>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.2, duration: 1 }}
//           className="mt-20 hidden justify-center md:flex"
//         >
//           <a
//             href="#stats"
//             aria-label="Scroll to explore"
//             className="flex flex-col items-center gap-1 text-white/50 transition-colors hover:text-white"
//           >
//             <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
//             <ChevronDown className="size-4 animate-bounce motion-reduce:animate-none" aria-hidden />
//           </a>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Parallax } from "@/components/motion/parallax";
import { Button } from "@/components/ui/button";

const EASE = [0.22, 1, 0.36, 1] as const;

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
});

const trustStats = [
  { value: "1000+", label: "Homes" },
  { value: "25", label: "Year Warranty" },
  { value: "40%", label: "Lower Energy Cost" },
];

/** Button stays still; a soft diagonal shine sweeps across it once on hover. */
function ShineButton({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative inline-block overflow-hidden rounded-full">
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/40 to-transparent opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover:translate-x-[calc(300%)] group-hover:opacity-100"
      />
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-charcoal-950">
      {/* Background photo */}
      <Parallax fromTop amount={16} className="absolute inset-0">
        <Image
          src="/home.png"
          alt="Warm, softly lit luxury living room with a fireplace and mountain view, radiant floor heating"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-r from-black/70 via-black/35 to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-black/15"
        />
      </Parallax>

      {/* Top center mark */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        aria-hidden
        className="relative z-10 mx-auto mt-26 size-1.5 rounded-full bg-[#C9A876]"
      />

      {/* Main content — vertically centered */}
      <div className="container-site relative z-10 flex flex-1 flex-col justify-center pb-4">
        <motion.p
          {...enter(0)}
          className="text-xs font-medium tracking-[0.3em] text-[#C9A876] uppercase"
        >
          Premium Radiant Floor Heating
        </motion.p>

        <motion.h1
          {...enter(0.1)}
          className="mt-6 max-w-2xl font-serif text-6xl leading-[1.12] font-normal text-white md:text-[4.75rem]"
        >
          Invisible
          <br />
          Warmth.
          <br />
          Visible Luxury.
        </motion.h1>

        <motion.span
          {...enter(0.24)}
          className="mt-8 block h-px w-14 bg-white/25"
          aria-hidden
        />

        <motion.div {...enter(0.3)} className="mt-6 space-y-1">
          <p className="text-white/65">Engineered for modern Indian homes.</p>
          <p className="text-white/65">
            Comfort you feel. Technology you don&apos;t see.
          </p>
        </motion.div>

        <motion.div
          {...enter(0.42)}
          className="mt-10 flex flex-wrap items-center gap-8"
        >
          <ShineButton>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-[#BA6A35] px-7 text-xs font-semibold tracking-[0.15em] text-white uppercase transition-colors duration-300 ease-out hover:bg-[#9C5A2C]"
            >
              <Link href="/contact">
                Book Your Free Home Survey
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Button>
          </ShineButton>

          <Link
            href="/installation-film"
            className="group flex items-center gap-3 text-xs font-medium tracking-[0.15em] text-white uppercase transition-colors hover:text-white/70"
          >
            <span className="flex size-9 items-center justify-center rounded-full border border-white/30 transition-colors group-hover:border-white/60">
              <Play className="size-3.5 translate-x-px" aria-hidden />
            </span>
            Watch Film
          </Link>
        </motion.div>
      </div>

      {/* Bottom bar: trust stats (left) + scroll indicator (right) */}
      <div className="container-site relative z-10 flex items-end justify-between pb-10">
        <motion.div
          {...enter(0.55)}
          className="flex items-end gap-6 sm:gap-10"
        >
          <div>
            <p className="text-[10px] font-medium tracking-[0.25em] text-white/40 uppercase">
              Trusted By
            </p>
            <p className="mt-2 font-serif text-2xl text-[#C9A876]">
              {trustStats[0].value}
            </p>
            <p className="text-[11px] tracking-[0.08em] text-white/45 uppercase">
              {trustStats[0].label}
            </p>
          </div>

          {trustStats.slice(1).map((stat) => (
            <div
              key={stat.label}
              className="border-l border-white/15 pl-6 sm:pl-10"
            >
              <p className="font-serif text-2xl text-white">{stat.value}</p>
              <p className="text-[11px] tracking-[0.08em] text-white/45 uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.a
          {...enter(0.65)}
          href="#next"
          aria-label="Scroll to explore"
          className="hidden flex-col items-center gap-3 text-white/50 transition-colors hover:text-white md:flex"
        >
          <span className="text-[10px] font-medium tracking-[0.25em] uppercase">
            Scroll Down
          </span>
          <span className="flex size-8 items-center justify-center rounded-full border border-white/25">
            <span className="size-1 animate-bounce rounded-full bg-current motion-reduce:animate-none" />
          </span>
        </motion.a>
      </div>
    </section>
  );
}
