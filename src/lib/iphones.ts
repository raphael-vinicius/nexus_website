/**
 * Fonte única de verdade do catálogo de iPhones.
 *
 * V1 — cada modelo possui APENAS uma imagem oficial (a que representa todas as
 * cores), localizada em `public/apple/iphones/{slug}/`. O campo `image` é
 * intencionalmente isolado para que, no futuro, seja trivial evoluir para
 * `images: IPhoneColor[]` (uma imagem por cor) sem reescrever o restante da
 * estrutura, dos componentes ou das páginas.
 */

export type IPhoneLine = "Padrão" | "Plus" | "Pro" | "Pro Max";

export type IPhoneImage = {
  /** Caminho público exato do arquivo (nomes preservados, sem renomear). */
  src: string;
  alt: string;
};

export type IPhoneSpecs = {
  chip: string;
  display: string;
  cameras: string;
  battery: string;
  connectivity: string;
  /** Capacidades disponíveis, ex.: ["128 GB", "256 GB"]. */
  storage: string[];
  compatibility: string;
};

export type IPhone = {
  id: string;
  /** Casa com a pasta em public/apple/iphones/{slug}. */
  slug: string;
  name: string;
  /** Número da geração (13…17) — usado na pesquisa e nos filtros. */
  generation: number;
  line: IPhoneLine;
  year: number;
  chip: string;
  /** Tamanho da tela, resumido para o card (ex.: `6,1"`). */
  displaySize: string;
  /** Subtítulo curto e elegante (estilo Apple). */
  tagline: string;
  description: string;
  highlights: string[];
  image: IPhoneImage;
  specs: IPhoneSpecs;
};

/** Monta o objeto de imagem a partir do slug + nome de arquivo real da pasta. */
function image(slug: string, file: string, name: string): IPhoneImage {
  return {
    src: `/apple/iphones/${slug}/${file}`,
    alt: `${name} em imagem oficial da Apple`,
  };
}

