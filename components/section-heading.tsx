


import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  /** Accepts a string or JSX so a phrase (e.g. "radiant warmth.") can be highlighted. */
  lead?: ReactNode;
  /** Use on dark section backgrounds (e.g. bg-charcoal-950) — swaps text to light colors. */
  dark?: boolean;
  /** Center the heading block; also centers the eyebrow rule and divider dot. */
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  dark = false,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "max-w-3xl",
        centered && "mx-auto text-center",
        className
      )}
    >
      <p
        className={cn(
          "text-xs font-semibold tracking-[0.25em] uppercase",
          dark ? "text-copper-400" : "text-copper-600"
        )}
      >
        {eyebrow}
      </p>

      <span
        aria-hidden
        className={cn(
          "mt-3 block h-px w-14 bg-copper-500",
          centered && "mx-auto"
        )}
      />

      <h2
        className={cn(
          "mt-6 font-serif text-4xl leading-[1.12] md:text-5xl",
          dark ? "text-white" : "text-charcoal-900"
        )}
      >
        {title}
      </h2>

      {lead && (
        <>
          {/* Full-width divider with a soft glowing dot at its center */}
          <div
            aria-hidden
            className={cn(
              "relative mt-8 h-px w-full",
              dark ? "bg-white/10" : "bg-charcoal-900/10"
            )}
          >
            <span className="absolute top-1/2 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper-500 shadow-[0_0_14px_4px_rgba(196,98,42,0.45)]" />
          </div>

          <p
            className={cn(
              "mt-6 max-w-xl text-lead",
              centered && "mx-auto",
              dark ? "text-white/60" : "text-charcoal-500"
            )}
          >
            {lead}
          </p>
        </>
      )}
    </div>
  );
}
