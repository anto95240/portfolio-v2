'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Pour gérer les redirections

export default function ProjectsPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const router = useRouter();

  // Fonction pour gérer la navigation vers les pages de catégorie
  const handleNavigate = (category: string) => {
    router.push(`/projet/${category}`); // Redirige vers la page de la catégorie
  };

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 w-10/12 lg:w-8/12 max-w-l text-center mx-auto text-white justify-center">
      {/* YDAYS Section */}
      <div
        className="bg-gradient-to-r from-light-green to-green-blue min-h-[550px] shadow-[4px_4px_10px_0_rgba(0,0,0,0.5)] lg:min-h-[620px] text-black flex flex-col gap-10 relative group"
        onClick={() => handleToggle(0)}
      >
        <h1 className="pt-5">YDAYS</h1>
        <div
          className={`absolute inset-0 flex flex-col gap-5 items-center pt-20 bg-black bg-opacity-25 transition-all duration-300 ease-in-out ${
            activeIndex === 0 ? 'opacity-100 visible' : 'opacity-0 invisible lg:group-hover:opacity-100 lg:group-hover:visible'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="bg-[#d9d9d97b] w-2/4 rounded-xl h-9 border border-solid border-black hover:border-white hover:bg-[#007BFF] hover:text-white"
            onClick={() => handleNavigate('ydays')} // Redirection vers la catégorie YDAYS
          >
            VOIR PLUS
          </button>
          <p className="text-justify w-3/4 mx-auto text-white">
            Les YDAYS c'est quoi ? <br />
            <br />C’est une spécificité d’Ynov campus ! <br />
            Toute l'année, les étudiants de différentes filières se réunissent un mercredi pour travailler en projet collaboratif et donner vie à leur idée.
          </p>
        </div>
        <Image
          src="/images/ydays.svg"
          width={250}
          height={200}
          alt="yday"
          className="mx-auto mt-auto mb-5"
        />
      </div>

      {/* WEB Section */}
      <div
        className="bg-gradient-to-r from-green-blue to-blue-darkBlue min-h-[550px] shadow-[4px_4px_10px_0_rgba(0,0,0,0.5)] lg:min-h-[620px] text-black flex flex-col gap-10 relative group"
        onClick={() => handleToggle(1)}
      >
        <h1 className="pt-5">WEB</h1>
        <div
          className={`absolute inset-0 flex flex-col gap-5 items-center pt-20 bg-black bg-opacity-25 transition-all duration-300 ease-in-out ${
            activeIndex === 1 ? 'opacity-100 visible' : 'opacity-0 invisible lg:group-hover:opacity-100 lg:group-hover:visible'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="bg-[#d9d9d97b] w-2/4 rounded-xl h-9 border border-solid border-black hover:border-white hover:bg-[#007BFF] hover:text-white"
            onClick={() => handleNavigate('web')} // Redirection vers la catégorie WEB
          >
            VOIR PLUS
          </button>
          <p className="text-justify w-3/4 mx-auto text-white">
            Il s’agit de site web, d’application web réalisés à l’école ou en stage.
          </p>
        </div>
        <Image
          src="/images/web.svg"
          width={250}
          height={200}
          alt="web"
          className="mx-auto mt-auto mb-5"
        />
      </div>

      {/* JEUX Section */}
      <div
        className="bg-gradient-to-r from-blue-darkBlue to-dark-blue min-h-[550px] shadow-[4px_4px_10px_0_rgba(0,0,0,0.5)] lg:min-h-[620px] text-white flex flex-col gap-10 relative group"
        onClick={() => handleToggle(2)}
      >
        <h1 className="pt-5">JEUX</h1>
        <div
          className={`absolute inset-0 flex flex-col gap-5 items-center pt-20 bg-black bg-opacity-25 transition-all duration-300 ease-in-out ${
            activeIndex === 2 ? 'opacity-100 visible' : 'opacity-0 invisible lg:group-hover:opacity-100 lg:group-hover:visible'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="bg-[#d9d9d97b] w-2/4 rounded-xl h-9 border border-solid border-black text-black hover:border-white hover:bg-[#007BFF] hover:text-white"
            onClick={() => handleNavigate('jeux')} // Redirection vers la catégorie JEUX
          >
            VOIR PLUS
          </button>
          <p className="text-justify w-3/4 mx-auto text-white">
            Il s’agit des jeux locaux sur le web ou en ligne de commande réalisés à l’école ou en stage.
          </p>
        </div>
        <Image
          src="/images/jeux.svg"
          width={250}
          height={200}
          alt="jeux"
          className="mx-auto mt-auto mb-5"
        />
      </div>
    </div>
  );
}
