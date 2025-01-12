'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProjectsPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false); // État pour savoir si l'appareil est mobile
  const [clickedIndex, setClickedIndex] = useState<number | null>(null); // État pour savoir quel bouton a été cliqué
  const router = useRouter();

  const categories = [
    {
      name: 'YDAYS',
      categorySlug: 'ydays',
      gradient: 'from-light-green to-green-blue',
      imageSrc: '/images/ydays.svg',
      description: 'Les YDAYS c\'est quoi ? C’est une spécificité d’Ynov campus !...',
    },
    {
      name: 'WEB',
      categorySlug: 'web',
      gradient: 'from-green-blue to-blue-darkBlue',
      imageSrc: '/images/web.svg',
      description: 'Il s’agit de site web, d’application web réalisés...',
    },
    {
      name: 'JEUX',
      categorySlug: 'jeux',
      gradient: 'from-blue-darkBlue to-dark-blue',
      imageSrc: '/images/jeux.svg',
      description: 'Il s’agit des jeux locaux sur le web ou en ligne...',
    }
  ];

  const handleNavigate = (category: string) => {
    router.push(`/projet/${category}`);
  };

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Vérifie si l'appareil est mobile (small screen)
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Utilise 768px comme seuil
    };

    checkIfMobile(); // Initial check
    window.addEventListener('resize', checkIfMobile); // Met à jour lors du redimensionnement

    return () => {
      window.removeEventListener('resize', checkIfMobile); // Nettoie l'événement lors du démontage
    };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 w-10/12 lg:w-8/12 max-w-l text-center mx-auto text-white justify-center">
      {categories.map((category, index) => (
        <div
          key={category.categorySlug}
          className={`bg-gradient-to-r ${category.gradient} min-h-[550px] shadow-[4px_4px_10px_0_rgba(0,0,0,0.5)] lg:min-h-[620px] text-black flex flex-col gap-10 relative group`}
          onClick={() => (isMobile ? handleToggle(index) : handleNavigate(category.categorySlug))}  // Gère le clic sur mobile
        >
          <h1 className="pt-5">{category.name}</h1>
          <div
            className={`absolute inset-0 flex flex-col gap-5 items-center pt-20 bg-black bg-opacity-25 transition-all duration-300 ease-in-out ${activeIndex === index ? 'opacity-100 visible' : 'opacity-0 invisible lg:group-hover:opacity-100 lg:group-hover:visible'}`}
          >
            <button
              className={`w-2/4 rounded-xl h-9 border border-solid border-black transition-all duration-300 transform active:scale-90 ${clickedIndex === index ? 'bg-[#007BFF] text-white' : 'bg-[#d9d9d97b] hover:border-white hover:bg-[#007BFF] hover:text-white'}`}
              onClick={(e) => {
                e.stopPropagation(); // Empêche la propagation du clic si on clique sur le bouton
                handleNavigate(category.categorySlug);
                setClickedIndex(index); // Change l'état du bouton pour qu'il devienne bleu
              }}
              aria-label={`Voir plus de détails sur ${category.name}`}
            >
              VOIR PLUS
            </button>
            <p className="text-justify w-3/4 mx-auto text-white">
              {category.description}
            </p>
          </div>
          <Image
            src={category.imageSrc}
            width={250}
            height={200}
            alt={category.name}
            className="mx-auto mt-auto mb-5"
          />
        </div>
      ))}
    </div>
  );
}
