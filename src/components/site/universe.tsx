"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Apple, Bike, ArrowUpRight } from "lucide-react";

import { SECTION } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

type Universe = {
  key: string;
  eyebrow: string;
  title: string;
  categories: string[];
  href: string;
  icon: React.ElementType;
  /** optional brand image icon (overrides `icon` when present) */
  image?: string;
  imageW?: number;
  imageH?: number;
  imageClass?: string;
  /** accent used only as a discreet glow */
  accent: "green" | "purple";
};

const UNIVERSES: Universe[] = [
  {
    key: "apple",
    eyebrow: "",
    title: "Apple",
    categories: ["iPhones", "iPads", "MacBooks", "Acessórios"],
    href: "/apple",
    icon: Apple,
    image: "/apple-logo.png",
    imageW: 209,
    imageH: 256,
    imageClass: "h-[22px]",
    accent: "green",
  },
  {
    key: "mobilidade",
    eyebrow: "",
    title: "Motos Elétricas",
    categories: ["Autopropelidos", "Patinetes", "Triciclos"],
    href: "/mobilidade",
    icon: Bike,
    image: "/autopropelido.webp",
    imageW: 242,
    imageH: 256,
    imageClass: "h-[30px]",
    accent: "purple",
  },
];

export function Universe() {
  return (
    <section
      id={SECTION.universe}
      aria-labelledby="universo-title"
      className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32"
    >
      {/* ambient glow to spotlight the cards */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[58%] h-[520px] w-[min(90%,900px)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,hsl(var(--nexus-green)/0.06),transparent_70%)] blur-[90px]"
      />
      <div className="container relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/45">
            Duas linhas. Um só padrão.
          </p>
          <h2
            id="universo-title"
            className="mt-4 text-balance text-[clamp(2rem,6vw,3.5rem)] font-semibold leading-[1.05] tracking-tightest text-white"
          >
            Escolha seu universo
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
          {UNIVERSES.map((u, i) => (
            <Reveal key={u.key} delay={i * 0.08}>
              <UniverseCard universe={u} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function UniverseCard({ universe }: { universe: Universe }) {
  const reduce = useReducedMotion();
  const Icon = universe.icon;
  const glow =
    universe.accent === "green"
      ? "bg-[radial-gradient(70%_60%_at_50%_0%,hsl(var(--nexus-green)/0.14),transparent_70%)]"
      : "bg-[radial-gradient(70%_60%_at_50%_0%,hsl(var(--nexus-purple)/0.16),transparent_70%)]";
  const hoverBorder =
    universe.accent === "green"
      ? "hover:border-[hsl(var(--nexus-green)/0.3)]"
      : "hover:border-[hsl(var(--nexus-purple)/0.34)]";

  return (
    <Link href={universe.href} className="block">
      <motion.div
      whileHover={reduce ? undefined : { y: -6 }}
      whileTap={reduce ? undefined : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className={cn(
        // smoked-glass panel: dark fill ~80% + backdrop blur, subtle border
        "group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.08] bg-[hsl(240_16%_6%/0.88)] p-7 shadow-card backdrop-blur-[18px] hairline sm:min-h-[380px] sm:p-9",
        "transition-[border-color,box-shadow,transform] duration-500 ease-apple hover:shadow-card-hover",
        hoverBorder,
      )}
      >
      {/* surface depth — subtle diagonal sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent"
      />
      {/* discreet accent glow on hover */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-apple group-hover:opacity-100",
          glow,
        )}
      />

      <div className="relative flex items-start justify-between">
        <span
          className={cn(
            "inline-flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white transition-colors duration-500 ease-apple",
            universe.accent === "green"
              ? "group-hover:border-[hsl(var(--nexus-green)/0.5)] group-hover:text-[hsl(var(--nexus-green))]"
              : "group-hover:border-[hsl(var(--nexus-purple)/0.55)] group-hover:text-[hsl(var(--nexus-purple))]",
          )}
        >
          {universe.image ? (
            <Image
              src={universe.image}
              alt=""
              width={universe.imageW ?? 40}
              height={universe.imageH ?? 49}
              className={cn("w-auto", universe.imageClass ?? "h-[22px]")}
            />
          ) : (
            <Icon className="size-6" strokeWidth={1.6} />
          )}
        </span>
        <ArrowUpRight className="size-5 text-white/40 transition-all duration-500 ease-apple group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
      </div>

      <div className="relative mt-8">
        {universe.eyebrow && (
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/40">
            {universe.eyebrow}
          </p>
        )}
        <h3 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-white sm:text-[2.1rem]">
          {universe.title}
        </h3>

        <ul className="mt-5 flex flex-wrap gap-2">
          {universe.categories.map((c) => (
            <li
              key={c}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[13px] text-white/70"
            >
              {c}
            </li>
          ))}
        </ul>

        <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-white">
          Explorar
          <ArrowUpRight className="size-4 transition-transform duration-500 ease-apple group-hover:translate-x-0.5" />
        </span>
      </div>
      </motion.div>
    </Link>
  );
}
