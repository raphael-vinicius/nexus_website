import * as React from "react";

/**
 * Global ambient background — sits behind the whole page (fixed, non-interactive).
 *
 * Pure light, no patterns: base #050507 + large, heavily-blurred brand glows
 * (green + purple) at very low opacity. Depth comes from light, not geometry.
 * Kept discreet so the products and the hero video stay the protagonists.
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* green — upper left */}
      <div className="absolute -left-[18%] -top-[22%] h-[75vh] w-[70vw] rounded-full bg-[hsl(var(--nexus-green)/0.09)] blur-[200px]" />
      {/* purple — lower right */}
      <div className="absolute -bottom-[25%] -right-[16%] h-[75vh] w-[65vw] rounded-full bg-[hsl(var(--nexus-purple)/0.08)] blur-[210px]" />
      {/* faint green — center depth */}
      <div className="absolute left-1/2 top-[42%] h-[55vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--nexus-green)/0.05)] blur-[190px]" />
      {/* faint purple — upper right, balances the composition */}
      <div className="absolute -top-[12%] right-[6%] h-[45vh] w-[42vw] rounded-full bg-[hsl(var(--nexus-purple)/0.06)] blur-[180px]" />
      {/* discreet vignette — frames the light, adds depth (no pattern) */}
      <div className="absolute inset-0 [background:radial-gradient(120%_100%_at_50%_45%,transparent_55%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}
