import { Counter } from "@/components/motion/counter";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { stats } from "@/lib/site";

export function Stats() {
  return (
    <section id="stats" className="bg-charcoal-950 py-20 text-white md:py-24" aria-label="ProWarm in numbers">
      <RevealGroup className="container-site grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
        {stats.map((stat) => (
          <RevealItem key={stat.label} className="border-l border-white/10 pl-6">
            <p className="font-display text-4xl text-copper-400 tabular-nums md:text-5xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-3 font-medium text-white">{stat.label}</p>
            <p className="mt-1 text-sm text-white/50">{stat.note}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
