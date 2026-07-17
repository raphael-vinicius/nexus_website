import * as React from "react";
import { ShieldCheck, Sparkles, MessagesSquare } from "lucide-react";

import { SECTION } from "@/lib/site";
import { Reveal } from "@/components/motion/reveal";

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Procedência",
    desc: "Produtos originais, com garantia e nota.",
  },
  {
    icon: Sparkles,
    title: "Curadoria",
    desc: "Só o que tem o padrão Nexus entra na loja.",
  },
  {
    icon: MessagesSquare,
    title: "Atendimento",
    desc: "Perto de você, do primeiro contato ao pós-venda.",
  },
];

export function About() {
  return (
    <section
      id={SECTION.about}
      aria-labelledby="sobre-title"
      className="relative scroll-mt-24 border-t border-white/[0.06] py-24 sm:py-32"
    >
      <div className="container">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/45">
            Sobre a Nexus
          </p>
          <h2
            id="sobre-title"
            className="mt-5 text-balance text-[clamp(1.9rem,5.2vw,3.25rem)] font-semibold leading-[1.1] tracking-tightest text-white"
          >
            A melhor tecnologia,{" "}
            <span className="text-neon">perto de você.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/65 sm:text-lg">
            Unimos a qualidade da Apple à liberdade da mobilidade elétrica —
            com procedência, curadoria e um atendimento que fala a sua língua.
          </p>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.07] shadow-card sm:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 0.08}
              className="group flex flex-col items-center gap-3 bg-[hsl(240_16%_6%/0.88)] px-6 py-10 text-center backdrop-blur-[18px] transition-colors duration-500 ease-apple hover:bg-[hsl(240_16%_9%/0.88)] sm:items-start sm:text-left"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white transition-colors duration-500 ease-apple group-hover:border-[hsl(var(--nexus-green)/0.45)] group-hover:text-[hsl(var(--nexus-green))]">
                <p.icon className="size-[22px]" strokeWidth={1.6} />
              </span>
              <h3 className="mt-1 text-lg font-medium text-white">{p.title}</h3>
              <p className="text-sm leading-relaxed text-white/55">{p.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
