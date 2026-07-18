import type { StackedProduct } from "@/components/products/stacked-product-reveal";
import { getProduct, type Product } from "@/lib/products";

/**
 * Maps any product onto a deck card, leading with its first spec — used by the
 * full-range explorer, where the products shown depend on the active filter.
 */
export function toStackedProduct(product: Product): StackedProduct {
  const [label, value] = Object.entries(product.specs)[0] ?? ["Spec", "—"];
  return {
    slug: product.slug,
    name: product.name,
    tagline: product.tagline,
    spec: { label, value },
    price: product.price,
    image: product.images[0],
  };
}

/**
 * The three flagship systems shown in the stacked reveal, in the order they
 * peel away — the best-selling mat, the low-profile hydronic retrofit, and the
 * thermostat that runs them both.
 */
const DECK: { slug: string; specKey: string }[] = [
  { slug: "stickymat-200", specKey: "Output" },
  { slug: "aquaboard-low-profile", specKey: "Build-up height" },
  { slug: "sensewarm-pro", specKey: "Connectivity" },
];

export function getStackedDeck(): StackedProduct[] {
  return DECK.flatMap(({ slug, specKey }) => {
    const product = getProduct(slug);
    if (!product) return [];

    // Fall back to the first spec if the named one was renamed in the data.
    const [label, value] =
      specKey in product.specs
        ? [specKey, product.specs[specKey]]
        : (Object.entries(product.specs)[0] ?? ["Spec", "—"]);

    return [
      {
        slug: product.slug,
        name: product.name,
        tagline: product.tagline,
        spec: { label, value },
        price: product.price,
        image: product.images[0],
      } satisfies StackedProduct,
    ];
  });
}
