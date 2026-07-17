import type { Metadata } from "next";

import { AppleCategories } from "@/components/apple/AppleCategories";
import { AppleCTA } from "@/components/apple/AppleCTA";
import { AppleHero } from "@/components/apple/AppleHero";

export const metadata: Metadata = {
  title: "Apple",
  description:
    "Explore o universo Apple da Nexus Importados: iPhones, iPads, MacBooks e acessórios.",
};

export default function ApplePage() {
  return (
    <main id="conteudo">
      <AppleHero />
      <AppleCategories />
      <AppleCTA />
    </main>
  );
}
