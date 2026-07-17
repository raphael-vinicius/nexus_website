import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { AppleCategory } from "@/lib/apple";
import { cn } from "@/lib/utils";

type CategoryCardProps = {
  category: AppleCategory;
  className?: string;
};

export function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <Link
      href={category.href}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[hsl(240_16%_6%/0.88)] shadow-card backdrop-blur-[18px] hairline",
        "transition-[border-color,box-shadow,transform] duration-500 ease-apple hover:-translate-y-1.5 hover:border-[hsl(var(--nexus-green)/0.3)] hover:shadow-card-hover",
        className,
      )}
    >
      {/* Área da imagem — altura fixa e idêntica em todos os cards.
          object-contain + padding garantem que o produto respire, fique
          centralizado (H e V) e nunca seja cortado ou distorcido. */}
      <div className="relative h-[240px] shrink-0 overflow-hidden p-6">
        <Image
          src={category.image.src}
          alt={category.image.alt}
          width={category.image.width}
          height={category.image.height}
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="h-full w-full object-contain transition-transform duration-700 ease-apple group-hover:scale-[1.035]"
        />
      </div>

      <div className="relative flex flex-1 flex-col justify-between p-6 sm:p-7">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/38">
            Apple
          </p>
          <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            {category.title}
          </h3>
          {/* Altura reservada para 2 linhas: mantém todos os cards com a mesma
              altura, independentemente do tamanho da descrição. */}
          <p className="mt-4 line-clamp-2 min-h-[2.875rem] text-pretty text-sm leading-relaxed text-white/62">
            {category.description}
          </p>
        </div>

        <span className="mt-8 inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-5 text-sm font-medium text-white transition-all duration-300 ease-apple group-hover:border-[hsl(var(--nexus-green)/0.55)] group-hover:bg-white/[0.08] group-hover:shadow-glow-green-sm">
          Explorar
          <ArrowUpRight
            className="size-4 transition-transform duration-500 ease-apple group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
