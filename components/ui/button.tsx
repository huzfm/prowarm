import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform,opacity] duration-300 ease-(--ease-out-quart) select-none active:scale-[0.97] active:opacity-90 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1.1em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-copper-500 text-white shadow-[0_8px_20px_-8px_var(--color-copper-700)] hover:bg-copper-600",
        outline:
          "border border-charcoal-900/20 bg-transparent text-charcoal-900 hover:border-charcoal-900/40 hover:bg-charcoal-900/5",
        "outline-light":
          "border border-white/30 bg-white/5 text-white backdrop-blur-sm hover:border-white/60 hover:bg-white/10",
        ghost: "bg-transparent text-charcoal-900 hover:bg-charcoal-900/5",
        white: "bg-white text-charcoal-900 hover:bg-cream-200",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-[0.9375rem]",
        lg: "h-13 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
