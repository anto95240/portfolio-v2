import Image from "next/image";

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
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        // Si fill est true, on n'utilise pas width/height
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        // Optimisations globales forcées
        quality={95}
        priority={priority}
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      />
    </div>
  );
}