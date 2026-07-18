import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free underfloor heating survey, request a quote or ask our Mumbai engineering team anything. We reply within one working day.",
};

const infoCards = [
  {
    Icon: Phone,
    title: "Call us",
    lines: [siteConfig.phone, "Mon–Sat, 9:30–18:30 IST"],
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
  },
  {
    Icon: Mail,
    title: "Email us",
    lines: [siteConfig.email, "Replies within one working day"],
    href: `mailto:${siteConfig.email}`,
  },
  {
    Icon: MapPin,
    title: "Visit the demo floor",
    lines: [siteConfig.address, "Walk barefoot before you buy"],
    href: `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.mapQuery)}`,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to an engineer, not a call centre"
        lead="Surveys are free, quotes are itemised, and questions are welcome even if you're just researching. Winter has a deadline  we work to it."
        image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2400&auto=format&fit=crop"
        imageAlt="Contemporary living space warmed by an underfloor heating system"
      />

      <section className="relative isolate overflow-hidden py-24 md:py-32">
        {/* Warm wash + hairline grid, echoing the testimonials stage. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-cream-100"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(55rem 38rem at 85% -5%, rgb(200 118 58 / 0.14), transparent 65%), radial-gradient(40rem 30rem at 0% 105%, rgb(200 118 58 / 0.08), transparent 60%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(26 26 26 / 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgb(26 26 26 / 0.06) 1px, transparent 1px)",
            backgroundSize: "5.5rem 5.5rem",
            maskImage:
              "radial-gradient(75% 60% at 50% 40%, black, transparent 100%)",
          }}
        />

        <div className="container-site grid gap-12 lg:grid-cols-5 lg:gap-16">
          <Reveal className="max-w-none lg:col-span-3">
            <div className="group relative rounded-card border border-charcoal-900/8 bg-white/85 p-7 shadow-card-hover backdrop-blur-xl md:p-10">
              {/* Copper hairline along the top edge of the card. */}
              <span
                aria-hidden
                className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-copper-500/70 to-transparent"
              />
              <p className="text-eyebrow text-copper-600">Step 01</p>
              <h2 className="mt-4 text-display-3 text-charcoal-900">
                Send us a message
              </h2>
              <p className="mt-3 max-w-md text-charcoal-500">
                Rooms, floor finish and city are the three details that speed
                everything up.
              </p>
              <div className="mt-9 border-t border-charcoal-900/8 pt-9">
                <ContactForm />
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-2">
            <RevealGroup className="space-y-4">
              {infoCards.map(({ Icon, title, lines, href }, i) => (
                <RevealItem key={title}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group relative flex items-start gap-5 overflow-hidden rounded-card border border-charcoal-900/8 bg-white/80 p-6 shadow-card backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-500 ease-(--ease-out-quart) hover:-translate-y-1 hover:border-copper-500/35 hover:shadow-card-hover motion-reduce:hover:translate-y-0"
                  >
                    {/* Copper wash that sweeps in from the left on hover. */}
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-10 bg-gradient-to-r from-copper-50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-copper-100 text-copper-600 transition-all duration-500 ease-(--ease-out-quart) group-hover:scale-105 group-hover:bg-copper-500 group-hover:text-white motion-reduce:group-hover:scale-100">
                      <Icon className="size-6" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="font-display text-xs tabular-nums text-charcoal-300">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-lg text-charcoal-900">
                          {title}
                        </span>
                      </span>
                      <span className="mt-1 block truncate text-sm font-medium text-charcoal-700">
                        {lines[0]}
                      </span>
                      <span className="mt-0.5 block text-sm text-charcoal-400">
                        {lines[1]}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="size-4.5 shrink-0 text-charcoal-300 transition-all duration-500 ease-(--ease-out-quart) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-copper-600 motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
                      aria-hidden
                    />
                  </a>
                </RevealItem>
              ))}

              <RevealItem>
                <div className="relative overflow-hidden rounded-card bg-charcoal-950 p-7 text-white">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(28rem 18rem at 100% 0%, rgb(200 118 58 / 0.3), transparent 65%)",
                    }}
                  />
                  <div className="relative flex gap-5">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-copper-400/30 bg-copper-500/15 text-copper-300">
                      <Clock className="size-6" aria-hidden />
                    </span>
                    <div>
                      <p className="font-display text-lg text-white">
                        Planning a winter project?
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                        Survey slots fill from September. Booking by August keeps
                        installation comfortably ahead of the cold.
                      </p>
                    </div>
                  </div>
                </div>
              </RevealItem>
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="container-site pb-24 md:pb-32" aria-label="Our location">
        <Reveal className="max-w-none">
          <div className="relative overflow-hidden rounded-card border border-charcoal-900/8 shadow-card-hover">
            <iframe
              title={`Map showing the ProWarm India demo studio at ${siteConfig.address}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.mapQuery)}&output=embed`}
              width="100%"
              height="480"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full border-0 grayscale-[0.55] contrast-[1.05] transition-[filter] duration-700 hover:grayscale-0"
            />
            {/* Floating address card — pointer-events only on the card itself
                so the map stays draggable underneath. */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:inset-y-0 sm:right-auto sm:left-0 sm:grid sm:place-items-center sm:p-8">
              <div className="pointer-events-auto max-w-xs rounded-card border border-white/60 bg-white/85 p-6 shadow-card-hover backdrop-blur-xl">
                <p className="text-eyebrow text-copper-600">The demo floor</p>
                <p className="mt-3 font-display text-lg leading-snug text-charcoal-900">
                  {siteConfig.address}
                </p>
                <a
                  href={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-copper-600 transition-colors hover:text-copper-700"
                >
                  Get directions
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
                    aria-hidden
                  />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
