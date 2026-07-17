import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export function CtaBanner({
  title = "Ready for your last cold winter?",
  lead = "Send us a floor plan or book a free site survey — we'll design your system, price it room by room, and show you the running costs before you commit to anything.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section className="container-site py-24 md:py-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-card bg-charcoal-950 px-6 py-16 text-center md:px-16 md:py-24">
          <div
            aria-hidden
            className="absolute -top-40 left-1/2 size-150 -translate-x-1/2 rounded-full bg-copper-500/25 blur-3xl"
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-display-2 text-white">{title}</h2>
            <p className="mx-auto mt-5 max-w-xl text-lead text-white/70">{lead}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Magnetic>
                <Button asChild size="lg">
                  <Link href="/contact">
                    Book a free survey
                    <ArrowRight aria-hidden />
                  </Link>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild size="lg" variant="outline-light">
                  <Link href="/products">Browse systems</Link>
                </Button>
              </Magnetic>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
