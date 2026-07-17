import { Hero } from "@/components/site/hero";
import { Universe } from "@/components/site/universe";
import { About } from "@/components/site/about";
import { Instagram } from "@/components/site/instagram";

export default function HomePage() {
  return (
    <main id="conteudo">
      <Hero />
      <Universe />
      <About />
      <Instagram />
    </main>
  );
}
