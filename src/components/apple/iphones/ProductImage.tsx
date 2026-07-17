import Image from "next/image";

import type { IPhoneImage } from "@/lib/iphones";
import { cn } from "@/lib/utils";

type ProductImageProps = {
  image: IPhoneImage;
  /** Valor de `sizes` do next/image para servir a resolução ideal. */
  sizes: string;
  /** Prioriza o carregamento (usar apenas em imagens acima da dobra). */
  priority?: boolean;
  className?: string;
  imgClassName?: string;
};

/**
 * Imagem de produto reutilizável (card e página de detalhe).
 *
 * Usa `fill` + `object-contain` para lidar com as imagens oficiais de proporções
 * variadas sem distorção nem corte — o container define o tamanho, a imagem
 * apenas se ajusta e centraliza. Preparado para, no futuro, receber a imagem por
 * cor apenas trocando o objeto `image`.
 */
export function ProductImage({
  image,
  sizes,
  priority = false,
  className,
  imgClassName,
}: ProductImageProps) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        quality={100}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className={cn("object-contain", imgClassName)}
      />
    </div>
  );
}
