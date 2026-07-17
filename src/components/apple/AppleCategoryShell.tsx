import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

import type { AppleCategory } from "@/lib/apple";
import { APPLE_CATEGORIES_SECTION_ID } from "@/lib/apple";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

type AppleCategoryShellProps = {
  category: AppleCategory;
};

function BackToCategories() {
  return (
    <Button asChild variant="ghost" size="sm">
      <Link href={`/apple#${APPLE_CATEGORIES_SECTION_ID}`}>
        <ArrowLeft className="size-4" aria-hidden="true" />
        Categorias Apple
      </Link>
    </Button>
  );
}

export function AppleCategoryShell({ category }: AppleCategoryShellProps) {
  if (category.featuredHero) {
    return (
      <section
        aria-labelledby="category-title"
        className="relative overflow-hidden pt-28 sm:pt-32 lg:min-h-[92svh] lg:pt-36"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[70%] bg-[radial-gradient(70%_55%_at_50%_20%,hsl(var(--nexus-green)/0.08),transparent_70%)]"
        />

        <div className="container relative grid min-h-[720px] items-center gap-10 pb-20 sm:min-h-[780px] lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.82fr)] lg:gap-12 lg:pb-24">
          <Reveal className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <BackToCategories />
            </div>
            <p className="mt-8 text-xs font-medium uppercase tracking-[0.32em] text-white/45">
              Universo Apple
            </p>
            <h1
              id="category-title"
              className="mt-5 text-balance text-[clamp(3rem,12vw,7rem)] font-semibold leading-[0.94] tracking-tightest text-white"
            >
              {category.title}
              {category.heroSubtitle ? (
                <span className="mt-1 block text-white/76">
                  {category.heroSubtitle}
                </span>
              ) : null}
            </h1>
            <p className="mx-auto mt-6 max-w-prose text-balance text-base leading-relaxed text-white/64 sm:text-lg lg:mx-0">
              {category.description}
            </p>
            <div className="mt-9 flex justify-center lg:justify-start">
              <span className="inline-flex h-[52px] items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.04] px-7 text-[15px] font-medium text-white/75 backdrop-blur-md">
                <Clock
                  className="size-[1.15em] text-[hsl(var(--nexus-green))]"
                  aria-hidden="true"
                />
                Catálogo em desenvolvimento
              </span>
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
              src={category.image.src}
              alt={category.image.alt}
              width={category.image.width}
              height={category.image.height}
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

  return (
    <section
      aria-labelledby="category-title"
      className="relative min-h-[72svh] overflow-hidden pt-32 sm:pt-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[min(90%,860px)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,hsl(var(--nexus-green)/0.06),transparent_70%)] blur-[90px]"
      />

      <div className="container relative pb-20 sm:pb-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <BackToCategories />

          <p className="mt-10 text-xs font-medium uppercase tracking-[0.3em] text-white/45">
            Universo Apple
          </p>
          <h1
            id="category-title"
            className="mt-4 text-balance text-[clamp(2.6rem,10vw,5.8rem)] font-semibold leading-[0.98] tracking-tightest text-white"
          >
            {category.title}
          </h1>
          <p className="mx-auto mt-6 max-w-prose text-balance text-base leading-relaxed text-white/64 sm:text-lg">
            {category.description}
          </p>

          <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-white/[0.08] bg-[hsl(240_16%_6%/0.86)] p-7 shadow-card backdrop-blur-[18px] hairline sm:p-9">
            <Clock className="mx-auto size-8 text-[hsl(var(--nexus-green))]" />
            <p className="mt-5 text-xl font-semibold tracking-tight text-white">
              Catálogo em desenvolvimento
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              Esta rota já está preparada para receber o catálogo oficial nas
              próximas sprints.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
