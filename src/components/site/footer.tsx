import * as React from "react";
import { MapPin, Clock } from "lucide-react";

import {
  BRAND,
  CONTACT,
  INSTAGRAM,
  SECTION,
  whatsappUrl,
} from "@/lib/site";
import { Logo } from "@/components/site/logo";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { Instagram as InstagramIcon } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id={SECTION.footer}
      className="relative scroll-mt-24 border-t border-white/[0.08]"
    >
      {/* discreet green seam glow at the top edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--nexus-green)/0.45)] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(60%_100%_at_50%_0%,hsl(var(--nexus-green)/0.05),transparent_70%)]"
      />
      <div className="container relative py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo className="h-9 w-auto" />
            <p className="mt-4 max-w-xs text-pretty text-sm leading-relaxed text-white/55">
              {BRAND.tagline}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 text-white/80 transition-colors hover:border-white/25 hover:text-white"
              >
                <WhatsAppIcon className="size-[18px]" />
              </a>
              <a
                href={INSTAGRAM.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 text-white/80 transition-colors hover:border-white/25 hover:text-white"
              >
                <InstagramIcon className="size-[18px]" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.24em] text-white/40">
              Contato
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/65">
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <WhatsAppIcon className="size-4 shrink-0" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <InstagramIcon className="size-4 shrink-0" />
                  {INSTAGRAM.handle}
                </a>
              </li>
            </ul>
          </div>

          {/* Visit */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.24em] text-white/40">
              Loja
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/65">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-white/40" />
                <span>{CONTACT.address}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 size-4 shrink-0 text-white/40" />
                <span>{CONTACT.hoursLabel}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            © {year} {BRAND.legalName}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
