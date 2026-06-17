"use client";

import Image from "next/image";
import { useEffect,useState } from "react";

interface ProjectImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
}

export default function ProjectImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  fill = false,
}: ProjectImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    // Si l'image charge en moins de 300ms, on n'affiche jamais le skeleton (évite les flashs)
    if (isLoading) {
      timer = setTimeout(() => setShowSkeleton(true), 300);
    } else {
      setShowSkeleton(false);
    }
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {showSkeleton && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse z-10 rounded-md" />
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        quality={95}
        priority={priority}
        className={`object-cover transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
