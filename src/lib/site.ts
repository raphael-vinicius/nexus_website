/**
 * Single source of truth for brand + contact data.
 *
 * ⚠️ PREENCHER ANTES DE PRODUÇÃO:
 *  - WHATSAPP.phone  → número real com DDI (só dígitos)
 *  - INSTAGRAM.handle / url → perfil real
 * Os demais dados foram fornecidos pelo cliente.
 */

export const WHATSAPP = {
  // Número oficial: +55 11 91205-4492
  phone: "5511912054492",
  message:
    "Olá! Visitei o site da Nexus Importados e gostaria de mais informações.",
} as const;

export function whatsappUrl(customMessage?: string) {
  const text = encodeURIComponent(customMessage ?? WHATSAPP.message);
  return `https://wa.me/${WHATSAPP.phone}?text=${text}`;
}

export const INSTAGRAM = {
  handle: "@nexusimportados_",
  url: "https://instagram.com/nexusimportados_",
} as const;

export const CONTACT = {
  address: "Rua Antônio Furquim, 263",
  hours: "09h às 18h",
  hoursLabel: "Seg — Sáb · 09h às 18h",
} as const;

export const BRAND = {
  name: "Nexus",
  legalName: "Nexus Importados",
  tagline: "Tecnologia que acompanha seu estilo de vida.",
} as const;

/** Home navigation (single-page anchors) — per brief: Apple · Mobilidade · Contato. */
export const NAV_LINKS = [
  { label: "Apple", href: "#universo" },
  { label: "Mobilidade", href: "#universo" },
  { label: "Contato", href: "#footer" },
] as const;

/** Section ids used for smooth-scroll + a11y landmarks. */
export const SECTION = {
  hero: "inicio",
  universe: "universo",
  about: "sobre",
  instagram: "instagram",
  footer: "footer",
} as const;
