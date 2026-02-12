"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const ThemedImage = ({
  lightSrc,
  darkSrc,
  alt,
  ...props
}: { lightSrc: string; darkSrc: string; alt: string } & Omit<
  React.ComponentProps<typeof Image>,
  "src"
>) => {
  const { resolvedTheme } = useTheme();
  const [src, setSrc] = useState(darkSrc);

  useEffect(() => {
    if (resolvedTheme === "light") {
      setSrc(lightSrc);
    } else {
      setSrc(darkSrc);
    }
  }, [resolvedTheme, lightSrc, darkSrc]);

  // Always render with a valid src (defaults to darkSrc)
  // Fall back to darkSrc if the current image fails to load
  return (
    <Image src={src} alt={alt} onError={() => setSrc(darkSrc)} {...props} />
  );
};

export default ThemedImage;
