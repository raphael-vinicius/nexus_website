"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";

import { cn } from "@/lib/utils";

type RevealProps = HTMLMotionProps<"div"> & {
  /** delay in seconds */
  delay?: number;
  /** vertical travel in px (kept small — premium, not flashy) */
  y?: number;
  as?: React.ElementType;
};

/**
 * Apple-like entrance: opacity + gentle translateY + slight blur.
 * Triggers once on scroll-in. Fully disabled under prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  ...props
}: RevealProps) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: reduce
      ? { opacity: 0 }
      : { opacity: 0, y, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
