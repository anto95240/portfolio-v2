"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { useIsClient } from "@/hooks/useIsClient";
import { NAV_LINKS } from "@/lib/constants";
import { useToggle } from "@/hooks/utils/useToggle";

export default function Navbar({ isMenuOpen, setIsMenuOpen }: { isMenuOpen: boolean; setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [isProjectOpen, toggleProjectList] = useToggle(false);  const isClient = useIsClient();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  if (!isClient) return null;

  return (
    <div className="relative h-screen">
      <button
        type="button"
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
          type="button"
          aria-label="Fermer le menu"
          className={`absolute top-5 right-5 text-2xl lg:hidden ${isMenuOpen ? "block" : "hidden"}`}
          onClick={toggleMenu}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <Image className="mb-10" src="/images/logo.svg" alt="Logo" width={75} height={62} />

        <ol className="flex flex-col gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={link.icon} className="text-2xl" />
                <div className="flex items-center gap-2">
                   <Link href={link.href} className="relative group z-50">
                    {link.label}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                  {/* Gestion spécifique pour le dropdown Projets */}
                  {link.hasDropdown && (
                    <FontAwesomeIcon 
                        icon={isProjectOpen ? faChevronUp : faChevronDown} 
                        className="text-xl z-50 cursor-pointer" 
                        onClick={toggleProjectList} 
                    />
                  )}
                </div>
              </div>

              {/* Sous-menu Projets */}
              {link.hasDropdown && isProjectOpen && (
                <ol className="flex flex-col gap-2 ml-12 mt-3">
                  {link.subLinks?.map((sub) => (
                    <li key={sub.label}>
                      <Link href={sub.href} className="group relative z-50 text-sm font-medium">
                        {sub.label}
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                      </Link>
                    </li>
                  ))}
                </ol>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}