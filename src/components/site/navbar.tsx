"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { NAV_LINKS, SECTION, whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { WhatsAppIcon } from "@/components/icons/whatsapp";

export function Navbar() {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  // Classe compartilhada pelas duas variantes da logo (âncora na home,
  // link de rota fora dela) — centralizada no mobile, à esquerda no desktop.
  const logoClassName =
    "absolute left-1/2 -translate-x-1/2 md:static md:left-0 md:translate-x-0";

  // Transparent → solid on scroll
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close menu on Escape
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-apple",
        scrolled || open
          ? "border-b border-white/10 bg-black/65 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Principal"
        className="container flex h-16 items-center justify-between gap-4 md:h-[72px]"
      >
        {/* ── Mobile: hamburger ───────────────────────── */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="-ml-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/5 md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        {/* ── Logo (center on mobile, left on desktop) ──
            Na home: âncora #inicio → smooth-scroll ao topo (via SmoothScroll).
            Fora da home: Link de rota → navega para a página inicial. */}
        {isHome ? (
          <a
            href={`#${SECTION.hero}`}
            className={logoClassName}
            aria-label="Nexus — início"
            onClick={() => setOpen(false)}
          >
            <Logo className="h-7 w-auto md:h-[30px]" priority />
          </a>
        ) : (
          <Link
            href="/"
            className={logoClassName}
            aria-label="Nexus — início"
            onClick={() => setOpen(false)}
          >
            <Logo className="h-7 w-auto md:h-[30px]" priority />
          </Link>
        )}

        {/* ── Desktop: links ──────────────────────────── */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm text-white/75 transition-colors duration-300 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* ── Right: WhatsApp ─────────────────────────── */}
        <div className="flex items-center">
          {/* desktop CTA */}
          <Button
            asChild
            variant="glass"
            size="sm"
            className="hidden md:inline-flex"
          >
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="size-4" />
              WhatsApp
            </a>
          </Button>

          {/* mobile icon */}
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp"
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/5 md:hidden"
          >
            <WhatsAppIcon className="size-[18px]" />
          </a>
        </div>
      </nav>

      {/* ── Mobile menu overlay ───────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3 }}
            className="fixed inset-0 top-16 z-40 bg-black/95 backdrop-blur-2xl md:hidden"
          >
            <ul className="container flex flex-col gap-1 py-6">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduce ? 0 : 0.05 + i * 0.06, duration: 0.4 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-white/[0.06] py-4 text-2xl font-medium tracking-tight text-white/90"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-6">
                <Button asChild variant="glass" size="lg" className="w-full">
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                  >
                    <WhatsAppIcon className="size-5" />
                    Falar no WhatsApp
                  </a>
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
