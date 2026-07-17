import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import type { ReactNode } from "react";

/** Consistent eyebrow + title + lead pattern used at the top of sections. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  dark = false,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className={cn("text-eyebrow", dark ? "text-copper-400" : "text-copper-600")}>
          {eyebrow}
        </p>
      )}
      <h2 className={cn("mt-4 text-display-2", dark ? "text-white" : "text-charcoal-900")}>
        {title}
      </h2>
      {lead && (
        <p className={cn("mt-5 text-lead", dark ? "text-white/70" : "text-charcoal-600")}>
          {lead}
        </p>
      )}
    </Reveal>
  );
}