export const IPHONES: IPhone[] = [
  // ── Geração 17 (2025) ─────────────────────────────────────────────
  {
    id: "iphone-17-pro-max",
    slug: "iphone-17-pro-max",
    name: "iPhone 17 Pro Max",
    generation: 17,
    line: "Pro Max",
    year: 2025,
    chip: "A19 Pro",
    displaySize: '6,9"',
    tagline: "O Pro definitivo.",
    description:
      "A maior tela, a maior bateria e todo o poder do chip A19 Pro. O iPhone 17 Pro Max leva o sistema de câmeras Pro e o desempenho ao seu ponto mais alto.",
    highlights: [
      "Chip A19 Pro",
      'Tela de 6,9" ProMotion',
      "Sistema de câmera Pro de 48 MP",
      "Até 2 TB de armazenamento",
    ],
    image: image("iphone-17-pro-max", "iphone 17 pm.png", "iPhone 17 Pro Max"),
    specs: {
      chip: "A19 Pro — CPU de 6 núcleos e GPU de 6 núcleos",
      display: '6,9" Super Retina XDR OLED · ProMotion 120 Hz · Always-On',
      cameras:
        "Sistema Pro de 48 MP (Fusion + Ultra-angular + Teleobjetiva) · zoom óptico de até 8x",
      battery: "Até 39 horas de reprodução de vídeo",
      connectivity: "5G · Wi-Fi 7 · USB-C (USB 3) · Face ID",
      storage: ["256 GB", "512 GB", "1 TB", "2 TB"],
      compatibility: "Compatível com a versão mais recente do iOS",
    },
  },
  {
    id: "iphone-17-pro",
    slug: "iphone-17-pro",
    name: "iPhone 17 Pro",
    generation: 17,
    line: "Pro",
    year: 2025,
    chip: "A19 Pro",
    displaySize: '6,3"',
    tagline: "Toda a genialidade Pro.",
    description:
      "Design unibody em alumínio, chip A19 Pro e um sistema de câmeras Pro completo. Potência de sobra para fotografia, vídeo e jogos exigentes.",
    highlights: [
      "Chip A19 Pro",
      "Design unibody em alumínio",
      "Sistema de câmera Pro de 48 MP",
      "Bateria para o dia todo",
    ],
    image: image("iphone-17-pro", "iphone 17 pm.png", "iPhone 17 Pro"),
    specs: {
      chip: "A19 Pro — CPU de 6 núcleos e GPU de 6 núcleos",
      display: '6,3" Super Retina XDR OLED · ProMotion 120 Hz · Always-On',
      cameras:
        "Sistema Pro de 48 MP (Fusion + Ultra-angular + Teleobjetiva) · zoom óptico de até 8x",
      battery: "Até 33 horas de reprodução de vídeo",
      connectivity: "5G · Wi-Fi 7 · USB-C (USB 3) · Face ID",
      storage: ["256 GB", "512 GB", "1 TB"],
      compatibility: "Compatível com a versão mais recente do iOS",
    },
  },
  {
    id: "iphone-17",
    slug: "iphone-17",
    name: "iPhone 17",
    generation: 17,
    line: "Padrão",
    year: 2025,
    chip: "A19",
    displaySize: '6,3"',
    tagline: "Poder puro.",
    description:
      "Agora com tela ProMotion e o chip A19. O iPhone 17 traz câmera Dual Fusion de 48 MP e a experiência completa do Apple Intelligence.",
    highlights: [
      "Chip A19",
      "Tela ProMotion 120 Hz",
      "Câmera Dual Fusion de 48 MP",
      "Apple Intelligence",
    ],
    image: image("iphone-17", "iphone17_PNG37.png", "iPhone 17"),
    specs: {
      chip: "A19 — CPU de 6 núcleos e GPU de 5 núcleos",
      display: '6,3" Super Retina XDR OLED · ProMotion 120 Hz',
      cameras:
        "Sistema Dual Fusion de 48 MP (Fusion + Ultra-angular) · Teleobjetiva com qualidade óptica 2x",
      battery: "Até 30 horas de reprodução de vídeo",
      connectivity: "5G · Wi-Fi 7 · USB-C · Face ID",
      storage: ["256 GB", "512 GB"],
      compatibility: "Compatível com a versão mais recente do iOS",
    },
  },

  // ── Geração 16 (2024) ─────────────────────────────────────────────
  {
    id: "iphone-16-pro-max",
    slug: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max",
    generation: 16,
    line: "Pro Max",
    year: 2024,
    chip: "A18 Pro",
    displaySize: '6,9"',
    tagline: "A maior tela Pro de todas.",
    description:
      "Titânio, chip A18 Pro e a maior tela já colocada em um iPhone. Câmeras Pro, Controle de Câmera e autonomia excepcional.",
    highlights: [
      "Chip A18 Pro",
      'Tela de 6,9" ProMotion',
      "Controle de Câmera",
      "Teleobjetiva 5x",
    ],
    image: image(
      "iphone-16-pro-max",
      "121032-iphone-16-pro-max.png",
      "iPhone 16 Pro Max",
    ),
    specs: {
      chip: "A18 Pro — CPU de 6 núcleos e GPU de 6 núcleos",
      display: '6,9" Super Retina XDR OLED · ProMotion 120 Hz · Always-On',
      cameras:
        "Sistema Pro de 48 MP (Fusion + Ultra-angular de 48 MP + Teleobjetiva 5x)",
      battery: "Até 33 horas de reprodução de vídeo",
      connectivity: "5G · Wi-Fi 7 · USB-C (USB 3) · Face ID",
      storage: ["256 GB", "512 GB", "1 TB"],
      compatibility: "Compatível com a versão mais recente do iOS",
    },
  },
  {
    id: "iphone-16-pro",
    slug: "iphone-16-pro",
    name: "iPhone 16 Pro",
    generation: 16,
    line: "Pro",
    year: 2024,
    chip: "A18 Pro",
    displaySize: '6,3"',
    tagline: "Uma potência Pro.",
    description:
      "Construído em titânio, com chip A18 Pro, Controle de Câmera e um sistema de câmeras Pro de 48 MP. Tudo em uma tela maior, de 6,3 polegadas.",
    highlights: [
      "Chip A18 Pro",
      'Tela de 6,3"',
      "Controle de Câmera",
      "Teleobjetiva 5x",
    ],
    image: image(
      "iphone-16-pro",
      "121032-iphone-16-pro-max.png",
      "iPhone 16 Pro",
    ),
    specs: {
      chip: "A18 Pro — CPU de 6 núcleos e GPU de 6 núcleos",
      display: '6,3" Super Retina XDR OLED · ProMotion 120 Hz · Always-On',
      cameras:
        "Sistema Pro de 48 MP (Fusion + Ultra-angular de 48 MP + Teleobjetiva 5x)",
      battery: "Até 27 horas de reprodução de vídeo",
      connectivity: "5G · Wi-Fi 7 · USB-C (USB 3) · Face ID",
      storage: ["128 GB", "256 GB", "512 GB", "1 TB"],
      compatibility: "Compatível com a versão mais recente do iOS",
    },
  },
  {
    id: "iphone-16",
    slug: "iphone-16",
    name: "iPhone 16",
    generation: 16,
    line: "Padrão",
    year: 2024,
    chip: "A18",
    displaySize: '6,1"',
    tagline: "Feito para o Apple Intelligence.",
    description:
      "Chip A18, Controle de Câmera e botão de Ação. O iPhone 16 combina desempenho de ponta com um sistema de câmera Fusion avançado.",
    highlights: [
      "Chip A18",
      "Controle de Câmera",
      "Botão de Ação",
      "Apple Intelligence",
    ],
    image: image("iphone-16", "iphone16_PNG35.png", "iPhone 16"),
    specs: {
      chip: "A18 — CPU de 6 núcleos e GPU de 5 núcleos",
      display: '6,1" Super Retina XDR OLED · 60 Hz',
      cameras:
        "Sistema Fusion de 48 MP (Fusion + Ultra-angular) com macro · qualidade óptica 2x",
      battery: "Até 22 horas de reprodução de vídeo",
      connectivity: "5G · Wi-Fi 7 · USB-C · Face ID",
      storage: ["128 GB", "256 GB", "512 GB"],
      compatibility: "Compatível com a versão mais recente do iOS",
    },
  },

  // ── Geração 15 (2023) ─────────────────────────────────────────────
  {
    id: "iphone-15-pro-max",
    slug: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    generation: 15,
    line: "Pro Max",
    year: 2023,
    chip: "A17 Pro",
    displaySize: '6,7"',
    tagline: "A câmera com teleobjetiva 5x.",
    description:
      "Design em titânio, chip A17 Pro e uma teleobjetiva 5x exclusiva. A experiência Pro mais completa da geração, com USB-C e botão de Ação.",
    highlights: [
      "Chip A17 Pro",
      "Design em titânio",
      "Teleobjetiva 5x",
      "USB-C com USB 3",
    ],
    image: image(
      "iphone-15-pro-max",
      "4ddd71f8ac87cfe4ed9ea733a049ce5d.png",
      "iPhone 15 Pro Max",
    ),
    specs: {
      chip: "A17 Pro — CPU de 6 núcleos e GPU de 6 núcleos",
      display: '6,7" Super Retina XDR OLED · ProMotion 120 Hz · Always-On',
      cameras:
        "Sistema Pro de 48 MP (Principal + Ultra-angular + Teleobjetiva 5x)",
      battery: "Até 29 horas de reprodução de vídeo",
      connectivity: "5G · Wi-Fi 6E · USB-C (USB 3) · Face ID",
      storage: ["256 GB", "512 GB", "1 TB"],
      compatibility: "Compatível com a versão mais recente do iOS",
    },
  },
  {
    id: "iphone-15-pro",
    slug: "iphone-15-pro",
    name: "iPhone 15 Pro",
    generation: 15,
    line: "Pro",
    year: 2023,
    chip: "A17 Pro",
    displaySize: '6,1"',
    tagline: "Titânio. Forte. Leve. Pro.",
    description:
      "O primeiro iPhone com design em titânio de nível aeroespacial. Chip A17 Pro, botão de Ação e USB-C com velocidade USB 3.",
    highlights: [
      "Chip A17 Pro",
      "Design em titânio",
      "Botão de Ação",
      "USB-C com USB 3",
    ],
    image: image(
      "iphone-15-pro",
      "4ddd71f8ac87cfe4ed9ea733a049ce5d.png",
      "iPhone 15 Pro",
    ),
    specs: {
      chip: "A17 Pro — CPU de 6 núcleos e GPU de 6 núcleos",
      display: '6,1" Super Retina XDR OLED · ProMotion 120 Hz · Always-On',
      cameras:
        "Sistema Pro de 48 MP (Principal + Ultra-angular + Teleobjetiva 3x)",
      battery: "Até 23 horas de reprodução de vídeo",
      connectivity: "5G · Wi-Fi 6E · USB-C (USB 3) · Face ID",
      storage: ["128 GB", "256 GB", "512 GB", "1 TB"],
      compatibility: "Compatível com a versão mais recente do iOS",
    },
  },
  {
    id: "iphone-15",
    slug: "iphone-15",
    name: "iPhone 15",
    generation: 15,
    line: "Padrão",
    year: 2023,
    chip: "A16 Bionic",
    displaySize: '6,1"',
    tagline: "Novo de todos os ângulos.",
    description:
      "Dynamic Island, câmera principal de 48 MP e USB-C chegam ao iPhone 15. Desempenho do chip A16 Bionic em um design leve e resistente.",
    highlights: [
      "Chip A16 Bionic",
      "Dynamic Island",
      "Câmera principal de 48 MP",
      "USB-C",
    ],
    image: image(
      "iphone-15",
      "387f64d30b30d06dd0e332bddab5a6e6.png",
      "iPhone 15",
    ),
    specs: {
      chip: "A16 Bionic — CPU de 6 núcleos e GPU de 5 núcleos",
      display: '6,1" Super Retina XDR OLED · 60 Hz · Dynamic Island',
      cameras:
        "Câmera dupla de 48 MP (Principal + Ultra-angular) · qualidade óptica 2x",
      battery: "Até 20 horas de reprodução de vídeo",
      connectivity: "5G · Wi-Fi 6 · USB-C · Face ID",
      storage: ["128 GB", "256 GB", "512 GB"],
      compatibility: "Compatível com a versão mais recente do iOS",
    },
  },

  // ── Geração 14 (2022) ─────────────────────────────────────────────
  {
    id: "iphone-14-pro-max",
    slug: "iphone-14-pro-max",
    name: "iPhone 14 Pro Max",
    generation: 14,
    line: "Pro Max",
    year: 2022,
    chip: "A16 Bionic",
    displaySize: '6,7"',
    tagline: "Pro além dos limites.",
    description:
      "A maior tela Pro com Dynamic Island e Always-On, câmera principal de 48 MP e o chip A16 Bionic. Autonomia excepcional para o dia todo.",
    highlights: [
      "Chip A16 Bionic",
      "Dynamic Island",
      "Câmera principal de 48 MP",
      "Tela Always-On",
    ],
    image: image("iphone-14-pro-max", "iPhone-14-Pro.webp", "iPhone 14 Pro Max"),
    specs: {
      chip: "A16 Bionic — CPU de 6 núcleos e GPU de 5 núcleos",
      display: '6,7" Super Retina XDR OLED · ProMotion 120 Hz · Always-On',
      cameras:
        "Sistema Pro de 48 MP (Principal + Ultra-angular + Teleobjetiva 3x)",
      battery: "Até 29 horas de reprodução de vídeo",
      connectivity: "5G · Wi-Fi 6 · Lightning · Face ID",
      storage: ["128 GB", "256 GB", "512 GB", "1 TB"],
      compatibility: "Compatível com a versão mais recente do iOS",
    },
  },
  {
    id: "iphone-14-pro",
    slug: "iphone-14-pro",
    name: "iPhone 14 Pro",
    generation: 14,
    line: "Pro",
    year: 2022,
    chip: "A16 Bionic",
    displaySize: '6,1"',
    tagline: "Um salto Pro.",
    description:
      "A estreia da Dynamic Island e da tela Always-On. Câmera principal de 48 MP e o poderoso chip A16 Bionic em um corpo de aço inoxidável.",
    highlights: [
      "Chip A16 Bionic",
      "Dynamic Island",
      "Câmera principal de 48 MP",
      "Tela Always-On",
    ],
    image: image("iphone-14-pro", "iPhone-14-Pro.webp", "iPhone 14 Pro"),
    specs: {
      chip: "A16 Bionic — CPU de 6 núcleos e GPU de 5 núcleos",
      display: '6,1" Super Retina XDR OLED · ProMotion 120 Hz · Always-On',
      cameras:
        "Sistema Pro de 48 MP (Principal + Ultra-angular + Teleobjetiva 3x)",
      battery: "Até 23 horas de reprodução de vídeo",
      connectivity: "5G · Wi-Fi 6 · Lightning · Face ID",
      storage: ["128 GB", "256 GB", "512 GB", "1 TB"],
      compatibility: "Compatível com a versão mais recente do iOS",
    },
  },
  {
    id: "iphone-14",
    slug: "iphone-14",
    name: "iPhone 14",
    generation: 14,
    line: "Padrão",
    year: 2022,
    chip: "A15 Bionic",
    displaySize: '6,1"',
    tagline: "Simplesmente incrível.",
    description:
      "Câmera dupla avançada, Detecção de Acidente e SOS de Emergência via satélite. O iPhone 14 entrega desempenho fluido com o chip A15 Bionic.",
    highlights: [
      "Chip A15 Bionic",
      "Câmera dupla avançada",
      "Detecção de Acidente",
      "SOS de Emergência via satélite",
    ],
    image: image(
      "iphone-14",
      "ChatGPT Image 17 de jul. de 2026, 00_53_43.png",
      "iPhone 14",
    ),
    specs: {
      chip: "A15 Bionic — CPU de 6 núcleos e GPU de 5 núcleos",
      display: '6,1" Super Retina XDR OLED · 60 Hz',
      cameras: "Câmera dupla de 12 MP (Principal + Ultra-angular) · Modo Ação",
      battery: "Até 20 horas de reprodução de vídeo",
      connectivity: "5G · Wi-Fi 6 · Lightning · Face ID",
      storage: ["128 GB", "256 GB", "512 GB"],
      compatibility: "Compatível com a versão mais recente do iOS",
    },
  },

  // ── Geração 13 (2021) ─────────────────────────────────────────────
  {
    id: "iphone-13-pro-max",
    slug: "iphone-13-pro-max",
    name: "iPhone 13 Pro Max",
    generation: 13,
    line: "Pro Max",
    year: 2021,
    chip: "A15 Bionic",
    displaySize: '6,7"',
    tagline: "A maior experiência Pro.",
    description:
      "Tela ProMotion de 6,7 polegadas, sistema de câmera Pro com LiDAR e a maior bateria da geração. Poder do chip A15 Bionic em aço inoxidável.",
    highlights: [
      "Chip A15 Bionic",
      "Tela ProMotion 120 Hz",
      "Câmera tripla Pro + LiDAR",
      "Bateria da geração",
    ],
    image: image(
      "iphone-13-pro-max",
      "ChatGPT Image 17 de jul. de 2026, 00_50_26.png",
      "iPhone 13 Pro Max",
    ),
    specs: {
      chip: "A15 Bionic — CPU de 6 núcleos e GPU de 5 núcleos",
      display: '6,7" Super Retina XDR OLED · ProMotion 120 Hz',
      cameras:
        "Sistema Pro de 12 MP (Principal + Ultra-angular + Teleobjetiva 3x) + LiDAR",
      battery: "Até 28 horas de reprodução de vídeo",
      connectivity: "5G · Wi-Fi 6 · Lightning · Face ID",
      storage: ["128 GB", "256 GB", "512 GB", "1 TB"],
      compatibility: "Compatível com a versão mais recente do iOS",
    },
  },
  {
    id: "iphone-13-pro",
    slug: "iphone-13-pro",
    name: "iPhone 13 Pro",
    generation: 13,
    line: "Pro",
    year: 2021,
    chip: "A15 Bionic",
    displaySize: '6,1"',
    tagline: "Pro em cada detalhe.",
    description:
      "A primeira tela ProMotion de 120 Hz do iPhone, com sistema de câmera Pro e LiDAR. Chip A15 Bionic em um design de aço inoxidável.",
    highlights: [
      "Chip A15 Bionic",
      "Tela ProMotion 120 Hz",
      "Câmera tripla Pro + LiDAR",
      "Design em aço inoxidável",
    ],
    image: image(
      "iphone-13-pro",
      "ChatGPT Image 17 de jul. de 2026, 00_50_26.png",
      "iPhone 13 Pro",
    ),
    specs: {
      chip: "A15 Bionic — CPU de 6 núcleos e GPU de 5 núcleos",
      display: '6,1" Super Retina XDR OLED · ProMotion 120 Hz',
      cameras:
        "Sistema Pro de 12 MP (Principal + Ultra-angular + Teleobjetiva 3x) + LiDAR",
      battery: "Até 22 horas de reprodução de vídeo",
      connectivity: "5G · Wi-Fi 6 · Lightning · Face ID",
      storage: ["128 GB", "256 GB", "512 GB", "1 TB"],
      compatibility: "Compatível com a versão mais recente do iOS",
    },
  },
  {
    id: "iphone-13",
    slug: "iphone-13",
    name: "iPhone 13",
    generation: 13,
    line: "Padrão",
    year: 2021,
    chip: "A15 Bionic",
    displaySize: '6,1"',
    tagline: "O equilíbrio perfeito.",
    description:
      "Desempenho fluido, câmera dupla avançada com Modo Cinema e bateria para o dia todo, em um design elegante e resistente com o chip A15 Bionic.",
    highlights: [
      "Chip A15 Bionic",
      "Câmera dupla de 12 MP",
      "Modo Cinema",
      "Resistência à água IP68",
    ],
    image: image("iphone-13", "iphone_13_PNG20.png", "iPhone 13"),
    specs: {
      chip: "A15 Bionic — CPU de 6 núcleos e GPU de 4 núcleos",
      display: '6,1" Super Retina XDR OLED · 60 Hz',
      cameras: "Câmera dupla de 12 MP (Principal + Ultra-angular) · Modo Cinema",
      battery: "Até 19 horas de reprodução de vídeo",
      connectivity: "5G · Wi-Fi 6 · Lightning · Face ID",
      storage: ["128 GB", "256 GB", "512 GB"],
      compatibility: "Compatível com a versão mais recente do iOS",
    },
  },
];

