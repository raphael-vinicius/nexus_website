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
 *   iOS, Android). A VP9/AV1 .webm was benchmarked and dropped: for this
 *   high-motion HDR footage it measured larger AND lower quality than x264.
 * - Under prefers-reduced-motion we render the poster only (no autoplay).
 * - The <video> is deferred until the page is past its busy hydration window
 *   (requestIdleCallback after `load`). Under autoplay the `preload` attribute
 *   is effectively ignored, so deferring the mount — not tweaking preload — is
 *   what actually frees the mobile main thread / bandwidth and shortens TTI.
 *   The poster covers the gap, so the visual is unchanged.
 */
export function HeroVideo({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [mode, setMode] = React.useState<Mode | null>(null);
  // Becomes true only once we're past the critical interactivity window.
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setMode(mq.matches ? "desktop" : "mobile");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Defer the video load/playback to idle time (past TTI). The poster stays on
  // screen throughout, so the appearance is identical — we only stop the video
  // from competing with hydration on mobile.
  React.useEffect(() => {
    let cancelled = false;
    let idleId: number | undefined;
    let timerId: number | undefined;

    const start = () => {
      if (!cancelled) setReady(true);
    };

    const begin = () => {
      if (cancelled) return;
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(start, { timeout: 2000 });
      } else {
        timerId = window.setTimeout(start, 1200);
      }
    };

    // Wait until the page's critical resources are done, then idle.
    if (document.readyState === "complete") {
      begin();
    } else {
      window.addEventListener("load", begin, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", begin);
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
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

      {mode && !reduce && ready && (
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
          <source src={`/videos/${base}.mp4`} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
