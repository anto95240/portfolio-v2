"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
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

const getCurrentSeason = () => {
  const now = new Date();
  const year = now.getFullYear();

  const springEquinox = new Date(year, 2, 20);
  const summerSolstice = new Date(year, 5, 21);
  const fallEquinox = new Date(year, 8, 22);
  const winterSolstice = new Date(year, 11, 21);

  if (now >= springEquinox && now < summerSolstice) return "spring";
  if (now >= summerSolstice && now < fallEquinox) return "summer";
  if (now >= fallEquinox && now < winterSolstice) return "fall";
  return "winter";
};

export default function Navbar({ isMenuOpen, setIsMenuOpen }: { isMenuOpen: boolean; setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [season, setSeason] = useState(getCurrentSeason());
  const navRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const updateSeason = () => setSeason(getCurrentSeason());
    const interval = setInterval(updateSeason, 86400000); // Mise à jour quotidienne
    return () => clearInterval(interval);
  }, []);

  const snowflakesRef = useRef<(HTMLDivElement | null)[]>([]);
  const fallingLeavesRef = useRef<(HTMLDivElement | null)[]>([]);
  const bloomingPlantsRef = useRef<(HTMLDivElement | null)[]>([]);
  const palmTreeRef = useRef<(HTMLDivElement | null)[]>([]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProjectList = () => setIsProjectOpen(!isProjectOpen);

  const isClient = useIsClient();

  useEffect(() => {
    if (!isClient) return;
  
    const navbarHeight = navRef.current?.offsetHeight || 0;
  
    // Créer et animer les éléments en fonction de la saison
    if (season === "winter" && navRef.current) {
      const numFlakes = 20; // Nombre de flocons

    for (let i = 0; i < numFlakes; i++) {
      const snowflake = document.createElement("img");
      snowflake.src = "/images/snowflakes.png"; // Chemin vers l'image de flocon
      snowflake.classList.add("snowflake");
      snowflake.style.position = "absolute";
      snowflake.style.top = `${Math.random() * -50}px`;
      snowflake.style.left = `${Math.random() * 90}%`;
      snowflake.style.width = "20px";
      snowflake.style.height = "20px";
      snowflake.style.opacity = "0.6";
      snowflakesRef.current.push(snowflake);
      navRef.current?.appendChild(snowflake);

      // Animation continue
      gsap.to(snowflake, {
        y: navbarHeight,
        duration: Math.random() * 5 + 5,
        x: `+=${Math.random() * 100 - 50}%`,
        repeat: -1,
        yoyo: false,
        ease: "power1.inOut",
        delay: Math.random() * 5,
        onRepeat: () => {
          gsap.set(snowflake, { top: `${Math.random() * -50}px` });
        },
      });
    }
    } else if (season === "fall" && navRef.current) {
      const numLeaves = 20;

    for (let i = 0; i < numLeaves; i++) {
      const leaf = document.createElement("img");
      leaf.src = "/images/falling-leaves.png"; // Chemin vers l'image de feuille
      leaf.classList.add("leaf");
      leaf.style.position = "absolute";
      leaf.style.top = `${Math.random() * -50}px`;
      leaf.style.left = `${Math.random() * 90}%`;
      leaf.style.width = "20px";
      leaf.style.height = "20px";
      leaf.style.opacity = "0.6";
      fallingLeavesRef.current.push(leaf);
      navRef.current?.appendChild(leaf);

      gsap.to(leaf, {
        y: navbarHeight,
        duration: Math.random() * 5 + 5,
        x: `+=${Math.random() * 100 - 50}%`,
        repeat: -1,
        yoyo: false,
        ease: "power1.inOut",
        delay: Math.random() * 5,
        onRepeat: () => {
          gsap.set(leaf, { top: `${Math.random() * -50}px` });
        },
      });
    }
    } else if (season === "spring" && navRef.current) {
      if (bloomingPlantsRef.current.length === 0) {
        const numFlowers = 15;
    
        for (let i = 0; i < numFlowers; i++) {
          setTimeout(() => { // Apparition progressive
            const flower = document.createElement("img");
            flower.src = "/images/blooming-plants.png";
            flower.classList.add("flower");
            flower.style.position = "absolute";
            flower.style.bottom = "0px";
            flower.style.left = `${Math.random() * 90}%`;
            flower.style.width = "0px";
            flower.style.height = "0px";
            flower.style.opacity = "0";

            flower.style.zIndex = `${Math.floor(Math.random() * 5)}`;
            flower.style.filter = `hue-rotate(${Math.random() * 40 - 20}deg) brightness(${Math.random() * 0.4 + 0.8})`;

            bloomingPlantsRef.current.push(flower);
            navRef.current?.appendChild(flower);
    
            const targetSize = Math.random() * 30 + 50;

            gsap.fromTo(
              flower,
              {
                scale: 0,
                opacity: 0,
                // y: 30,
                rotation: Math.random() * 60 - 30
              },
              {
                width: `${targetSize}px`,
                height: `${targetSize}px`,
                scale: 1,
                opacity: 0.8,
                y: 0,
                rotation: 0,
                duration: 1.8,
                ease: "elastic.out(1, 0.5)"
              }
            );

            gsap.to(flower, {
              x: "+=5",
              duration: 2 + Math.random(),
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut"
            });

          }, i * 400);
        }
      }
    } else if (season === "summer" && navRef.current) {
      navRef.current.style.perspective = "800px";

      const numPalmTrees = 15;
      for (let i = 0; i < numPalmTrees; i++) {
        const palmTree = document.createElement("img");
        palmTree.src = "/images/palm-tree.png";
        palmTree.classList.add("palm-tree");

        palmTree.style.position = "absolute";
        palmTree.style.top = `${Math.random() * 80}%`;
        palmTree.style.left = `${Math.random() * 90}%`;
        palmTree.style.width = "40px";
        palmTree.style.height = "60px";
        palmTree.style.opacity = "0.7";
        palmTree.style.zIndex = "2";

        palmTree.style.transformStyle = "preserve-3d";
        palmTree.style.transformOrigin = "bottom center";

        palmTreeRef.current.push(palmTree);
        navRef.current.appendChild(palmTree);

        gsap.to(palmTree, {
          rotateY: Math.random() * 100 - 15,
          duration: Math.random() * 3 + 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    }

  }, [season, isClient]);

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
        ref={navRef}
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
