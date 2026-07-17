import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { categoryLabel, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-card bg-white shadow-card ring-1 ring-charcoal-900/5 transition-[transform,box-shadow] duration-500 ease-(--ease-out-quart) hover:-translate-y-2 hover:shadow-card-hover motion-reduce:hover:translate-y-0"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 ease-(--ease-out-quart) group-hover:scale-105 motion-reduce:group-hover:scale-100"
        />
        {/* Scrim for legibility + hover CTA */}
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-charcoal-950/55 via-transparent to-charcoal-950/10 opacity-70 transition-opacity duration-500 group-hover:opacity-90"
        />
        <Badge className="absolute top-4 left-4" variant="on-dark">
          {categoryLabel(product.category)}
        </Badge>
        {product.featured && (
          <span className="absolute top-4 right-4 rounded-full bg-copper-500 px-3 py-1 text-xs font-semibold tracking-wide text-white shadow-[0_4px_12px_-4px_var(--color-copper-700)]">
            Popular
          </span>
        )}
        {/* Hover-revealed "view system" affordance */}
        <span className="absolute bottom-4 left-4 flex translate-y-2 items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-sm font-medium text-charcoal-900 opacity-0 backdrop-blur-sm transition-[transform,opacity] duration-500 ease-(--ease-out-quart) group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:translate-y-0">
          View system
          <ArrowUpRight className="size-4 text-copper-600" aria-hidden />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl text-charcoal-900 transition-colors group-hover:text-copper-600">
          {product.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-500">
          {product.tagline}
        </p>

        {product.floors.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {product.floors.slice(0, 3).map((floor) => (
              <span
                key={floor}
                className="rounded-full bg-cream-200 px-2.5 py-1 text-xs font-medium text-charcoal-600"
              >
                {floor}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-charcoal-900/8 pt-5">
          <span>
            <span className="block text-xs text-charcoal-400">Starting</span>
            <span className="mt-0.5 block font-display text-lg text-charcoal-900">
              {product.price}
            </span>
          </span>
          <span className="grid size-10 shrink-0 place-items-center rounded-full border border-charcoal-900/10 text-charcoal-400 transition-colors duration-300 group-hover:border-copper-500 group-hover:bg-copper-500 group-hover:text-white">
            <ArrowUpRight className="size-4" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}
