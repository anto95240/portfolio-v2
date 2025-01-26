'use client';

import { useState, useEffect } from 'react';
import Nav from "./components/Navbar";
import ProjetCV from "./components/cv/ProjetCV";
import Outil from "./components/OutilsHome";
import Footer from "./components/Footer";
import Image from "next/image";
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

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);
  
  const isClient = useIsClient();

  if (!isClient) return null;

  return (
    <div className="flex h-screen bg-white">
      {/* Composant Nav */}
      <div className="w-1/4 fixed z-50 h-full">
        {isClient && <Nav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />}
      </div>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col items-center mt-10 mx-auto px-5 lg:pl-56 w-full lg:w-3/4 lg:max-w-9xl">
        <section className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center">
          <div className="flex flex-col justify-center text-center lg:text-left">
            <p className="text-center">
              Hello, moi c’est <b>Antoine</b> ! <br /><br />
            </p>
            <p className="text-center">
              <b>Etudiant</b> en <br /> <b>informatique</b>. <br /><br />
            </p>
            <p className="text-center">
              Je suis actuellement un cursus de 5 ans en <br /> informatique et me passionne de plus en plus pour <br /> le <b>domaine du web</b> et plus précisément pour le <br /> <b>développement web front-end</b>.
            </p>
          </div>
          <div>
            <Image
              className="mb-10 w-56 h-80"
              src="/images/photo.svg"
              alt="Photo d'Antoine"
              width={230}
              height={310}
              priority
            />
          </div>
        </section>

        {/* Outils et projets */}
        {isClient && <Outil />}
        
        {/* Composant ProjetCV : rendu uniquement côté client */}
        {isClient && <ProjetCV />}

        <Footer />
      </div>
    </div>
  );
}
