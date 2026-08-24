import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { PostCard } from "@/components/blog/post-card";
import { CtaBanner } from "@/components/cta-banner";
import { BenefitsPinned } from "@/components/home/benefits-pinned";
import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";
import { Testimonials } from "@/components/home/testimonials";
import { Marquee } from "@/components/motion/marquee";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Product360Reveal } from "@/components/products/product-360-reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/lib/blog";
import { toStackedProduct } from "@/lib/product-deck";
import { getFeaturedProducts } from "@/lib/products";
import { partners } from "@/lib/site";

export const metadata: Metadata = {
  title: "ProWarm India  Underfloor Heating Solutions",
  description:
    "Electric and water-based underfloor heating for Indian homes  designed, installed and guaranteed for 10 years. Warm floors, 40% lower running costs.",
};

export default async function HomePage() {
  const featured = getFeaturedProducts();
  const latestPosts = (await getAllPosts()).slice(0, 3);

  return (
    <>
      <Hero />
      <Stats />

      {/* Trusted-by marquee */}
      <section className="border-b border-charcoal-900/8 bg-cream-100 py-14" aria-label="Developers who specify ProWarm">
        <Reveal>
          <p className="text-eyebrow text-center text-charcoal-400">
            Specified by India&apos;s leading developers
          </p>
          <Marquee className="mt-8">
            {partners.map((partner) => (
              <span
                key={partner}
                className="mx-10 font-display text-2xl whitespace-nowrap text-charcoal-300"
              >
                {partner}
              </span>
            ))}
          </Marquee>
        </Reveal>
      </section>

      <BenefitsPinned />

      {/* Featured products */}
      <section className="bg-cream-100 py-24 md:py-32">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="The systems"
              title="One warm floor, four ways to get there"
              lead="Electric mats for quick renovations, water-based systems for whole homes, and the smart controls that tie them together."
            />
            <Reveal delay={0.15}>
              <Button asChild variant="outline">
                <Link href="/products">
                  All products
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>
        {/* Each featured product zooms in, turns a full 360°, then hands over. */}
        <Product360Reveal
          products={featured.map(toStackedProduct)}
          className="mt-14"
        />
      </section>

      <Testimonials />

      {/* Latest from the blog */}
      <section className="bg-cream-100 pt-24 md:pt-32">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="The journal"
              title="Warm-floor know-how"
              lead="Honest costs, design guides and engineering notes from a decade of Indian installations."
            />
            <Reveal delay={0.15}>
              <Button asChild variant="outline">
                <Link href="/blog">
                  All articles
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            </Reveal>
          </div>
          <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
            {latestPosts.map((post) => (
              <RevealItem key={post.slug} className="h-full">
                <PostCard post={post} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
