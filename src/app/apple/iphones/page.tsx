import type { Metadata } from "next";

import { AppleCTA } from "@/components/apple/AppleCTA";
import { IphoneHero } from "@/components/apple/iphones/IphoneHero";
import { IphoneCatalog } from "@/components/apple/iphones/IphoneCatalog";

export const metadata: Metadata = {
  title: "iPhones",
  description:
    "Catálogo de iPhones da Nexus Importados — do iPhone 13 ao iPhone 17 Pro Max. Compare gerações, chips, telas e câmeras.",
};

export default function IphonesPage() {
  return (
    <main id="conteudo">
      <IphoneHero />
      <IphoneCatalog />
      <AppleCTA />
    </main>
  );
}
