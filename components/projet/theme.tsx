"use client";

import ProjectImage from "@/components/ui/ProjectImage";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useIsClient } from "@/hooks/useIsClient";
import { CATEGORIES_DATA } from "@/lib/constants";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function ThemePage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const router = useRouter();
  const isClient = useIsClient();

  const handleNavigate = (category: string) => {
    router.push(`/projet/${category}`);
  };

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const formatDescription = (description: string) => {
    return description.split("\n").map((line, index) => (
      <span key={index}>{line}<br /></span>
    ));
  };

  if (!isClient) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 w-10/12 lg:w-8/12 max-w-l text-center mx-auto text-white justify-center">
      {CATEGORIES_DATA.map((category, index) =>(
        <div
          key={category.categorySlug}
          className={`bg-gradient-to-r ${category.gradient} min-h-[550px] shadow-[4px_4px_10px_0_rgba(0,0,0,0.5)] lg:min-h-[620px] text-black flex flex-col gap-10 relative group`}
          onClick={() => (isMobile ? handleToggle(index) : handleNavigate(category.categorySlug))}
        >
          <h1 className={`${category.className} pt-5`}>{category.name}</h1>
          <div
            className={`absolute inset-0 flex flex-col gap-5 items-center pt-20 bg-black bg-opacity-25 transition-all duration-300 ease-in-out ${activeIndex === index ? "opacity-100 visible" : "opacity-0 invisible lg:group-hover:opacity-100 lg:group-hover:visible"}`}
          >
            <button
              type="button"
              className={`w-2/4 rounded-xl h-9 border border-solid border-black transition-all duration-300 transform active:scale-90 ${clickedIndex === index ? "bg-[#007BFF] text-white" : "bg-[#d9d9d97b] hover:border-white hover:bg-[#007BFF] hover:text-white"}`}
              onClick={(e) => {
                e.stopPropagation();
                handleNavigate(category.categorySlug);
                setClickedIndex(index);
              }}
            >
              VOIR PLUS
            </button>
            <p className="text-justify w-3/4 mx-auto text-white">
              {formatDescription(category.description)}
            </p>
          </div>
          
          {/* 3. Utilisation ProjectImage */}
          <ProjectImage
            src={category.imageSrc}
            width={250}
            height={200}
            alt={category.name}
            className="mx-auto mt-auto mb-5"
            priority
          />
        </div>
      ))}
    </div>
  );
}