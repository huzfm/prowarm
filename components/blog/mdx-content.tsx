import { evaluate } from "@mdx-js/mdx";
import Image from "next/image";
import Link from "next/link";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import { slugify } from "@/lib/utils";
import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textOf((node.props as { children?: ReactNode }).children);
  }
  return "";
}

const components: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2
      id={slugify(textOf(children))}
      className="mt-12 scroll-mt-28 text-display-3 text-charcoal-900"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      id={slugify(textOf(children))}
      className="mt-8 scroll-mt-28 font-display text-xl text-charcoal-900"
      {...props}
    >
      {children}
    </h3>
  ),
  p: (props) => <p className="mt-5 leading-relaxed text-charcoal-700" {...props} />,
  a: ({ href = "", ...props }) =>
    href.startsWith("/") ? (
      <Link
        href={href}
        className="font-medium text-copper-700 underline decoration-copper-300 underline-offset-4 hover:decoration-copper-600"
        {...props}
      />
    ) : (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-copper-700 underline decoration-copper-300 underline-offset-4 hover:decoration-copper-600"
        {...props}
      />
    ),
  ul: (props) => (
    <ul className="mt-5 list-disc space-y-2 pl-6 leading-relaxed text-charcoal-700 marker:text-copper-500" {...props} />
  ),
  ol: (props) => (
    <ol className="mt-5 list-decimal space-y-2 pl-6 leading-relaxed text-charcoal-700 marker:font-semibold marker:text-copper-600" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-8 border-l-2 border-copper-500 pl-6 font-display text-xl leading-snug text-charcoal-800 italic [&_p]:mt-0 [&_p]:text-charcoal-800"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-semibold text-charcoal-900" {...props} />,
  hr: () => <hr className="mt-10 border-charcoal-900/10" />,
  table: (props) => (
    <div className="mt-8 overflow-x-auto rounded-card border border-charcoal-900/10">
      <table className="w-full min-w-130 border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props) => <thead className="bg-cream-200 text-left" {...props} />,
  th: (props) => <th className="px-4 py-3 font-semibold text-charcoal-900" {...props} />,
  td: (props) => (
    <td className="border-t border-charcoal-900/8 px-4 py-3 text-charcoal-700" {...props} />
  ),
  code: (props) => (
    <code className="rounded bg-cream-200 px-1.5 py-0.5 font-mono text-[0.85em] text-copper-800" {...props} />
  ),
  img: ({ src = "", alt = "" }) => (
    <span className="relative mt-8 block aspect-video overflow-hidden rounded-card">
      <Image
        src={typeof src === "string" ? src : ""}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 640px, 100vw"
        className="object-cover"
      />
    </span>
  ),
};

/** Compiles and renders an MDX source string on the server. */
export async function MDXContent({ source }: { source: string }) {
  const { default: Content } = await evaluate(source, {
    ...runtime,
    development: false,
    remarkPlugins: [remarkGfm],
  });
  return <Content components={components} />;
}
