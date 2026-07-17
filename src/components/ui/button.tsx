import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // base — 44px+ touch target, Apple-like easing, accessible focus handled globally
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 ease-apple disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1.15em] [&_svg]:shrink-0 select-none active:scale-[0.97]",
  {
    variants: {
      variant: {
        // Primary CTA — solid white with a discreet green halo on hover
        primary:
          "bg-primary text-primary-foreground shadow-[0_1px_24px_-8px_rgba(255,255,255,0.4)] hover:bg-white hover:shadow-glow-green hover:-translate-y-px",
        // Secondary — glassy, green edge on hover + a soft light sweep
        glass:
          "relative overflow-hidden border border-white/20 bg-white/[0.04] text-white backdrop-blur-md hover:bg-white/[0.08] hover:border-[hsl(var(--nexus-green)/0.55)] hover:shadow-glow-green-sm before:pointer-events-none before:absolute before:inset-0 before:-translate-x-[160%] before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:transition-transform before:duration-700 before:ease-apple hover:before:translate-x-[160%]",
        // Subtle ghost
        ghost: "text-white/80 hover:text-white hover:bg-white/5",
        // Text link with brand underline
        link: "text-white/80 hover:text-white underline-offset-4 hover:underline rounded-none",
      },
      size: {
        sm: "h-10 px-4 text-[13px]",
        md: "h-12 px-6",
        lg: "h-[52px] px-8 text-[15px]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
