"use client";

import Image from "next/image";
import { Mail } from "lucide-react";
import { LinkedinIcon } from "@/components/icons";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";

const team = [
  {
    name: "Arjun Mehta",
    role: "Founder & CEO",
    bio: "Started ProWarm after a freezing Srinagar winter in a beautiful, unheatable family home. Still reviews every hydronic design personally.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Priya Raghavan",
    role: "Head of Engineering",
    bio: "Thermal engineer, ex-HVAC consultancy. Wrote our heat-loss model and insists on metered data over marketing claims.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Rohan Kulkarni",
    role: "Lead Installation Engineer",
    bio: "Four hundred installations and counting. Trains every ProWarm crew on the three-test discipline that backs our warranty.",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Sana Kapoor",
    role: "Customer Experience Lead",
    bio: "Runs the support line and the owner's-guide library. If an engineer answers your call on the second ring, thank Sana's rota.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
  },
];

export function Team() {
  return (
    <section className="bg-cream-200 py-24 md:py-32">
      <div className="container-site">
        <SectionHeading
          eyebrow="The people"
          title="Engineers first, salespeople never"
          lead="The team that designs, installs and answers the phone — hover a card to meet them."
        />
        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <RevealItem key={member.name} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-card bg-white shadow-card transition-shadow duration-500 hover:shadow-card-hover">
                <div className="relative aspect-3/4 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={`Portrait of ${member.name}, ${member.role} at ProWarm India`}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-(--ease-out-quart) group-hover:scale-105 motion-reduce:group-hover:scale-100"
                  />
                  {/* Bio slides up over the photo on hover / focus */}
                  <div className="absolute inset-0 flex translate-y-full flex-col justify-end bg-linear-to-t from-charcoal-950/95 via-charcoal-950/70 to-transparent p-6 opacity-0 transition-[transform,opacity] duration-500 ease-(--ease-out-quart) group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none">
                    <p className="text-sm leading-relaxed text-white/85">{member.bio}</p>
                    <div className="mt-4 flex gap-2">
                      <a
                        href="https://linkedin.com/company/prowarmindia"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on LinkedIn`}
                        className="grid size-9 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-copper-500"
                      >
                        <LinkedinIcon className="size-4" />
                      </a>
                      <a
                        href="mailto:hello@prowarm.in"
                        aria-label={`Email ${member.name}`}
                        className="grid size-9 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-copper-500"
                      >
                        <Mail className="size-4" aria-hidden />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg text-charcoal-900">{member.name}</h3>
                  <p className="mt-1 text-sm text-copper-600">{member.role}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
