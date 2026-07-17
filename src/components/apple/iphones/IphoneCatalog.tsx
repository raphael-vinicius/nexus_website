"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";

import {
  IPHONES,
  getGenerations,
  getLines,
  type IPhone,
  type IPhoneLine,
} from "@/lib/iphones";
import { cn } from "@/lib/utils";
import { IphoneCard } from "@/components/apple/iphones/IphoneCard";

/** Texto pesquisável de um modelo (nome, geração e linha). */
function searchIndex(iphone: IPhone): string {
  return `${iphone.name} ${iphone.generation} ${iphone.line}`.toLowerCase();
}

type FilterChipProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function FilterChip({ active, onClick, children }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex h-9 items-center rounded-full border px-4 text-[13px] font-medium transition-all duration-300 ease-apple",
        active
          ? "border-[hsl(var(--nexus-green)/0.55)] bg-[hsl(var(--nexus-green)/0.12)] text-white shadow-glow-green-sm"
          : "border-white/12 bg-white/[0.03] text-white/60 hover:border-white/25 hover:text-white",
      )}
    >
      {children}
    </button>
  );
}

export function IphoneCatalog() {
  const reduce = useReducedMotion();
  const generations = React.useMemo(() => getGenerations(), []);
  const lines = React.useMemo(() => getLines(), []);

  const [query, setQuery] = React.useState("");
  const [generation, setGeneration] = React.useState<number | null>(null);
  const [line, setLine] = React.useState<IPhoneLine | null>(null);

  const filtered = React.useMemo(() => {
    const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

    return IPHONES.filter((iphone) => {
      if (generation !== null && iphone.generation !== generation) return false;
      if (line !== null && iphone.line !== line) return false;
      if (tokens.length > 0) {
        const haystack = searchIndex(iphone);
        if (!tokens.every((token) => haystack.includes(token))) return false;
      }
      return true;
    });
  }, [query, generation, line]);

  const hasFilters = query.trim() !== "" || generation !== null || line !== null;

  const clearAll = React.useCallback(() => {
    setQuery("");
    setGeneration(null);
    setLine(null);
  }, []);

  return (
    <section
      id="catalogo"
      aria-labelledby="iphones-catalog-title"
      className="relative scroll-mt-24 overflow-hidden pb-24 pt-4 sm:pb-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-40 h-[520px] w-[min(92%,980px)] -translate-x-1/2 bg-[radial-gradient(ellipse,hsl(var(--nexus-green)/0.05),transparent_72%)] blur-[90px]"
      />

      <div className="container relative">
        <h2 id="iphones-catalog-title" className="sr-only">
          Catálogo de iPhones
        </h2>

        {/* ── Barra de pesquisa + filtros ─────────────────────────── */}
        <div className="rounded-3xl border border-white/[0.08] bg-[hsl(240_16%_6%/0.72)] p-4 shadow-card backdrop-blur-[18px] hairline sm:p-5">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-white/40"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nome, geração ou linha…"
              aria-label="Buscar iPhones por nome, geração ou linha"
              className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.03] pl-11 pr-4 text-[15px] text-white placeholder:text-white/35 transition-colors duration-300 focus:border-[hsl(var(--nexus-green)/0.5)] focus:outline-none focus:ring-0"
            />
          </div>

          <div className="mt-4 flex flex-col gap-3 border-t border-white/[0.06] pt-4 lg:flex-row lg:items-start lg:gap-6">
            {/* Geração */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-white/35">
                <SlidersHorizontal className="size-3.5" aria-hidden="true" />
                Geração
              </span>
              {generations.map((gen) => (
                <FilterChip
                  key={gen}
                  active={generation === gen}
                  onClick={() =>
                    setGeneration((current) => (current === gen ? null : gen))
                  }
                >
                  {`iPhone ${gen}`}
                </FilterChip>
              ))}
            </div>

            {/* Linha */}
            <div className="flex flex-wrap items-center gap-2 lg:ml-auto">
              <span className="mr-1 text-[11px] font-medium uppercase tracking-[0.22em] text-white/35">
                Linha
              </span>
              {lines.map((option) => (
                <FilterChip
                  key={option}
                  active={line === option}
                  onClick={() =>
                    setLine((current) => (current === option ? null : option))
                  }
                >
                  {option}
                </FilterChip>
              ))}
            </div>
          </div>
        </div>

        {/* ── Contador + limpar ───────────────────────────────────── */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-sm text-white/50" aria-live="polite">
            {filtered.length}{" "}
            {filtered.length === 1 ? "modelo" : "modelos"}
          </p>
          <AnimatePresence>
            {hasFilters ? (
              <motion.button
                type="button"
                onClick={clearAll}
                initial={reduce ? false : { opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: 8 }}
                className="inline-flex items-center gap-1.5 text-sm text-white/55 transition-colors hover:text-white"
              >
                <X className="size-4" aria-hidden="true" />
                Limpar filtros
              </motion.button>
            ) : null}
          </AnimatePresence>
        </div>

        {/* ── Grid ────────────────────────────────────────────────── */}
        {/* Entrada com stagger discreto. Reconciliação por `key={slug}`:
            cards que permanecem mantêm o estado, os novos animam ao entrar e
            os removidos saem imediatamente — robusto e sem AnimatePresence
            (que apresentava travas de opacidade em React 19 + StrictMode). */}
        {filtered.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((iphone, index) => (
              <motion.div
                key={iphone.slug}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: reduce ? 0 : Math.min(index * 0.04, 0.32),
                }}
              >
                <IphoneCard iphone={iphone} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-3xl border border-white/[0.08] bg-[hsl(240_16%_6%/0.72)] p-12 text-center shadow-card backdrop-blur-[18px] hairline">
            <p className="text-lg font-medium text-white">
              Nenhum modelo encontrado
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-white/55">
              Tente ajustar a busca ou remover os filtros para ver todos os
              iPhones do catálogo.
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-5 text-sm font-medium text-white transition-all duration-300 ease-apple hover:border-[hsl(var(--nexus-green)/0.55)] hover:bg-white/[0.08]"
            >
              <X className="size-4" aria-hidden="true" />
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
