import { MessageCircle } from "lucide-react";

import { whatsappUrl } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { WhatsAppIcon } from "@/components/icons/whatsapp";

export function AppleCTA() {
  return (
    <section aria-labelledby="apple-cta-title" className="py-20 sm:py-28">
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[hsl(240_16%_6%/0.86)] p-7 text-center shadow-card backdrop-blur-[18px] hairline sm:p-10 lg:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_100%_at_50%_0%,hsl(var(--nexus-green)/0.08),transparent_68%)]"
            />
            <div className="relative mx-auto max-w-2xl">
              <MessageCircle className="mx-auto size-8 text-white/45" />
              <h2
                id="apple-cta-title"
                className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl"
              >
                Procurando um Apple específico?
              </h2>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-white/62 sm:text-base">
                Fale com a Nexus para receber orientação sobre disponibilidade,
                condições e próximos produtos do catálogo.
              </p>
              <div className="mt-8 flex justify-center">
                <Button asChild variant="glass" size="lg">
                  <a
                    href={whatsappUrl(
                      "Olá! Visitei o universo Apple da Nexus Importados e gostaria de mais informações.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon className="size-5" />
                    Falar no WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
