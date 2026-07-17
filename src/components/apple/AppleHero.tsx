import Image from "next/image";
import { ChevronDown } from "lucide-react";

import { APPLE_CATEGORIES_SECTION_ID, APPLE_HERO_IMAGE } from "@/lib/apple";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function AppleHero() {
  return (
    <section
      aria-labelledby="apple-hero-title"
      className="relative overflow-hidden pt-28 sm:pt-32 lg:min-h-[92svh] lg:pt-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%] bg-[radial-gradient(70%_55%_at_50%_20%,hsl(var(--nexus-green)/0.08),transparent_70%)]"
      />

      <div className="container relative grid min-h-[720px] items-center gap-10 pb-20 sm:min-h-[780px] lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.82fr)] lg:gap-12 lg:pb-24">
        <Reveal className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-white/45">
            Universo Apple
          </p>
          <h1
            id="apple-hero-title"
            className="mt-5 text-balance text-[clamp(3rem,12vw,7rem)] font-semibold leading-[0.94] tracking-tightest text-white"
          >
            Apple.
            <span className="mt-1 block text-white/76">
              Tecnologia que inspira.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-prose text-balance text-base leading-relaxed text-white/64 sm:text-lg lg:mx-0">
            Produtos oficiais, atendimento próximo e uma curadoria pensada para
            quem busca o ecossistema Apple com segurança.
          </p>
          <div className="mt-9 flex justify-center lg:justify-start">
            <Button asChild size="lg">
              <a href={`#${APPLE_CATEGORIES_SECTION_ID}`}>
                Explorar categorias
                <ChevronDown className="size-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </Reveal>

        <Reveal
          delay={0.12}
          className="relative mx-auto flex w-full max-w-[440px] justify-center sm:max-w-[520px] lg:max-w-[560px]"
        >
          <div
            aria-hidden="true"
            className="absolute inset-4 top-10 rounded-full bg-[hsl(var(--nexus-green)/0.08)] blur-[90px]"
          />
          <Image
            src={APPLE_HERO_IMAGE.src}
            alt={APPLE_HERO_IMAGE.alt}
            width={APPLE_HERO_IMAGE.width}
            height={APPLE_HERO_IMAGE.height}
            priority
            quality={100}
            sizes="(min-width: 1024px) 560px, (min-width: 640px) 520px, 88vw"
            className="relative h-auto w-full object-contain drop-shadow-[0_42px_80px_rgba(0,0,0,0.66)]"
          />
        </Reveal>
      </div>
    </section>
  );
}
