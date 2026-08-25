import type { Metadata } from "next";
import { BlogExplorer } from "@/components/blog/blog-explorer";
import { CtaBanner } from "@/components/cta-banner";
import { PageHero } from "@/components/page-hero";
import { getAllPosts, getBlogCategories } from "@/lib/blog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Honest costs, design guides and engineering notes on underfloor heating in India  from the ProWarm team.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const categories = getBlogCategories(posts);

  return (
    <>
      <PageHero
        eyebrow="The journal"
        title="Warm-floor know-how"
        lead="What underfloor heating really costs, how it's designed, and what a decade of Indian installations has taught us. No jargon, no fluff  numbers included."
        image="https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=2400&auto=format&fit=crop"
        imageAlt="Warm, editorial living room with engineered wood flooring"
      />
      <section className="container-site py-24 md:py-32">
        <BlogExplorer posts={posts} categories={categories} />
      </section>
      <CtaBanner
        title="Prefer answers about your own floor?"
        lead="Reading is free; so is the survey. Send a floor plan and get numbers instead of generalities."
      />
    </>
  );
}
