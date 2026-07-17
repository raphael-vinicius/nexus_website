import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Universe } from "@/components/site/universe";
import { About } from "@/components/site/about";
import { Instagram } from "@/components/site/instagram";
import { Footer } from "@/components/site/footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="conteudo">
        <Hero />
        <Universe />
        <About />
        <Instagram />
      </main>
      <Footer />
    </>
  );
}
