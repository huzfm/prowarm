import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "h-12 w-full rounded-field border border-charcoal-900/15 bg-white px-4 text-[0.9375rem] text-charcoal-900 shadow-[inset_0_1px_2px_rgb(26_26_26/0.03)] transition-colors placeholder:text-charcoal-400 focus:border-copper-500 focus:outline-none focus-visible:outline-2 aria-invalid:border-danger",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
