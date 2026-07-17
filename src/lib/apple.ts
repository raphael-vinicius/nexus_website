export const APPLE_CATEGORIES_SECTION_ID = "apple-categorias";

export type AppleCategory = {
  slug: "iphones" | "ipads" | "macbooks" | "acessorios";
  title: string;
  href: string;
  description: string;
  /**
   * Quando verdadeiro, a página da categoria exibe um Hero premium em duas
   * colunas com a imagem do produto em destaque (mesmo estilo do Hero Apple).
   */
  featuredHero?: boolean;
  /**
   * Segunda linha (silenciada) do título no Hero em destaque, espelhando a
   * hierarquia tipográfica do Hero da home Apple.
   */
  heroSubtitle?: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    officialSource: string;
  };
};

export const APPLE_HERO_IMAGE = {
  src: "/apple/iPhone-17-Pro-PNG.png",
  alt: "iPhone 17 Pro em imagem oficial da Apple",
  width: 1404,
  height: 1186,
  officialSource: "https://www.apple.com/iphone-17-pro/",
} as const;

export const APPLE_CATEGORIES: AppleCategory[] = [
  {
    slug: "iphones",
    title: "iPhones",
    href: "/apple/iphones",
    description: "Performance e câmera premium para o uso diário.",
    image: APPLE_HERO_IMAGE,
  },
  {
    slug: "ipads",
    title: "iPads",
    href: "/apple/ipads",
    description: "Portabilidade e tela ampla para criar, estudar e trabalhar.",
    featuredHero: true,
    heroSubtitle: "Feito para criar.",
    image: {
      src: "/apple/ipad-pro.png",
      alt: "iPad Pro em imagem oficial da Apple",
      width: 471,
      height: 518,
      officialSource:
        "https://www.apple.com/newsroom/2025/10/apple-introduces-the-powerful-new-ipad-pro-with-the-m5-chip/",
    },
  },
  {
    slug: "macbooks",
    title: "MacBooks",
    href: "/apple/macbooks",
    description: "Potência, autonomia e acabamento para rotinas exigentes.",
    image: {
      src: "/apple/macbook-pro.png",
      alt: "MacBook em imagem de destaque da linha Apple",
      width: 1230,
      height: 472,
      officialSource:
        "https://www.apple.com/newsroom/2025/10/apple-unveils-new-14-inch-macbook-pro-powered-by-the-m5-chip/",
    },
  },
  {
    slug: "acessorios",
    title: "Acessórios",
    href: "/apple/acessorios",
    description: "Itens oficiais para completar o ecossistema Apple.",
    image: {
      src: "/apple/airpods.png",
      alt: "AirPods em imagem oficial da Apple",
      width: 1293,
      height: 770,
      officialSource:
        "https://www.apple.com/newsroom/2024/09/apple-introduces-airpods-4-and-a-hearing-health-experience-with-airpods-pro-2/",
    },
  },
];

export function getAppleCategory(slug: AppleCategory["slug"]) {
  return APPLE_CATEGORIES.find((category) => category.slug === slug);
}
