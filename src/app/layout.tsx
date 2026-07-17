import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { BRAND } from "@/lib/site";
import { AmbientBackground } from "@/components/site/ambient-background";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nexusimportados.com.br"),
  title: {
    default: "Nexus Importados — Tecnologia que acompanha seu estilo de vida",
    template: "%s · Nexus Importados",
  },
  description:
    "Qualidade Apple e mobilidade elétrica em um só lugar. iPhones, iPads, MacBooks, scooters e patinetes elétricos. É Nexus.",
  applicationName: BRAND.legalName,
  keywords: [
    "Nexus Importados",
    "iPhone",
    "Apple",
    "scooter elétrica",
    "patinete elétrico",
    "mobilidade elétrica",
    "importados",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: BRAND.legalName,
    title: "Nexus Importados",
    description:
      "Qualidade Apple. Mobilidade Elétrica. É Nexus.",
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // respect iOS safe areas under the notch
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} dark`}>
      <body className="font-sans min-h-dvh bg-background text-foreground">
        <AmbientBackground />
        <SmoothScroll />
        {/* Skip link — keyboard accessibility (WCAG 2.2) */}
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black"
        >
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
