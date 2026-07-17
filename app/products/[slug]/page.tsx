import { Check, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/cta-banner";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/products/product-gallery";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categoryLabel, getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.tagline}. ${product.price}. ${product.description[0].slice(0, 140)}…`,
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: [{ url: product.images[0].src }],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .concat(products.filter((p) => p.slug !== product.slug && p.category !== product.category))
    .slice(0, 3);

  return (
    <>
      {/* Dark band behind the fixed navbar */}
      <div className="bg-charcoal-950 pt-24 md:pt-28" aria-hidden />

      <section className="bg-charcoal-950 pb-20 text-white md:pb-28">
        <div className="container-site">
          <nav aria-label="Breadcrumb" className="pt-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/50">
              <li>
                <Link href="/products" className="transition-colors hover:text-white">
                  Products
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="size-3.5" />
              </li>
              <li>
                <Link
                  href={`/products?category=${product.category}`}
                  className="transition-colors hover:text-white"
                >
                  {categoryLabel(product.category)}
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="size-3.5" />
              </li>
              <li aria-current="page" className="text-white/80">
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <ProductGallery images={product.images} name={product.name} />
            </Reveal>

            <Reveal delay={0.1}>
              <Badge variant="on-dark">{categoryLabel(product.category)}</Badge>
              <h1 className="mt-4 text-display-2">{product.name}</h1>
              <p className="mt-3 text-lead text-white/70">{product.tagline}</p>
              <p className="mt-6 font-display text-3xl text-copper-400">{product.price}</p>

              {product.floors.length > 0 && (
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <span className="text-sm text-white/50">Works with:</span>
                  {product.floors.map((floor) => (
                    <Badge key={floor} variant="on-dark">
                      {floor}
                    </Badge>
                  ))}
                </div>
              )}

              <ul className="mt-8 space-y-3">
                {product.features.slice(0, 4).map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-white/80">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-copper-500/20">
                      <Check className="size-3 text-copper-400" aria-hidden />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">Get a quote for this system</Link>
                </Button>
                <Button asChild size="lg" variant="outline-light">
                  <Link href="/contact">Ask an engineer</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Details tabs */}
      <section className="container-site py-20 md:py-28">
        <Reveal>
          <Tabs defaultValue="overview" className="mx-auto max-w-3xl">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="features">All features</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="space-y-5 leading-relaxed text-charcoal-600">
                {product.description.map((para) => (
                  <p key={para.slice(0, 32)}>{para}</p>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="specs">
              <div className="overflow-x-auto rounded-card border border-charcoal-900/10 bg-white">
                <table className="w-full min-w-100 border-collapse text-sm">
                  <caption className="sr-only">{product.name} specifications</caption>
                  <tbody>
                    {Object.entries(product.specs).map(([key, value]) => (
                      <tr key={key} className="border-b border-charcoal-900/8 last:border-0">
                        <th scope="row" className="w-2/5 px-6 py-4 text-left font-semibold text-charcoal-900">
                          {key}
                        </th>
                        <td className="px-6 py-4 text-charcoal-600">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="features">
              <ul className="space-y-3">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-charcoal-700">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-copper-100">
                      <Check className="size-3 text-copper-600" aria-hidden />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </Reveal>
      </section>

      {/* Related */}
      <section className="bg-cream-200 py-24 md:py-28">
        <div className="container-site">
          <SectionHeading eyebrow="Pairs well with" title="Complete the system" />
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <RevealItem key={p.slug} className="h-full">
                <ProductCard product={p} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBanner
        title={`Put ${product.name.split(" ").slice(0, 2).join(" ")} under your floor`}
        lead="Tell us the rooms and the floor finish — we'll confirm compatibility, size the system and price it end to end."
      />
    </>
  );
}
