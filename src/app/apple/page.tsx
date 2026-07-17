import type { Metadata } from "next";

import { AppleCategories } from "@/components/apple/AppleCategories";
import { AppleCTA } from "@/components/apple/AppleCTA";
import { AppleHero } from "@/components/apple/AppleHero";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";

export const metadata: Metadata = {
  title: "Apple",
  description:
    "Explore o universo Apple da Nexus Importados: iPhones, iPads, MacBooks e acessórios.",
};

export default function ApplePage() {
  return (
    <>
      <Navbar />
      <main id="conteudo">
        <AppleHero />
        <AppleCategories />
        <AppleCTA />
      </main>
      <Footer />
    </>
  );
}
