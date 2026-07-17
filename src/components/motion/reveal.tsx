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
 * Apple-like entrance: opacity + gentle translateY.
 *
 * No animated `filter: blur()` — animating `filter` forces the browser to
 * re-rasterize the layer every frame (very costly on mobile/WebKit), while
 * `opacity` + `transform` stay on the compositor. Timing, easing, delay and
 * vertical travel are unchanged, so the motion looks practically identical.
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
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
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
