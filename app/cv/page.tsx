"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Nav from "../components/Navbar";
import ProjetCV from "../components/cv/ProjetCV";
import Skill from "../components/cv/Skills";
import Experience from "../components/cv/Experience";
import Formation from "../components/cv/Formation";
import Footer from "../components/Footer";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faChartSimple, faBriefcase, faGraduationCap, faFileCircleCheck, faArrowUp } from "@fortawesome/free-solid-svg-icons";

// Hook personnalisé pour gérer l'état 'isClient'
const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

export default function Cv() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("profil");
  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);

  const profilRef = useRef<HTMLDivElement>(null);
  const skillRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const formationRef = useRef<HTMLDivElement>(null);
  const projetRef = useRef<HTMLDivElement>(null);

  const sections = useMemo(
    () => [
      { id: "profil", icon: <FontAwesomeIcon icon={faUser} />, label: "Profil", ref: profilRef },
      { id: "skill", icon: <FontAwesomeIcon icon={faChartSimple} />, label: "Compétences", ref: skillRef },
      { id: "experience", icon: <FontAwesomeIcon icon={faBriefcase} />, label: "Expériences", ref: experienceRef },
      { id: "formation", icon: <FontAwesomeIcon icon={faGraduationCap} />, label: "Formations", ref: formationRef },
      { id: "projet", icon: <FontAwesomeIcon icon={faFileCircleCheck} />, label: "Projets", ref: projetRef },
    ],
    []
  );

  const isClient = useIsClient();

  // Fonction de défilement avec "smooth scroll"
  const scrollToSection = useCallback((ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, []);

  // Fonction de gestion du défilement et de la détection de la section active
  const handleScroll = useCallback(() => {
    setShowScrollToTopButton(window.scrollY > 100);

    const windowCenter = window.innerHeight / 2;

    sections.forEach((section) => {
      const rect = section.ref.current?.getBoundingClientRect();
      if (rect) {
        const sectionCenter = rect.top + rect.height / 2;

        if (sectionCenter <= windowCenter && sectionCenter >= 0) {
          setActiveSection(section.id);
        }
      }
    });
  }, [sections]);

  useEffect(() => {
    if (isClient) {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isClient]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isClient) {
    return null; // Ne pas rendre le composant tant que le client n'est pas monté
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Menu latéral */}
      <div className="w-1/4 fixed z-50 h-full">
        {isClient && <Nav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />}
      </div>

      {/* Contenu principal */}
      <div ref={profilRef} className="flex-1 flex flex-col items-center mt-5 mx-auto px-5 lg:pl-56 w-full lg:w-3/4 lg:max-w-9xl">
        <h1 className="text-3xl mb-10">CV</h1>
        <div className="flex flex-col gap-10 items-center">
          <div>
            <Image
              src="/images/photo.svg"
              alt="Photo de Antoine Richard"
              width={230}
              height={310}
              priority
              className="w-56 h-80"
            />
          </div>
          <div className="flex flex-col gap-5 items-center">
            <p>ANTOINE RICHARD</p>
            <p>Etudiant</p>
          </div>
          <div className="mt-6 md:mt-0 text-center">
            <a
              href="/doc/CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-footer text-white md:text-base py-2 px-14 text-base rounded-full shadow-[4px_4px_10px_0_rgba(0,0,0,0.5)] transition-transform transform active:scale-90"
            >
              Télécharger mon CV
            </a>
          </div>
        </div>

        <div ref={skillRef} className="w-full">{isClient && <Skill />}</div>
        <div ref={experienceRef} className="w-full">{isClient && <Experience />}</div>
        <div ref={formationRef} className="w-full">{isClient && <Formation />}</div>
        <div ref={projetRef} className="w-full">{isClient && <ProjetCV />}</div>
        {isClient && <Footer />}

        {showScrollToTopButton && (
          <button
            aria-label="Retour en haut"
            onClick={scrollToTop}
            className="fixed bottom-10 right-10 z-50 bg-blue-500 text-white p-3 rounded-full shadow-lg"
          >
            <FontAwesomeIcon icon={faArrowUp} className="text-xl" />
          </button>
        )}
      </div>

      {/* Menu de navigation à droite */}
      <div className="fixed top-1/4 right-0 z-50 flex flex-col items-center">
        <div className="bg-menu-cv w-8 md:w-16 h-72 md:h-80 rounded-tl-[50px] rounded-bl-[50px] flex flex-col justify-around items-center p-6 shadow-lg">
          {sections.map((section) => (
            <div
              key={section.id}
              className="relative group flex items-center gap-2 cursor-pointer"
              onClick={() => {
                setActiveSection(section.id);
                scrollToSection(section.ref);
              }}
            >
              <span
                className="absolute right-full text-black mr-4 opacity-0 lg:group-hover:opacity-100 transition-all duration-300 whitespace-nowrap"
              >
                {section.label}
              </span>
              <div
                className={`text-xl text-white flex justify-center items-center rounded-full w-10 h-10 transition-all duration-300 ${
                  activeSection === section.id ? "border-4 border-menuCV-lightBlue" : "bg-transparent hover:bg-menuCV-lightBlue"
                }`}
              >
                {section.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
