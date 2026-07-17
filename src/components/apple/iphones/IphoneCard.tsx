import Link from "next/link";
import { ArrowUpRight, Cpu, Monitor } from "lucide-react";

import type { IPhone } from "@/lib/iphones";
import { cn } from "@/lib/utils";
import { ProductImage } from "@/components/apple/iphones/ProductImage";

type IphoneCardProps = {
  iphone: IPhone;
  className?: string;
};

/**
 * Card premium de um modelo de iPhone. Segue o padrão visual dos cards Apple do
 * projeto (superfície escura, hairline, hover com leve elevação + halo verde).
 */
export function IphoneCard({ iphone, className }: IphoneCardProps) {
  return (
    <Link
      href={`/apple/iphones/${iphone.slug}`}
      aria-label={`Ver detalhes do ${iphone.name}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[hsl(240_16%_6%/0.88)] shadow-card backdrop-blur-[18px] hairline",
        "transition-[border-color,box-shadow,transform] duration-500 ease-apple hover:-translate-y-1.5 hover:border-[hsl(var(--nexus-green)/0.3)] hover:shadow-card-hover",
        "focus-visible:-translate-y-1.5 focus-visible:border-[hsl(var(--nexus-green)/0.3)]",
        className,
      )}
    >
      {/* Área da imagem — altura fixa idêntica em todos os cards. object-contain
          garante que o aparelho respire, fique centralizado e nunca distorça. */}
      <div className="relative overflow-hidden p-6 pb-0">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 top-8 h-40 rounded-full bg-[hsl(var(--nexus-green)/0.06)] opacity-0 blur-[60px] transition-opacity duration-700 ease-apple group-hover:opacity-100"
        />
        <ProductImage
          image={iphone.image}
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 45vw, 90vw"
          className="h-[248px]"
          imgClassName="transition-transform duration-700 ease-apple group-hover:scale-[1.045]"
        />
      </div>

      <div className="relative flex flex-1 flex-col p-6 pt-5 sm:p-7 sm:pt-6">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/38">
            {iphone.year}
          </span>
          <span
            aria-hidden="true"
            className="h-1 w-1 rounded-full bg-white/20"
          />
          <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-[hsl(var(--nexus-green))]/80">
            {iphone.line}
          </span>
        </div>

        <h3 className="mt-2.5 text-2xl font-semibold tracking-tight text-white">
          {iphone.name}
        </h3>

        {/* Ficha rápida: chip e tela. */}
        <dl className="mt-4 space-y-2 text-sm text-white/60">
          <div className="flex items-center gap-2.5">
            <Cpu
              className="size-4 shrink-0 text-white/35"
              aria-hidden="true"
            />
            <dt className="sr-only">Chip</dt>
            <dd>{iphone.chip}</dd>
          </div>
          <div className="flex items-center gap-2.5">
            <Monitor
              className="size-4 shrink-0 text-white/35"
              aria-hidden="true"
            />
            <dt className="sr-only">Tela</dt>
            <dd>Tela de {iphone.displaySize}</dd>
          </div>
        </dl>

        <span className="mt-6 inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-5 text-sm font-medium text-white transition-all duration-300 ease-apple group-hover:border-[hsl(var(--nexus-green)/0.55)] group-hover:bg-white/[0.08] group-hover:shadow-glow-green-sm">
          Ver detalhes
          <ArrowUpRight
            className="size-4 transition-transform duration-500 ease-apple group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
