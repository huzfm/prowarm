import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-32 w-full rounded-field border border-charcoal-900/15 bg-white px-4 py-3 text-[0.9375rem] text-charcoal-900 shadow-[inset_0_1px_2px_rgb(26_26_26/0.03)] transition-colors placeholder:text-charcoal-400 focus:border-copper-500 focus:outline-none focus-visible:outline-2 aria-invalid:border-danger",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
