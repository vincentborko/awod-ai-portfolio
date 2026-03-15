"use client";

import Image from "next/image";
import { useState } from "react";

type BrandLogoProps = {
  priority?: boolean;
};

export function BrandLogo({ priority = false }: BrandLogoProps) {
  const [iconFailed, setIconFailed] = useState(false);

  return (
    <span className="brand-logo" role="img" aria-label="AWOD.AI home">
      {iconFailed ? (
        <span className="brand-logo-fallback">AI</span>
      ) : (
        <Image
          src="/media/branding/awod-icon.png"
          alt="AWOD.AI icon"
          fill
          sizes="64px"
          className="brand-logo-image"
          priority={priority}
          onError={() => setIconFailed(true)}
        />
      )}
    </span>
  );
}
