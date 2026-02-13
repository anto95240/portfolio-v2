"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Hook personnalisé pour gérer l'état 'isClient'
const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

export default function ThemePage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const router = useRouter();

  // Utilisation du hook personnalisé 'useIsClient'
  const isClient = useIsClient();

  const categories = [
    {
      name: "YDAYS",
      categorySlug: "ydays",
      gradient: "from-light-green to-green-blue",
      imageSrc: "/images/ydays.svg",
      description: "Les YDAYS c'est quoi ?\n\nC'est une spécificité d'Ynov campus ! Toute l'année, les étudiants de différentes filières se réunissent un mercredi pour travailler en projet collaboratif et donner vie à leur idée",
      className: "text-black",
    },
    {
      name: "WEB",
      categorySlug: "web",
      gradient: "from-green-blue to-blue-darkBlue",
      imageSrc: "/images/web.webp",
      description: "Il s'agit de site web, d'application web réalisés à l'école ou en stage",
      className: "text-black",
    },
    {
      name: "JEUX",
      categorySlug: "jeux",
      gradient: "from-blue-darkBlue to-dark-blue",
      imageSrc: "/images/jeux.webp",
      description: "Il s'agit des jeux locaux sur le web ou en ligne de commande réalisés à l'école ou en stage ",
      className: "text-white",
    }
  ];

  // Gère la navigation vers une catégorie
  const handleNavigate = (category: string) => {
    router.push(`/projet/${category}`);
  };

  // Gère l'ouverture et la fermeture des catégories sur mobile
  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Vérifie si l'appareil est mobile
  useEffect(() => {
    if (isClient) return;

    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Seuil de 768px pour considérer un appareil comme mobile
    };

    checkIfMobile(); // Vérification initiale
    window.addEventListener("resize", checkIfMobile); // Mise à jour lors du redimensionnement

    return () => {
      window.removeEventListener("resize", checkIfMobile); // Nettoyage lors du démontage
    };
  }, [isClient]);

  // Formate la description en ajoutant des retours à la ligne
  const formatDescription = (description: string) => {
    return description.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  if (!isClient) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 w-10/12 lg:w-8/12 max-w-l text-center mx-auto text-white justify-center">
      {categories.map((category, index) => (
        <div
          key={category.categorySlug}
          className={`bg-gradient-to-r ${category.gradient} min-h-[550px] shadow-[4px_4px_10px_0_rgba(0,0,0,0.5)] lg:min-h-[620px] text-black flex flex-col gap-10 relative group`}
          onClick={() => (isMobile ? handleToggle(index) : handleNavigate(category.categorySlug))}
          aria-labelledby={`category-${category.categorySlug}`}
        >
          <h1 id={`category-${category.categorySlug}`} className={`${category.className} pt-5`}>{category.name}</h1>
          <div
            className={`absolute inset-0 flex flex-col gap-5 items-center pt-20 bg-black bg-opacity-25 transition-all duration-300 ease-in-out ${activeIndex === index ? "opacity-100 visible" : "opacity-0 invisible lg:group-hover:opacity-100 lg:group-hover:visible"}`}
            aria-live="polite"
          >
            <button
              className={`w-2/4 rounded-xl h-9 border border-solid border-black transition-all duration-300 transform active:scale-90 ${clickedIndex === index ? "bg-[#007BFF] text-white" : "bg-[#d9d9d97b] hover:border-white hover:bg-[#007BFF] hover:text-white"}`}
              onClick={(e) => {
                e.stopPropagation();
                handleNavigate(category.categorySlug);
                setClickedIndex(index);
              }}
              aria-label={`Voir plus de détails sur ${category.name}`}
            >
              VOIR PLUS
            </button>
            <p className="text-justify w-3/4 mx-auto text-white">
              {formatDescription(category.description)}
            </p>
          </div>
          <Image
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
