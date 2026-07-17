import { Clock, Mail, MapPin, Phone } from "lucide-react";
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

      <section className="container-site grid gap-12 py-24 md:py-32 lg:grid-cols-5 lg:gap-16">
        <Reveal className="lg:col-span-3">
          <div className="rounded-card bg-white p-7 shadow-card md:p-10">
            <h2 className="text-display-3 text-charcoal-900">Send us a message</h2>
            <p className="mt-3 text-charcoal-500">
              Rooms, floor finish and city are the three details that speed
              everything up.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-2">
          <RevealGroup className="space-y-5">
            {infoCards.map(({ Icon, title, lines, href }) => (
              <RevealItem key={title}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex gap-5 rounded-card bg-white p-6 shadow-card transition-[transform,box-shadow] duration-500 ease-(--ease-out-quart) hover:-translate-y-1 hover:shadow-card-hover motion-reduce:hover:translate-y-0"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-copper-100 text-copper-600 transition-colors group-hover:bg-copper-500 group-hover:text-white">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-display text-lg text-charcoal-900">
                      {title}
                    </span>
                    <span className="mt-1 block text-sm font-medium text-charcoal-700">
                      {lines[0]}
                    </span>
                    <span className="mt-0.5 block text-sm text-charcoal-400">
                      {lines[1]}
                    </span>
                  </span>
                </a>
              </RevealItem>
            ))}
            <RevealItem>
              <div className="flex gap-5 rounded-card border border-dashed border-copper-500/40 bg-copper-50 p-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-copper-100 text-copper-600">
                  <Clock className="size-6" aria-hidden />
                </span>
                <div>
                  <p className="font-display text-lg text-charcoal-900">
                    Planning a winter project?
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-charcoal-600">
                    Survey slots fill from September. Booking by August keeps
                    installation comfortably ahead of the cold.
                  </p>
                </div>
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* Map */}
      <section className="container-site pb-24 md:pb-32" aria-label="Our location">
        <Reveal>
          <div className="overflow-hidden rounded-card shadow-card">
            <iframe
              title={`Map showing the ProWarm India demo studio at ${siteConfig.address}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.mapQuery)}&output=embed`}
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full border-0 grayscale-[0.4] contrast-[1.05]"
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
