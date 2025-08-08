"use client";

import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faCircleInfo, faFile, faFileCircleCheck, faChevronDown, faChevronUp, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

export default function Navbar({ isMenuOpen, setIsMenuOpen }: { isMenuOpen: boolean; setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [isProjectOpen, setIsProjectOpen] = useState(false);

  const isClient = useIsClient();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProjectList = () => setIsProjectOpen(!isProjectOpen);

  if (!isClient) return null;

  return (
    <div className="relative h-screen">
      <button
        aria-label="Ouvrir le menu"
        className={`absolute top-5 left-5 text-2xl z-50 lg:hidden ${isMenuOpen ? "hidden" : "block"}`}
        onClick={toggleMenu}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      <nav
        className={`fixed z-40 top-0 left-0 h-screen bg-gradient-to-r from-light-blue to-light-green shadow-[0_10px_10px_0_rgba(0,0,0,0.75)] p-5 transition-transform duration-300 flex flex-col items-center
        ${isMenuOpen ? "translate-x-0 lg:pointer-events-none pointer-events-auto" : "-translate-x-full lg:pointer-events-auto pointer-events-none"} lg:translate-x-0 lg:relative lg:w-4/5 w-3/5 sm:w-2/6`}
      >
        <button
          aria-label="Fermer le menu"
          className={`absolute top-5 right-5 text-2xl lg:hidden ${isMenuOpen ? "block" : "hidden"}`}
          onClick={toggleMenu}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <Image className="mb-10" src="/images/logo.svg" alt="Logo" width={75} height={62} />

        <ol className="flex flex-col gap-8">
          <li className="flex items-center gap-4">
            <FontAwesomeIcon icon={faHouse} className="text-2xl" />
            <Link href="/" className="relative group z-50">
              Accueil
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>

          <li>
            <div className="flex items-center gap-4 cursor-pointer">
              <FontAwesomeIcon icon={faFileCircleCheck} className="text-2xl" />
              <Link href="/projet" className="relative group z-50">
                Projets
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <FontAwesomeIcon icon={isProjectOpen ? faChevronUp : faChevronDown} className="text-xl z-50" onClick={toggleProjectList} />
            </div>
            {isProjectOpen && (
              <ol className="flex flex-col gap-2 ml-8 mt-3">
                <li>
                  <Link href="/projet/ydays" className="group relative z-50">
                    Ydays
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
                <li>
                  <Link href="/projet/web" className="group relative z-50">
                    Web
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
                <li>
                  <Link href="/projet/jeux" className="group relative z-50">
                    Jeux
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              </ol>
            )}
          </li>

          <li className="flex items-center gap-4">
            <FontAwesomeIcon icon={faCircleInfo} className="text-2xl" />
            <Link href="/about" className="relative group z-50">
              A propos
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>

          <li className="flex items-center gap-4">
            <FontAwesomeIcon icon={faFile} className="text-2xl" />
            <Link href="/cv" className="relative group z-50">
              CV
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        </ol>
      </nav>
    </div>
  );
}
