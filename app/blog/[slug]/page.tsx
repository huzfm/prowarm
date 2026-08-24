import { Clock } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/blog/mdx-content";
import { PostCard } from "@/components/blog/post-card";
import { ShareButtons } from "@/components/blog/share-buttons";
import { Toc } from "@/components/blog/toc";
import { CtaBanner } from "@/components/cta-banner";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { getPostSource, getRelatedPosts, getToc } from "@/lib/blog";
import { siteConfig } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostSource(slug);
  if (!post) return {};
  const meta = post;
  return {
    title: meta.seoTitle ?? meta.title,
    description: meta.seoDescription ?? meta.excerpt,
    alternates: meta.canonicalUrl ? { canonical: meta.canonicalUrl } : undefined,
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.excerpt,
      publishedTime: meta.date,
      authors: [meta.author.name],
      images: [{ url: meta.seoImage ?? meta.image }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostSource(slug);
  if (!post) notFound();

  const meta = post;
  const { content } = post;
  const toc = getToc(content);
  const related = await getRelatedPosts(slug, meta.category);
  const url = `${siteConfig.url}/blog/${slug}`;

  return (
    <>
      {/* Article header */}
      <header className="bg-charcoal-950 pt-40 pb-16 text-white md:pt-48 md:pb-20">
        <div className="container-site max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="on-dark">{meta.category}</Badge>
            <span className="flex items-center gap-1.5 text-sm text-white/50">
              <Clock className="size-3.5" aria-hidden />
              {meta.readingTime} min read
            </span>
          </div>
          <h1 className="mt-6 text-display-2">{meta.title}</h1>
          <p className="mt-5 max-w-2xl text-lead text-white/70">{meta.excerpt}</p>
          <div className="mt-8 flex items-center gap-4">
            <span
              aria-hidden
              className="grid size-12 place-items-center rounded-full bg-copper-500 font-display text-lg"
            >
              {meta.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
            <div>

            {meta.schemaMarkup && (
              <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: meta.schemaMarkup }} />
            )}
              <p className="font-medium">{meta.author.name}</p>
              <p className="text-sm text-white/50">
                {meta.author.role} · <time dateTime={meta.date}>{formatDate(meta.date)}</time>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Cover image */}
      <div className="container-site max-w-5xl">
        <div className="relative -mt-0 aspect-21/9 overflow-hidden rounded-b-card shadow-card">
          <Image
            src={meta.image}
            alt={meta.imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 960px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Body + TOC */}
      <div className="container-site grid gap-12 py-16 md:py-20 lg:grid-cols-[1fr_16rem] lg:gap-16">
        <article className="mx-auto w-full max-w-2xl min-w-0 lg:mx-0 lg:ml-auto">
          <MDXContent source={content} html />

          <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-charcoal-900/10 pt-8">
            <div className="flex flex-wrap gap-2">
              {meta.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  #{tag}
                </Badge>
              ))}
            </div>
            <ShareButtons url={url} title={meta.title} />
          </div>

          {/* Author card */}
          <div className="mt-10 flex items-start gap-5 rounded-card bg-cream-200 p-7">
            <span
              aria-hidden
              className="grid size-14 shrink-0 place-items-center rounded-full bg-copper-500 font-display text-xl text-white"
            >
              {meta.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
            <div>
              <p className="font-display text-lg text-charcoal-900">
                Written by {meta.author.name}
              </p>
              <p className="mt-1 text-sm text-copper-700">{meta.author.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-600">
                Part of the ProWarm India team designing and installing radiant
                heating across the country since 2012.{" "}
                <Link href="/about" className="font-medium text-copper-700 underline underline-offset-4">
                  Meet the team
                </Link>
                .
              </p>
            </div>
          </div>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <Toc entries={toc} />
          </div>
        </aside>
      </div>

      {/* Related */}
      <section className="bg-cream-200 py-24">
        <div className="container-site">
          <SectionHeading eyebrow="Keep reading" title="Related articles" />
          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
            {related.map((p) => (
              <RevealItem key={p.slug} className="h-full">
                <PostCard post={p} />
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-12">
            <Link
              href="/blog"
              className="font-medium text-copper-700 underline decoration-copper-300 underline-offset-4 hover:decoration-copper-600"
            >
              ← Back to all articles
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
