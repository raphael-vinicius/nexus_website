"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type Mode = "mobile" | "desktop";

/**
 * Background hero video.
 *
 * - Mounts ONLY the device-appropriate video (mobile = 9:16, desktop = 16:9),
 *   so the phone never downloads the desktop file and vice-versa.
 * - Source is H.264 MP4 — universally supported (Chrome, Firefox, Safari,
 *   iOS, Android). A .webm (VP9/AV1) can be added first for extra savings.
 * - Under prefers-reduced-motion we render the poster only (no autoplay).
 */
export function HeroVideo({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [mode, setMode] = React.useState<Mode | null>(null);

  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setMode(mq.matches ? "desktop" : "mobile");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const poster =
    mode === "desktop"
      ? "/videos/poster-desktop.jpg"
      : "/videos/poster-mobile.jpg";

  const base = mode === "desktop" ? "hero-desktop" : "hero-mobile";

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-black", className)}>
      {/* Poster is always painted first → instant, stable LCP */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />

      {mode && !reduce && (
        <video
          key={base}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          aria-hidden="true"
          tabIndex={-1}
          disablePictureInPicture
        >
          {/* Add `${base}.webm` above for extra compression when available */}
          <source src={`/videos/${base}.mp4`} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
