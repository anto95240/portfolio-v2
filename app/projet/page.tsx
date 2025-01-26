'use client';

import { useState, useEffect } from "react";
import Nav from "../components/Navbar";
import Theme from "../components/projet/theme";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

// Hook personnalisé pour gérer l'état 'isClient'
const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

export default function Projet() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);

  const isClient = useIsClient();
  // S'assurer que le code s'exécute seulement côté client
  useEffect(() => {
    if (isClient) return;
    
    const handleScroll = () => {
      setShowScrollToTopButton(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);  

  // Fonction pour revenir en haut de la page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isClient) return null;
  
  return (
    <div className="flex h-screen bg-white">
      {/* Composant Nav */}
      <div className="w-1/4 fixed z-50 h-full">
        <Nav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col items-center mt-5 mx-auto px-5 lg:pl-56 w-full lg:w-3/4 lg:max-w-9xl">
        <h1 className="text-3xl mb-10">Liste de projets</h1>
        <Theme />
        <Footer />
      </div>

      {/* Bouton Retour en haut (uniquement visible sur mobile et tablette) */}
      {showScrollToTopButton && (
        <button
          aria-label="Retour en haut"
          onClick={scrollToTop}
          className="fixed bottom-10 right-5 z-50 bg-blue-500 text-white p-3 rounded-full shadow-lg sm:hidden md:hidden"
        >
          <FontAwesomeIcon icon={faArrowUp} className="text-xl" />
        </button>
      )}
    </div>
  );
}