/** Ordem de linhas para exibição consistente dos filtros. */
const LINE_ORDER: IPhoneLine[] = ["Padrão", "Plus", "Pro", "Pro Max"];

/** Retorna um modelo pelo slug. */
export function getIphone(slug: string): IPhone | undefined {
  return IPHONES.find((iphone) => iphone.slug === slug);
}

/** Gerações presentes no catálogo, da mais recente para a mais antiga. */
export function getGenerations(): number[] {
  return [...new Set(IPHONES.map((iphone) => iphone.generation))].sort(
    (a, b) => b - a,
  );
}

/** Linhas presentes no catálogo, em ordem de hierarquia. */
export function getLines(): IPhoneLine[] {
  const present = new Set(IPHONES.map((iphone) => iphone.line));
  return LINE_ORDER.filter((line) => present.has(line));
}

/**
 * Modelos relacionados: prioriza a mesma geração e completa com a mesma linha
 * (mais recentes primeiro), sempre excluindo o próprio modelo.
 */
export function getRelatedIphones(slug: string, limit = 3): IPhone[] {
  const current = getIphone(slug);
  if (!current) return [];

  const others = IPHONES.filter((iphone) => iphone.slug !== slug);
  const sameGeneration = others.filter(
    (iphone) => iphone.generation === current.generation,
  );
  const sameLine = others.filter(
    (iphone) =>
      iphone.line === current.line && iphone.generation !== current.generation,
  );

  const ordered: IPhone[] = [];
  for (const iphone of [...sameGeneration, ...sameLine, ...others]) {
    if (ordered.length >= limit) break;
    if (!ordered.includes(iphone)) ordered.push(iphone);
  }
  return ordered.slice(0, limit);
}
