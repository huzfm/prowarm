import { Counter } from "@/components/motion/counter";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { stats } from "@/lib/site";

export function Stats() {
  return (
    <section
      id="stats"
      className="relative overflow-hidden bg-charcoal-950 py-24 text-white md:py-28"
      aria-label="ProWarm in numbers"
    >
      {/* Atmosphere: hairline edges and a soft copper bloom behind the band. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <span className="absolute left-1/2 top-0 h-[26rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper-500/10 blur-3xl" />
      </div>

      <RevealGroup className="container-site relative grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <RevealItem key={stat.label} className="relative pl-6">
            {/* Gradient hairline in place of a flat border. */}
            <span
              aria-hidden
              className="absolute inset-y-1 left-0 w-px bg-gradient-to-b from-copper-400/80 via-white/15 to-transparent"
            />
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/35">
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className="mt-4 font-display text-4xl tracking-tight tabular-nums md:text-5xl">
              <span className="bg-gradient-to-b from-copper-200 via-copper-300 to-copper-500 bg-clip-text text-transparent">
                <Counter value={stat.value} suffix={stat.suffix} />
              </span>
            </p>
            <p className="mt-4 font-medium text-white/90">{stat.label}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-white/45">{stat.note}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
