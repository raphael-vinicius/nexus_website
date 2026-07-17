import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Official Nexus Importados logo, prepared for dark surfaces
 * (white wordmark + green monogram, transparent background).
 * Size is controlled by the caller via a height class (e.g. `h-8 w-auto`).
 */
export function Logo({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/nexus-logo.png"
      alt="Nexus Importados"
      width={330}
      height={98}
      priority={priority}
      className={cn("h-7 w-auto select-none", className)}
    />
  );
}
