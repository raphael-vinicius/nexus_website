import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronDown } from "lucide-react";

import { APPLE_CATEGORIES_SECTION_ID, APPLE_HERO_IMAGE } from "@/lib/apple";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

/**
 * Hero premium do catálogo de iPhones. Espelha a hierarquia do Hero Apple do
 * projeto (grid de duas colunas, glow verde discreto, tipografia grande).
 */
export function IphoneHero() {
  return (
    <section
      aria-labelledby="iphones-hero-title"
      className="relative overflow-hidden pt-28 sm:pt-32 lg:min-h-[92svh] lg:pt-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%] bg-[radial-gradient(70%_55%_at_50%_20%,hsl(var(--nexus-green)/0.08),transparent_70%)]"
      />

      <div className="container relative grid min-h-[720px] items-center gap-10 pb-20 sm:min-h-[780px] lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.82fr)] lg:gap-12 lg:pb-24">
        <Reveal className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
          <div className="flex justify-center lg:justify-start">
            <Button asChild variant="ghost" size="sm">
              <Link href={`/apple#${APPLE_CATEGORIES_SECTION_ID}`}>
                <ArrowLeft className="size-4" aria-hidden="true" />
                Categorias Apple
              </Link>
            </Button>
          </div>

          <p className="mt-8 text-xs font-medium uppercase tracking-[0.32em] text-white/45">
            Universo Apple
          </p>
          <h1
            id="iphones-hero-title"
            className="mt-5 text-balance text-[clamp(3rem,12vw,7rem)] font-semibold leading-[0.94] tracking-tightest text-white"
          >
            iPhone.
            <span className="mt-1 block text-white/76">
              Escolha o seu.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-prose text-balance text-base leading-relaxed text-white/64 sm:text-lg lg:mx-0">
            Do iPhone 13 ao iPhone 17 Pro Max. Compare gerações, chips e câmeras
            e encontre o modelo ideal com a curadoria e a segurança da Nexus.
          </p>
          <div className="mt-9 flex justify-center lg:justify-start">
            <Button asChild size="lg">
              <a href="#catalogo">
                Ver modelos
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
