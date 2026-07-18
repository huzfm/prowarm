import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  Droplets,
  Layers,
  LifeBuoy,
  SmartphoneNfc,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";
import { CtaBanner } from "@/components/cta-banner";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/page-hero";
import { Process } from "@/components/services/process";
import { ServiceScroller } from "@/components/services/service-scroller";
import { SectionHeading } from "@/components/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Free heat-loss surveys, electric and hydronic system design, installation by our own crews, smart zoning, and 10–25 year aftercare. How ProWarm works.",
};

const services = [
  {
    id: "survey",
    Icon: ClipboardCheck,
    title: "Survey & heat-loss assessment",
    summary: "Free, measured, and the foundation of every honest quote.",
    detail:
      "An engineer visits your site (or works from architect's drawings) and measures what your rooms actually lose: floor build-up, glazing, orientation, insulation. The output is a per-room wattage requirement  the number every other decision hangs on. If underfloor heating isn't right for a space, this is where we say so.",
  },
  {
    id: "electric",
    Icon: Zap,
    title: "Electric system design & installation",
    summary: "Mats, cables and foil for renovations and single rooms.",
    detail:
      "From a 2 m² pooja room to a full apartment, we design the mat and cable layout around your fixed furniture, install over insulation boards, and encapsulate in flexible leveller. Most bathrooms are done in two days including tiling handover. Every circuit is resistance-tested three times and photographed before it disappears.",
  },
  {
    id: "hydronic",
    Icon: Droplets,
    title: "Hydronic system design & installation",
    summary: "Whole-home water-based heating for new builds and retrofits.",
    detail:
      "Screeded systems for new construction, 18 mm low-profile boards for renovations  designed circuit by circuit, pressure-tested before any pour, and balanced at the manifold. We size and commission the heat source too, with heat-pump packages that run radiant floors at their efficiency sweet spot.",
  },
  {
    id: "controls",
    Icon: SmartphoneNfc,
    title: "Smart controls & zoning",
    summary: "SenseWarm thermostats, schedules and whole-home zoning.",
    detail:
      "One warm floor is nice; the right rooms warm at the right hours is transformative for the bill. We zone every project room-by-room, program schedules around your household on commissioning day, and set floor-temperature limits that protect wooden finishes automatically.",
  },
  {
    id: "insulation",
    Icon: Layers,
    title: "Insulation & subfloor preparation",
    summary: "The unglamorous layer that halves your running cost.",
    detail:
      "Priming, levelling and ThermaBase insulation boards  specified for your exact subfloor. On cold concrete slabs this layer typically halves heat-up time and cuts running costs by up to 50%, which is why it appears on every quotation we issue.",
  },
  {
    id: "aftercare",
    Icon: LifeBuoy,
    title: "Warranty & after-sales support",
    summary: "10–25 year warranties, honoured by the people who installed it.",
    detail:
      "Your handover pack includes logged test results, photographs of every cable and pipe run, and registered warranty documents. Support is our own Mumbai engineering team  the same people who designed the system  plus annual health checks for hydronic installations.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Designed, installed,
            <br />
            answered for.
          </>
        }
        lead="We don't sell boxes of heating mat. We deliver warm floors  surveyed, engineered, installed by our own crews and supported for decades."
        image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2400&auto=format&fit=crop"
        imageAlt="Installer carefully laying an underfloor heating system on a prepared floor"
      >
        <Button asChild size="lg">
          <Link href="/contact">
            Book a free survey
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </PageHero>

      {/* Services grid */}
      <section className="container-site py-24 md:py-32">
        <SectionHeading
          eyebrow="What we do"
          title="Six services, one warm outcome"
          lead="Expand any service for the detail  or skip straight to booking a survey and we'll walk you through it in person."
        />
        {/*
          The icon is rendered here rather than passed as a component: only
          plain data and elements cross the Server → Client boundary.
        */}
        <ServiceScroller
          services={services.map(({ id, Icon, title, summary }) => ({
            id,
            title,
            summary,
            icon: <Icon className="size-7" aria-hidden />,
          }))}
          className="mt-14"
        />
      </section>

      {/* Detail accordion */}
      <section className="bg-cream-200 py-24 md:py-32">
        <div className="container-site grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <SectionHeading
              eyebrow="In detail"
              title="What each service actually includes"
              lead="No fine print, no 'as per site conditions'. This is the scope, in plain language."
            />
          </div>
          <Reveal className="lg:col-span-3">
            <Accordion type="single" collapsible defaultValue="survey">
              {services.map(({ id, title, detail }) => (
                <AccordionItem key={id} value={id} id={id} className="scroll-mt-28">
                  <AccordionTrigger>{title}</AccordionTrigger>
                  <AccordionContent>{detail}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      <Process />

      <CtaBanner
        title="Start with the free part"
        lead="The survey and heat-loss study cost nothing and commit you to nothing. Worst case, you learn exactly what your rooms lose in winter."
      />
    </>
  );
}
