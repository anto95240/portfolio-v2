'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation'; // Importation de useParams
import { useState, useEffect, useMemo } from 'react';
import projetData from "../../../data/projet.json"; // Chemin vers votre fichier JSON
import Image from 'next/image';
import Nav from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import ProjetChoice from "../../../components/projet/ChoixProject";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faArrowUpRightFromSquare, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type CategoryStyles = {
  jeux: { bg: string; text: string };
  ydays: { bg: string; text: string };
  web: { bg: string; text: string };
};

export default function ProjetDetail() {
  const { id, category } = useParams<{ id: string; category: keyof CategoryStyles }>(); // Typage explicite de useParams
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Contrôle de l'ouverture du menu
  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false); // État pour afficher/masquer le bouton Retour en haut

  const categoryStyles: CategoryStyles = useMemo(() => ({
    ydays: { bg: 'bg-gradient-to-r from-light-green to-green-blue', text: 'text-black' },
    web: { bg: 'bg-gradient-to-r from-green-blue to-blue-darkBlue', text: 'text-black' },
    jeux: { bg: 'bg-gradient-to-r from-blue-darkBlue to-dark-blue', text: 'text-white' },
  }), []);

  const project = projetData.projectPage[category as keyof typeof projetData.projectPage]?.projects.find(
    (proj) => proj.id === id
  );

  if (!project) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-xl">Le projet n'a pas été trouvé.</p>
      </div>
    );
  }

  // Gérer l'affichage du bouton Retour en haut en fonction de la position de défilement
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollToTopButton(true); // Afficher le bouton après 200px de défilement
      } else {
        setShowScrollToTopButton(false); // Masquer le bouton
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); // Nettoyage de l'événement lors de la destruction du composant
    };
  }, []);

  // Fonction pour revenir en haut de la page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
  
      // Typage explicite de chaque élément comme HTMLElement
      gsap.utils.toArray<HTMLElement>('.fade-down').forEach((elem) => {
        gsap.fromTo(
          elem,
          { y: 80, opacity: 0 }, // Position initiale
          {
            y: 0, // Position finale
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: elem, // Chaque élément déclenche son animation
              start: 'top 90%',
              end: 'top 10%',
              scrub: true,
            },
          }
        );
      });
    }
  }, []);   

  

  return (
    <div className={`flex h-full ${categoryStyles[category]?.bg}`}>
      <div className="w-1/4 fixed z-50 h-full">
        <Nav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} /> {/* Passage de l'état */}
      </div>

      <div className={`flex-1 flex flex-col items-center mx-auto px-5 lg:pl-56 ${categoryStyles[category]?.text} w-full lg:w-3/4 lg:max-w-9xl`}>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-8 w-full max-w-xl">
            <Image
              src={project.images.find((img: { type: string; url: string }) => img.type === "main")?.url || "/default-image.jpg"}
              alt={`${project.title} Image`}
              layout="intrinsic"
              width={500}
              height={345}
              className="rounded-b-3xl h-auto w-4/5"
              loading="lazy" // Lazy loading ajouté
            />

            <div className="flex flex-col w-full gap-x-12">
              <div className={`mb-8 relative ${isMenuOpen ? "z-10" : "z-50"}`}>
                <Link href={`/projet/${category}/`}>
                  <button aria-label="Revenir au thème">
                    <FontAwesomeIcon icon={faArrowLeftLong} className="mr-2 text-4xl" />
                  </button>
                </Link>
              </div>
              <div className="flex flex-col text-left gap-6">
                <h3 className="text-xl font-bold mb-4 uppercase">{project.title}</h3>
                <hr className="bg-black w-full h-[2px] border-none rounded" />
                <div className="flex flex-col gap-5 md:flex-row">
                  <div className='flex flex-col gap-5 pl-10'>
                    <p className="text-md uppercase">{category}</p>
                    <p className="text-md uppercase">{project.date}</p>
                    <p className="text-md uppercase">{Array.isArray(project.equipe) ? project.equipe.join(' - ') : project.equipe}</p>
                    <p className="text-md uppercase">{Array.isArray(project.technologies) ? project.technologies.join(' / ') : project.technologies}</p>
                  </div>
                  <div className="flex flex-col gap-5 pl-10 md:mx-auto">
                    <p className="text-md text-left md:text-center md:h-32">{project.description}</p>
                    <div className="flex flex-col md:flex-row gap-3">
                      {project.links.map((link, linkIndex) => {
                        const isObjectLink = typeof link !== 'string';
                        const url = isObjectLink ? link.url : link;
                        const label = isObjectLink ? (link.type === 'site' ? 'Accéder au site' : 'Accéder au code') : 'Site web';
            
                        return (
                          <div key={linkIndex} className="flex gap-3">
                            <div className="flex ml-3">
                              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="mr-2" />
                              <a href={url} className="underline" target="_blank" rel="noopener noreferrer">
                                {label}
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-9 pl-10 mt-10">
                  {project.images
                    .filter((img) => img.type === "gallery") // Filtre les images de type 'gallery'
                    .map((img, linkIndex) => (
                      <div key={linkIndex} className="flex flex-col gap-3">
                        <div className="flex ml-3">
                          <img alt={`Image ${linkIndex + 1}`} src={img.url} className="rounded-md fade-down" loading="lazy" />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProjetChoice />
        <Footer />
      </div>

      {/* Bouton Retour en haut */}
      {showScrollToTopButton && (
        <button aria-label="Retour en haut"
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 bg-blue-500 text-white p-3 rounded-full shadow-lg"
        >
          <FontAwesomeIcon icon={faArrowUp} className="text-xl" />
        </button>
      )}
    </div>
  );
}
