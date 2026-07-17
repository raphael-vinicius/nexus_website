import Link from "next/link";
import {
  ArrowLeft,
  BatteryFull,
  Camera,
  Check,
  Cpu,
  HardDrive,
  RefreshCw,
  Smartphone,
  Wifi,
} from "lucide-react";

import { getRelatedIphones, type IPhone } from "@/lib/iphones";
import { whatsappUrl } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { ProductImage } from "@/components/apple/iphones/ProductImage";
import { IphoneCard } from "@/components/apple/iphones/IphoneCard";

type IphoneModelDetailProps = {
  iphone: IPhone;
};

type SpecRow = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
};

export function IphoneModelDetail({ iphone }: IphoneModelDetailProps) {
  const related = getRelatedIphones(iphone.slug, 4);

  const specRows: SpecRow[] = [
    { icon: Cpu, label: "Chip", value: iphone.specs.chip },
    { icon: Smartphone, label: "Tela", value: iphone.specs.display },
    { icon: Camera, label: "Câmeras", value: iphone.specs.cameras },
    { icon: BatteryFull, label: "Bateria", value: iphone.specs.battery },
    { icon: Wifi, label: "Conectividade", value: iphone.specs.connectivity },
    {
      icon: HardDrive,
      label: "Armazenamentos",
      value: (
        <div className="flex flex-wrap gap-2">
          {iphone.specs.storage.map((size) => (
            <span
              key={size}
              className="inline-flex h-8 items-center rounded-full border border-white/12 bg-white/[0.04] px-3 text-[13px] font-medium text-white/80"
            >
              {size}
            </span>
          ))}
        </div>
      ),
    },
    {
      icon: RefreshCw,
      label: "Compatibilidade",
      value: iphone.specs.compatibility,
    },
  ];

  return (
    <>
      {/* ── Hero do modelo ────────────────────────────────────────── */}
      <section
        aria-labelledby="model-title"
        className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[70%] bg-[radial-gradient(70%_55%_at_50%_18%,hsl(var(--nexus-green)/0.08),transparent_70%)]"
        />

        <div className="container relative grid items-center gap-10 pb-16 sm:pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.82fr)] lg:gap-12 lg:pb-24">
          <Reveal className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <Button asChild variant="ghost" size="sm">
                <Link href="/apple/iphones">
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  Todos os iPhones
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2.5 lg:justify-start">
              <span className="text-xs font-medium uppercase tracking-[0.28em] text-white/45">
                {iphone.year}
              </span>
              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full bg-white/25"
              />
              <span className="text-xs font-medium uppercase tracking-[0.28em] text-[hsl(var(--nexus-green))]/85">
                {iphone.line}
              </span>
            </div>

            <h1
              id="model-title"
              className="mt-4 text-balance text-[clamp(2.5rem,9vw,5rem)] font-semibold leading-[0.96] tracking-tightest text-white"
            >
              {iphone.name}
            </h1>
            <p className="mt-4 text-balance text-xl font-medium text-white/76 sm:text-2xl">
              {iphone.tagline}
            </p>
            <p className="mx-auto mt-5 max-w-prose text-balance text-base leading-relaxed text-white/62 sm:text-lg lg:mx-0">
              {iphone.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Button asChild variant="glass" size="lg">
                <a
                  href={whatsappUrl(
                    `Olá! Tenho interesse no ${iphone.name}. Poderia me passar mais informações?`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon className="size-5" />
                  Consultar no WhatsApp
                </a>
              </Button>
            </div>
          </Reveal>

          <Reveal
            delay={0.12}
            className="relative mx-auto flex w-full max-w-[380px] justify-center sm:max-w-[440px] lg:max-w-[500px]"
          >
            <div
              aria-hidden="true"
              className="absolute inset-4 top-10 rounded-full bg-[hsl(var(--nexus-green)/0.08)] blur-[90px]"
            />
            <ProductImage
              image={iphone.image}
              sizes="(min-width: 1024px) 500px, (min-width: 640px) 440px, 80vw"
              priority
              className="aspect-[4/5] w-full"
              imgClassName="drop-shadow-[0_42px_80px_rgba(0,0,0,0.66)]"
            />
          </Reveal>
        </div>
      </section>

      {/* ── Principais destaques ──────────────────────────────────── */}
      <section
        aria-labelledby="model-highlights-title"
        className="py-16 sm:py-20"
      >
        <div className="container">
          <Reveal>
            <h2
              id="model-highlights-title"
              className="text-xs font-medium uppercase tracking-[0.3em] text-white/45"
            >
              Principais destaques
            </h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
            {iphone.highlights.map((highlight, index) => (
              <Reveal key={highlight} delay={index * 0.06}>
                <div className="flex h-full items-start gap-3 rounded-3xl border border-white/[0.08] bg-[hsl(240_16%_6%/0.86)] p-6 shadow-card backdrop-blur-[18px] hairline">
                  <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--nexus-green)/0.14)]">
                    <Check
                      className="size-4 text-[hsl(var(--nexus-green))]"
                      aria-hidden="true"
                    />
                  </span>
                  <p className="text-[15px] font-medium leading-snug text-white/85">
                    {highlight}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Especificações ────────────────────────────────────────── */}
      <section
        aria-labelledby="model-specs-title"
        className="py-16 sm:py-20"
      >
        <div className="container">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/45">
              Ficha técnica
            </p>
            <h2
              id="model-specs-title"
              className="mt-4 text-balance text-[clamp(2rem,6vw,3.25rem)] font-semibold leading-[1.04] tracking-tightest text-white"
            >
              Especificações
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <dl className="mt-10 overflow-hidden rounded-3xl border border-white/[0.08] bg-[hsl(240_16%_6%/0.86)] shadow-card backdrop-blur-[18px] hairline">
              {specRows.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="grid gap-2 border-b border-white/[0.06] p-6 last:border-b-0 sm:grid-cols-[minmax(0,220px)_1fr] sm:gap-8 sm:p-7"
                >
                  <dt className="flex items-center gap-3 text-sm font-medium text-white/50">
                    <Icon
                      className="size-[18px] shrink-0 text-white/35"
                      aria-hidden="true"
                    />
                    {label}
                  </dt>
                  <dd className="text-[15px] leading-relaxed text-white/85">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ── Modelos relacionados ──────────────────────────────────── */}
      {related.length > 0 ? (
        <section
          aria-labelledby="model-related-title"
          className="py-16 sm:py-20"
        >
          <div className="container">
            <Reveal className="flex items-end justify-between gap-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/45">
                  Continue explorando
                </p>
                <h2
                  id="model-related-title"
                  className="mt-4 text-balance text-[clamp(1.75rem,5vw,2.75rem)] font-semibold leading-[1.04] tracking-tightest text-white"
                >
                  Modelos relacionados
                </h2>
              </div>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="hidden shrink-0 sm:inline-flex"
              >
                <Link href="/apple/iphones">Ver todos</Link>
              </Button>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
              {related.map((model, index) => (
                <Reveal key={model.slug} delay={index * 0.06}>
                  <IphoneCard iphone={model} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
