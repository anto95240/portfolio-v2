"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function OutilHome() {
  const [tools, setTools] = useState<any[]>([]); // State pour les outils

  // Fonction pour récupérer les outils depuis l'API
  const fetchTools = async () => {
    try {
      const response = await fetch("/api/cv_skill");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des outils");
      }
      const data = await response.json();
      setTools(data.homepage.skills); // Mettre à jour les outils avec les données de l'API
    } catch (error) {
      console.error("Erreur API:", error);
    }
  };

  useEffect(() => {
    fetchTools(); // Appel de la fonction pour récupérer les données des outils
    if (tools) {
      gsap.registerPlugin(ScrollTrigger);

      // Animation fade-left2 avec stagger
      gsap.fromTo(
        ".fade-left",
        { x: -50, opacity: 0 }, // Début de l'animation
        {
          x: 0, // Arrive à sa position finale
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          stagger: 0.1, // Intervalle entre chaque élément
          scrollTrigger: {
            trigger: ".fade-left",
            start: "top 70%", // L'animation commence quand l"élément atteint 90% du haut
            end: "top 50%", // Terminé quand l'élément atteint 30%
            scrub: true,
          },
        }
      );
    }
  }, [tools]);

  if (!tools.length) return <p>Chargement des outils...</p>;

  return (
    <div className="w-8/12 flex flex-col">
      <hr className="bg-black w-full my-10 h-[2px] border-none rounded" />
      <h1 className="mb-5 text-center">Mes outils</h1>
      <div className="bg-green-outil w-full max-w-2xl mx-auto p-3 rounded-xl">
        {/* Conteneur principal */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Grille des outils */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="flex items-center bg-blue-outil px-2 py-3 rounded-md shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] justify-between"
              >
                <Image
                  src={tool.images}
                  alt={`Logo de ${tool.title}`}
                  width={30}
                  height={30}
                  className="rounded-md fade-left"
                />
                <p className="md:text-lg text-base text-white ml-2 font-text fade-left">{tool.title}</p>
              </div>
            ))}
          </div>

          {/* Bouton VOIR PLUS */}
          <div className="mt-6 md:mt-0 md:ml-6 text-center">
            <button className="bg-gradient-to-r from-light-blue via-light-green to-light-blue text-black md:text-lg py-3 px-4 text-base rounded-md shadow-[4px_4px_10px_0_rgba(0,0,0,0.5)] transition-transform transform active:scale-90">
              <Link href="/cv">
                VOIR PLUS
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
