# Nexus Importados — Home

Site institucional premium (catálogo, sem e-commerce). Esta sprint entrega **apenas a Home**, que serve de base visual e técnica para o restante do projeto.

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS 3.4** (tokens da marca em CSS variables)
- **Framer Motion** (animações Apple-like, com `prefers-reduced-motion`)
- **shadcn/ui** (padrão `Button` + `cn`) · **Lucide Icons**

## Rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção (já validado ✓)
```

## Estrutura

```
src/
  app/
    layout.tsx        # fonte (SF Pro → Inter), metadata, skip-link, viewport
    page.tsx          # composição da Home
    globals.css       # tokens: 95% preto/branco · ~4% verde · ~1% roxo
  components/
    site/             # navbar, hero, hero-video, universe, about, instagram, footer, logo
    ui/button.tsx     # shadcn/ui Button (CVA)
    motion/reveal.tsx # entrada on-scroll (opacity + translateY + blur)
    icons/whatsapp.tsx
  lib/
    site.ts           # ⚙️ CONFIG central (WhatsApp, Instagram, endereço, nav)
    utils.ts          # cn()
public/videos/        # vídeos do hero + posters
```

## Seções da Home

Navbar · Hero (100vh, vídeo bg) · Escolha seu universo · Sobre · Instagram · Footer. **Nada além disso** (sem produtos/preços/carrosséis, conforme briefing).

## ⚙️ Preencher antes de produção (`src/lib/site.ts`)

| Campo | Onde | Status |
|---|---|---|
| `WHATSAPP.phone` | `lib/site.ts` | ⚠️ placeholder `5514000000000` — trocar pelo número real |
| `INSTAGRAM.handle` / `url` | `lib/site.ts` | ⚠️ placeholder — trocar pelo perfil real |
| Endereço / horário | `lib/site.ts` | ✅ conforme fornecido |

Os botões "Explorar" dos cards apontam para `/apple` e `/mobilidade` (páginas das próximas sprints — hoje retornam 404, esperado).

## 🎥 Vídeos do Hero — IMPORTANTE

Foram fornecidos dois arquivos (edições prontas de 16,3s):

- **Mobile** (9:16, 1080×1920) → `public/videos/hero-mobile.*`
- **Desktop** (16:9, 1920×1080) → `public/videos/hero-desktop.*`

O componente monta **automaticamente** o vídeo certo por dispositivo (o celular nunca baixa o vídeo do desktop) e respeita `prefers-reduced-motion` (mostra o poster, sem autoplay).

### Formato: ação necessária

Os originais são **HEVC (.mov)**. Isso **toca no Safari/iOS, mas NÃO no Chrome/Firefox/Android**. Para o hero rodar em todos os navegadores, é preciso gerar formatos web. O `<video>` já está preparado com fallback em cascata — **basta colocar os arquivos** que eles passam a ser usados automaticamente:

```
public/videos/
  hero-mobile.webm   ← gerar (VP9)  ⟵ Chrome/Firefox/Android
  hero-mobile.mp4    ← gerar (H.264) ⟵ compatibilidade universal
  hero-mobile.mov    ✅ já presente  ⟵ Safari/iOS
  hero-desktop.webm  ← gerar
  hero-desktop.mp4   ← gerar
  hero-desktop.mov   ✅ já presente
  poster-*.jpg       ✅ já presentes (fallback/LCP)
```

**Opção A — CapCut (mais fácil):** reexporte cada vídeo como **MP4 (H.264)** e salve como `hero-mobile.mp4` / `hero-desktop.mp4`.

**Opção B — ffmpeg (ideal, gera webm+mp4 otimizados para web):**
```bash
# MP4 H.264 (universal)
ffmpeg -i hero-mobile.mov  -c:v libx264 -crf 23 -preset slow -pix_fmt yuv420p -movflags +faststart -an hero-mobile.mp4
ffmpeg -i hero-desktop.mov -c:v libx264 -crf 23 -preset slow -pix_fmt yuv420p -movflags +faststart -an hero-desktop.mp4
# WebM VP9 (menor, moderno)
ffmpeg -i hero-mobile.mov  -c:v libvpx-vp9 -crf 33 -b:v 0 -an hero-mobile.webm
ffmpeg -i hero-desktop.mov -c:v libvpx-vp9 -crf 33 -b:v 0 -an hero-desktop.webm
```

## Decisões de design (resumo)

- **Overlay do hero** calibrado a partir da **luminância medida** dos vídeos (mid-band chega a 162/255 no desktop; topo passa de 190 no mobile). Solução: escurecimento base 50% + gradiente reforçando topo (navbar) e base (CTA) + vinheta + `text-shadow` → texto branco legível em toda a duração (WCAG).
- **Neon como acento:** verde só no destaque "seu estilo de vida.", foco de teclado e micro-detalhes; roxo raríssimo (glow do card de Mobilidade). Nada de gamer/cyberpunk.
- **Mobile-first real:** breakpoints partem de 390–430px; desktop é progressive enhancement.
- **Acessibilidade:** skip-link, foco visível (ring verde), alvos ≥ 44px, `prefers-reduced-motion`, navegação por teclado, landmarks semânticos.
- **Performance:** Home estática (SSG), só um vídeo por dispositivo, poster para LCP, `next/font` (Inter self-hosted).
