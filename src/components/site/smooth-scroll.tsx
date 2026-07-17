"use client";

import * as React from "react";

/**
 * Controlled smooth scroll for in-page (#hash) navigation.
 *
 * Instead of scrollIntoView / native anchor jumps, we compute the exact top of
 * the target section (its document offset) and animate there. Landing on the
 * section's own top guarantees the Hero (100svh) is fully above the viewport —
 * no sliver of video leaks through the translucent navbar. Depth/easing mimic
 * Apple's continuous section-to-section transitions.
 */
const DURATION = 820; // ms — long enough to feel continuous, short enough to stay crisp

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function SmoothScroll() {
  React.useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let rafId = 0;

    const onClick = (e: MouseEvent) => {
      // only plain left-clicks (let modifier-clicks open in new tabs, etc.)
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const anchor = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const hash = anchor.getAttribute("href");
      // leave the a11y skip-link to its native behaviour
      if (!hash || hash === "#" || hash === "#conteudo") return;

      const el = document.querySelector(hash);
      if (!el) return;

      e.preventDefault();

      const startY = window.scrollY;
      // target = the section's own top → Hero ends up completely off-screen.
      const destY = Math.max(
        0,
        Math.round(el.getBoundingClientRect().top + window.scrollY),
      );

      if (history.pushState) history.pushState(null, "", hash);

      const distance = destY - startY;
      if (prefersReduced || Math.abs(distance) < 4) {
        window.scrollTo(0, destY);
        return;
      }

      // suspend CSS smooth-scroll so it doesn't fight our per-frame updates
      const html = document.documentElement;
      const prevBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";

      cancelAnimationFrame(rafId);
      let cancelled = false;
      const cancel = () => {
        cancelled = true;
      };
      // if the user takes over, stop immediately (feels natural)
      window.addEventListener("wheel", cancel, { passive: true, once: true });
      window.addEventListener("touchstart", cancel, {
        passive: true,
        once: true,
      });

      const cleanup = () => {
        html.style.scrollBehavior = prevBehavior;
        window.removeEventListener("wheel", cancel);
        window.removeEventListener("touchstart", cancel);
      };

      let startTs: number | null = null;
      const step = (ts: number) => {
        if (cancelled) {
          cleanup();
          return;
        }
        if (startTs === null) startTs = ts;
        const t = Math.min(1, (ts - startTs) / DURATION);
        window.scrollTo(0, startY + distance * easeInOutCubic(t));
        if (t < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          cleanup();
        }
      };
      rafId = requestAnimationFrame(step);
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
