import * as React from "react";

import { SECTION, whatsappUrl } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp";

/**
 * Home hero.
 *
 * The entrance used to be a Framer Motion `initial="hidden"` stagger, which
 * renders every line at `opacity:0` in the SSR HTML — so the hero stayed
 * invisible until React hydrated (~7s on a real iPhone), then appeared all at
 * once. Now the content is a plain, server-rendered tree that is VISIBLE in the
 * initial HTML and fades up via a pure-CSS animation (`.hero-rise`) that runs on
 * the browser's paint clock, not on hydration. First Contentful Paint no longer
 * waits for JS. The staggered delays mirror the previous motion timing; the
 * `blur` was dropped (expensive on WebKit, same call we made for Reveal).
 */
const RISE_DELAYS = ["150ms", "290ms", "430ms", "570ms"] as const;

export function Hero() {
  return (
    <section
      id={SECTION.hero}
      aria-label="Apresentação"
      className="relative flex h-[100svh] min-h-[560px] w-full flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Content ─────────────────────────────────────────────────── */}
      {/* Rendered visible in the SSR HTML; `.hero-rise` fades it in at first
          paint (no dependency on hydration). */}
      <div className="container relative z-10 flex flex-col items-center text-center">
        <p
          style={{ animationDelay: RISE_DELAYS[0] }}
          className="hero-rise mb-5 text-xs font-medium uppercase tracking-[0.32em] text-white/55"
        >
          Nexus Importados
        </p>

        <h1
          style={{ animationDelay: RISE_DELAYS[1] }}
          className="hero-rise max-w-[15ch] text-balance text-[clamp(2.35rem,8.5vw,5.25rem)] font-semibold leading-[1.02] tracking-tightest text-white [text-shadow:0_2px_40px_rgba(0,0,0,0.45)]"
        >
          Tecnologia que acompanha{" "}
          seu <span className="text-neon">estilo de vida.</span>
        </h1>

        <p
          style={{ animationDelay: RISE_DELAYS[2] }}
          className="hero-rise mt-6 text-balance text-base text-white/75 sm:text-lg"
        >
          Qualidade Apple. Mobilidade Elétrica.{" "}
          <span className="text-white">É Nexus.</span>
        </p>

        <div
          style={{ animationDelay: RISE_DELAYS[3] }}
          className="hero-rise mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
        >
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a href={`#${SECTION.universe}`}>Explorar</a>
          </Button>
          <Button
            asChild
            variant="glass"
            size="lg"
            className="w-full sm:w-auto"
          >
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="size-5" />
              WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
