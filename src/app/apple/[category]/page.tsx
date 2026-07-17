import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  APPLE_CATEGORIES,
  getAppleCategory,
  type AppleCategory,
} from "@/lib/apple";
import { AppleCategoryShell } from "@/components/apple/AppleCategoryShell";

type CategoryPageProps = {
  params: Promise<{
    category: AppleCategory["slug"];
  }>;
};

export function generateStaticParams() {
  return APPLE_CATEGORIES
    // `iphones` tem rota estática dedicada (/apple/iphones) que sempre tem
    // precedência — excluímos aqui para não gerar caminho duplicado no build.
    .filter((category) => category.slug !== "iphones")
    .map((category) => ({
      category: category.slug,
    }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getAppleCategory(slug);

  if (!category) {
    return {
      title: "Apple",
    };
  }

  return {
    title: category.title,
    description: `${category.title} no universo Apple da Nexus Importados. Catálogo em desenvolvimento.`,
  };
}

export default async function AppleCategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = getAppleCategory(slug);

  if (!category) {
    notFound();
  }

  return (
    <main id="conteudo">
      <AppleCategoryShell category={category} />
    </main>
  );
}
