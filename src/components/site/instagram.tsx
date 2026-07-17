import * as React from "react";
import { Instagram as InstagramIcon } from "lucide-react";

import { INSTAGRAM, SECTION } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

/**
 * Instagram — layout scaffolded for a future feed integration.
 * Replace `PLACEHOLDER_POSTS` with real posts (Graph API / oEmbed / Basic Display)
 * later; the grid + card shape stay the same.
 */
const PLACEHOLDER_POSTS = Array.from({ length: 6 }, (_, i) => ({ id: i }));

export function Instagram() {
  return (
    <section
      id={SECTION.instagram}
      aria-labelledby="instagram-title"
      className="relative scroll-mt-24 border-t border-white/[0.06] py-24 sm:py-32"
    >
      <div className="container">
        <Reveal className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/45">
              @ no Instagram
            </p>
            <h2
              id="instagram-title"
              className="mt-4 text-balance text-[clamp(1.9rem,5.2vw,3.25rem)] font-semibold leading-[1.05] tracking-tightest text-white"
            >
              Acompanhe a Nexus
            </h2>
          </div>

          <Button asChild variant="glass" size="md">
            <a href={INSTAGRAM.url} target="_blank" rel="noopener noreferrer">
              <InstagramIcon className="size-[18px]" />
              Seguir {INSTAGRAM.handle}
            </a>
          </Button>
        </Reveal>

        {/* Feed placeholder grid */}
        <div className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
          {PLACEHOLDER_POSTS.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.05}>
              <a
                href={INSTAGRAM.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver publicações de ${INSTAGRAM.handle}`}
                className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-[hsl(240_16%_6%/0.88)] shadow-card backdrop-blur-[18px] transition-[border-color,box-shadow] duration-500 ease-apple hover:border-[hsl(var(--nexus-green)/0.3)] hover:shadow-glow-green-sm"
              >
                <InstagramIcon
                  className="size-6 text-white/20 transition-all duration-500 ease-apple group-hover:scale-110 group-hover:text-white/40"
                  strokeWidth={1.5}
                />
                {/* future <img> post goes here */}
              </a>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-white/35">
          Publicações reais em breve.
        </p>
      </div>
    </section>
  );
}
