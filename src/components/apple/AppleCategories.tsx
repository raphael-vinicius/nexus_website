import { APPLE_CATEGORIES, APPLE_CATEGORIES_SECTION_ID } from "@/lib/apple";
import { Reveal } from "@/components/motion/reveal";
import { CategoryCard } from "@/components/apple/CategoryCard";

export function AppleCategories() {
  return (
    <section
      id={APPLE_CATEGORIES_SECTION_ID}
      aria-labelledby="apple-categories-title"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[48%] h-[520px] w-[min(92%,980px)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,hsl(var(--nexus-green)/0.055),transparent_72%)] blur-[90px]"
      />

      <div className="container relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/45">
            Categorias
          </p>
          <h2
            id="apple-categories-title"
            className="mt-4 text-balance text-[clamp(2rem,7vw,4rem)] font-semibold leading-[1.02] tracking-tightest text-white"
          >
            Escolha por onde começar.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
          {APPLE_CATEGORIES.map((category, index) => (
            <Reveal key={category.slug} delay={index * 0.06}>
              <CategoryCard category={category} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
