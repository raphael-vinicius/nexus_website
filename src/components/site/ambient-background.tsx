import * as React from "react";

/**
 * Global ambient background — sits behind the whole page (fixed, non-interactive).
 *
 * Pure light, no patterns: base #050507 + large brand glows (green + purple) at
 * very low opacity. Depth comes from light, not geometry.
 *
 * The glows are painted as radial-gradients (color → transparent), NOT as solid
 * fills + `filter: blur()`. At these opacities a gradient falloff reads the same
 * as a blurred blob, but it is painted in a single pass — with no per-layer
 * offscreen buffer and no huge blur convolution, which was the expensive
 * first-paint cost on WebKit/iPhone. Positions, sizes, colours and the vignette
 * are unchanged. Kept discreet so the products and the hero video stay the
 * protagonists.
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* green — upper left */}
      <div className="absolute -left-[18%] -top-[22%] h-[75vh] w-[70vw] [background:radial-gradient(ellipse,hsl(var(--nexus-green)/0.09),transparent_70%)]" />
      {/* purple — lower right */}
      <div className="absolute -bottom-[25%] -right-[16%] h-[75vh] w-[65vw] [background:radial-gradient(ellipse,hsl(var(--nexus-purple)/0.08),transparent_70%)]" />
      {/* faint green — center depth */}
      <div className="absolute left-1/2 top-[42%] h-[55vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 [background:radial-gradient(ellipse,hsl(var(--nexus-green)/0.05),transparent_70%)]" />
      {/* faint purple — upper right, balances the composition */}
      <div className="absolute -top-[12%] right-[6%] h-[45vh] w-[42vw] [background:radial-gradient(ellipse,hsl(var(--nexus-purple)/0.06),transparent_70%)]" />
      {/* discreet vignette — frames the light, adds depth (no pattern) */}
      <div className="absolute inset-0 [background:radial-gradient(120%_100%_at_50%_45%,transparent_55%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}
