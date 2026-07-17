import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, HeartHandshake, Ruler, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { Team } from "@/components/about/team";
import { CtaBanner } from "@/components/cta-banner";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { PageHero } from "@/components/page-hero";
import { Parallax } from "@/components/motion/parallax";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description:
    "ProWarm India began with one freezing Srinagar winter. A decade later, we've warmed 12,500+ Indian homes with electric and hydronic underfloor heating.",
};

const values = [
  {
    Icon: Ruler,
    title: "Measure, then promise",
    text: "Every quote starts with a heat-loss calculation, not a rate card. If the numbers say you don't need our biggest system, we'll tell you.",
  },
  {
    Icon: ShieldCheck,
    title: "Hide nothing under the floor",
    text: "Three logged resistance tests, photographs of every cable run, and a handover pack you could give the next owner of your home.",
  },
  {
    Icon: HeartHandshake,
    title: "Answer the phone",
    text: "Support is our own engineers in Mumbai  the people who designed your system, one call away for its entire warranted life.",
  },
  {
    Icon: Compass,
    title: "Design for this country",
    text: "Indian tariffs, Indian floor build-ups, Indian winters  from a Delhi bathroom to a Leh homestay. We don't import assumptions.",
  },
];

const milestones = [
  { year: "2012", text: "Founded in Mumbai after one unforgettably cold Srinagar winter; three installers, one van." },
  { year: "2015", text: "First whole-home hydronic project in Shimla  still running on its original manifold." },
  { year: "2018", text: "SenseWarm thermostat line launches; the 10-year full-replacement warranty becomes standard." },
  { year: "2021", text: "Crossed 5,000 installations and opened the Manali cold-climate demonstration home." },
  { year: "2024", text: "Heat-pump hydronic packages launch; hotel division warms its 500th guest room." },
  { year: "2026", text: "12,500 installations, 60 people, and floors warming in 23 states." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About ProWarm"
        title={
          <>
            We exist so Indian winters
            <br />
            end at the front door.
          </>
        }
        lead="ProWarm India designs, installs and stands behind underfloor heating that disappears into the architecture  and stays out of your electricity bill."
        image="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2400&auto=format&fit=crop"
        imageAlt="Warm, softly lit living room with heated wooden flooring"
      />

      {/* Story */}
      <section className="container-site grid items-center gap-12 py-24 md:py-32 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="relative aspect-4/5 overflow-hidden rounded-card shadow-card">
            <Parallax amount={8} className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1400&auto=format&fit=crop"
                alt="Warm timber-and-stone interior of a Himalayan home with heated floors"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="scale-110 object-cover"
              />
            </Parallax>
          </div>
          <div className="absolute -right-4 -bottom-6 rounded-card bg-copper-500 px-6 py-5 text-white shadow-card-hover md:-right-8">
            <p className="font-display text-3xl">Since 2012</p>
            <p className="mt-1 text-sm text-white/80">Warming Indian floors</p>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            eyebrow="Our story"
            title="It started with cold feet"
            lead="In January 2011, our founder spent a winter in his grandmother's Srinagar home  a beautiful house of deodar and stone that no bukhari or blower could make comfortable."
          />
          <Reveal delay={0.1}>
            <div className="mt-6 space-y-5 leading-relaxed text-charcoal-600">
              <p>
                The floors were the problem. Stone that held the night&apos;s cold until
                noon, in rooms where three generations had always lived close to the
                ground  eating, praying, sleeping on mattresses laid out each night.
                Heating the air did nothing for a life lived on the floor.
              </p>
              <p>
                Radiant floor heating was solving exactly this problem in Scandinavia
                and Canada, but in India it was an importer&apos;s afterthought: foreign
                mats sold at foreign prices, with no design, no installation discipline
                and no one to call in February. Arjun founded ProWarm in 2012 to do it
                properly  engineering first, for Indian homes, tariffs and winters.
              </p>
              <p>
                A decade on, we&apos;re sixty people: thermal engineers, our own trained
                installation crews, and a support line the founders still answer on
                busy mornings. The mission hasn&apos;t moved an inch  warmth you feel,
                heating you never see.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-charcoal-950 py-24 text-white md:py-32">
        <div className="container-site">
          <SectionHeading
            dark
            eyebrow="What we won't compromise"
            title="Four rules on every job"
          />
          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ Icon, title, text }) => (
              <RevealItem key={title} className="h-full">
                <div className="h-full rounded-card border border-white/10 bg-white/5 p-7 transition-colors duration-500 hover:border-copper-500/50 hover:bg-white/8">
                  <span className="grid size-12 place-items-center rounded-xl bg-copper-500/15 text-copper-400">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-xl">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <Team />

      {/* Timeline */}
      <section className="container-site py-24 md:py-32">
        <SectionHeading
          eyebrow="The journey"
          title="Fourteen years, one warm line"
          align="center"
        />
        <div className="relative mx-auto mt-16 max-w-2xl">
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-4 w-px bg-charcoal-900/10 md:left-1/2"
          />
          <ol className="space-y-12">
            {milestones.map((m, i) => (
              <li key={m.year}>
                <Reveal
                  delay={0.05}
                  className={`relative flex gap-8 pl-12 md:w-1/2 md:pl-0 ${
                    i % 2 === 0
                      ? "md:pr-12 md:text-right"
                      : "md:ml-auto md:pl-12"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute top-1.5 left-2.5 size-3 rounded-full border-2 border-copper-500 bg-cream-100 md:left-auto ${
                      i % 2 === 0 ? "md:-right-1.5" : "md:-left-1.5"
                    }`}
                  />
                  <div>
                    <p className="font-display text-2xl text-copper-600">{m.year}</p>
                    <p className="mt-2 leading-relaxed text-charcoal-600">{m.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
        <Reveal className="mt-16 text-center">
          <Button asChild size="lg">
            <Link href="/services">
              See how we work
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </Reveal>
      </section>

      <CtaBanner
        title="Add your winter to the story"
        lead="A survey costs nothing, and the running-cost numbers are yours to keep either way."
      />
    </>
  );
}
