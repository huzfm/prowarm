import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { categoryLabel, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

/** Large editorial showcase for the flagship systems, alternating sides. */
export function ProductSpotlight({ products }: { products: Product[] }) {
  return (
    <div className="space-y-20 md:space-y-28">
      {products.map((product, i) => {
        const flipped = i % 2 === 1;
        return (
          <Reveal key={product.slug}>
            <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div
                className={cn(
                  "relative aspect-4/3 overflow-hidden rounded-card shadow-card-hover",
                  flipped && "lg:order-2"
                )}
              >
                <Parallax amount={8} className="absolute inset-0">
                  <Image
                    src={product.images[0].src}
                    alt={product.images[0].alt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="scale-110 object-cover"
                  />
                </Parallax>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-charcoal-950/25 to-transparent"
                />
                <span className="absolute bottom-5 left-5 rounded-full bg-white/95 px-4 py-2 font-display text-base text-charcoal-900 shadow-card backdrop-blur-sm">
                  {product.price}
                </span>
              </div>

              <div className={cn(flipped && "lg:order-1")}>
                <div className="flex items-center gap-3">
                  <Badge variant="copper">{categoryLabel(product.category)}</Badge>
                  <span className="text-eyebrow text-charcoal-400">
                    Flagship {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-display-3 text-charcoal-900">{product.name}</h3>
                <p className="mt-4 max-w-xl leading-relaxed text-charcoal-600">
                  {product.description[0]}
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {product.features.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-charcoal-700">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-copper-100">
                        <Check className="size-3 text-copper-600" aria-hidden />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/products/${product.slug}`}
                  className="group mt-8 inline-flex items-center gap-2 font-medium text-copper-700"
                >
                  Explore {product.name.split(" ").slice(0, 2).join(" ")}
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
