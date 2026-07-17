import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { IPHONES, getIphone } from "@/lib/iphones";
import { IphoneModelDetail } from "@/components/apple/iphones/IphoneModelDetail";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";

type ModelPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return IPHONES.map((iphone) => ({ slug: iphone.slug }));
}

export async function generateMetadata({
  params,
}: ModelPageProps): Promise<Metadata> {
  const { slug } = await params;
  const iphone = getIphone(slug);

  if (!iphone) {
    return { title: "iPhone" };
  }

  return {
    title: iphone.name,
    description: `${iphone.name} (${iphone.year}) — ${iphone.tagline} ${iphone.description}`,
  };
}

export default async function IphoneModelPage({ params }: ModelPageProps) {
  const { slug } = await params;
  const iphone = getIphone(slug);

  if (!iphone) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main id="conteudo">
        <IphoneModelDetail iphone={iphone} />
      </main>
      <Footer />
    </>
  );
}
