import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
  {
    variants: {
      variant: {
        copper: "bg-copper-100 text-copper-800",
        dark: "bg-charcoal-900 text-cream-100",
        outline: "border border-charcoal-900/15 text-charcoal-700",
        "on-dark": "bg-white/10 text-white backdrop-blur-sm",
      },
    },
    defaultVariants: { variant: "copper" },
  }
);

export function Badge({
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
