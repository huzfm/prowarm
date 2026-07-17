import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-card bg-charcoal-900/8 motion-reduce:animate-none",
        className
      )}
      {...props}
    />
  );
}
