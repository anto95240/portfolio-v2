'use client';
import Link from 'next/link'; // Importation du composant Link de Next.js

import { useState } from 'react';
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCircleInfo, faFile, faFileCircleCheck, faChevronDown, faChevronUp, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Gère l'ouverture/fermeture du menu
  const [isProjectOpen, setIsProjectOpen] = useState(false); // Gère l'ouverture/fermeture de la sous-liste des projets

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen); // Toggle pour le menu principal
  const toggleProjectList = () => setIsProjectOpen(!isProjectOpen); // Toggle pour la liste des projets

  return (
    <div className="relative h-screen">
      {/* Burger Menu (en dehors de nav) */}
      {!isMenuOpen && (
        <button
          className="absolute top-5 left-5 text-2xl z-20 lg:hidden"
          onClick={toggleMenu}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      )}

      {/* Menu latéral */}
      <nav
        className={`fixed top-0 left-0 h-screen bg-gradient-to-r from-light-blue to-light-green p-5 transition-transform duration-300 flex flex-col items-center ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:relative lg:w-4/5 w-2/5 sm:w-2/6 z-10`}
      >
        {/* Crois pour fermer le menu */}
        <button
          className="absolute top-5 right-5 text-2xl lg:hidden"
          onClick={toggleMenu}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {/* Logo */}
        <Image
          className="mb-10"
          src="/images/logo.svg"
          alt="Logo"
          width={75}
          height={62}
        />

        {/* Liens de navigation */}
        <ol className="flex flex-col gap-8">
          <li className="flex items-center gap-4">
            <FontAwesomeIcon icon={faHouse} className="text-2xl" />
            <Link href="/">Accueil</Link> {/* Utilisation de Link au lieu de <a> */}
          </li>

          <li>
            <div
              className="flex items-center gap-4 cursor-pointer"
            >
              <FontAwesomeIcon icon={faFileCircleCheck} className="text-2xl" />
              <Link href="/projet">Projets</Link>  {/* Utilisation de Link au lieu de <a> */}
              <FontAwesomeIcon
                icon={isProjectOpen ? faChevronUp : faChevronDown}
                className="text-xl"
                onClick={toggleProjectList}
              />
            </div>
            {isProjectOpen && (
              <ol className="flex flex-col gap-2 ml-8 mt-3">
                <li><Link href="/projet/ydays">Ydays</Link></li>  {/* Utilisation de Link */}
                <li><Link href="/projet/web">Web</Link></li>    {/* Utilisation de Link */}
                <li><Link href="/projet/jeux">Jeux</Link></li>   {/* Utilisation de Link */}
              </ol>
            )}
          </li>

          <li className="flex items-center gap-4">
            <FontAwesomeIcon icon={faFile} className="text-2xl" />
            <Link href="/cv">CV</Link>  {/* Utilisation de Link au lieu de <a> */}
          </li>

          <li className="flex items-center gap-4">
            <FontAwesomeIcon icon={faCircleInfo} className="text-2xl" />
            <Link href="/about" className="hover:underline">A propos</Link> {/* Utilisation de Link */}
          </li>
        </ol>
      </nav>
    </div>
  );
}
