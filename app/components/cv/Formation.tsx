"use client";

import { useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Définition du type pour la formation
interface Formation {
  id: string;
  title: string;
  date: string;
  lieux: string | string[];
  specialite: string | string[];
}

export default function Formation() {
  const [formations, setFormations] = useState<Formation[]>([]); // State pour les données de formation
  const [activeId, setActiveId] = useState<string | null>(null);

  // Fonction pour récupérer les formations depuis l'API interne
  const fetchFormations = async () => {
    try {
      const response = await fetch("/api/formation");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des formations");
      }
      const data = await response.json();
      setFormations(data.cvpage.formation); // Mettre à jour le state avec les données de formations
      if (data.cvpage.formation.length > 0) {
        setActiveId(data.cvpage.formation[0].id); // Active la première formation par défaut
      }
    } catch (error) {
      console.error("Erreur API:", error);
    }
  };

  // Mémorisation de la fonction pour éviter les recréations inutiles
  const toggleInfo = useCallback((id: string) => {
    setActiveId(prevId => (prevId === id ? null : id));
  }, []);

  // Fonction utilitaire pour afficher les lieux et spécialités
  const renderList = (data: string | string[]) => {
    return Array.isArray(data) ? data.join(" / ") : data;
  };

  // Récupérer les formations au chargement du composant
  useEffect(() => {
    if (formations.length === 0) {
      fetchFormations();
    }
  }, [formations]);

  useEffect(() => {
    if (formations.length > 0) {
      gsap.registerPlugin(ScrollTrigger);

      // Animation fade-right avec stagger
      gsap.fromTo(
        ".fade-right",
        { x: 50, opacity: 0 }, // Début de l'animation
        {
          x: 0, // Arrive à sa position finale
          opacity: 1,
          duration: 2,
          ease: "power3.out",
          stagger: 0.2, // Intervalle entre chaque élément
          scrollTrigger: {
            trigger: ".fade-right",
            start: "top 90%", // L'animation commence quand l'élément atteint 90% du haut
            end: "top 20%", // Terminé quand l'élément atteint 30%
            scrub: true,
          },
        }
      );
    }
  }, [formations]);

  if (!formations.length) return <p>Chargement des formations...</p>;

  const renderFormationDetails = (formation: Formation) => {
    return activeId === formation.id ? (
      <div className="bg-white shadow-[2px_2px_5px_0_rgba(0,0,0,0.25)] border-black rounded-lg p-6">
        <h2 className="text-lg font-text mb-2">{formation.title}</h2>
        <p className="text-sm font-text mb-1">
          <strong>Lieu:</strong> {renderList(formation.lieux)}
        </p>
        <p className="text-sm font-text">
          <strong>Spécialisation:</strong> {renderList(formation.specialite)}
        </p>
      </div>
    ) : (
      <button onClick={() => toggleInfo(formation.id)} className="text-lg font-text">
        {formation.title}
      </button>
    );
  };

  return (
    <div className="w-10/12 lg:w-8/12 mx-auto">
      <hr className="bg-black w-full my-10 h-[2px] border-none rounded mx-auto" />
      <h1 className="text-2xl mb-10 text-center font-title">FORMATION</h1>
      <div className="relative flex flex-col">

        {/* Ligne verticale */}
        <div className="fade-right absolute left-3/4 top-0 bottom-0 w-[2px] bg-black transform -translate-x-1/2"></div>

        {/* Éléments de la timeline */}
        {formations.map((formation) => (
          <div key={formation.id} className="relative flex items-center mb-10 w-full">
            {/* Informations principales à gauche */}
            <div className="w-10/12 text-right fade-right">
              {renderFormationDetails(formation)}
            </div>

            {/* Cercle */}
            <div className="fade-right relative z-10 w-6 h-5 bg-white rounded-full border-2 border-black flex items-center justify-center mx-6"></div>

            {/* Date à droite */}
            <div className="fade-right w-1/5 md:w-1/4 text-sm font-title text-black">
              {formation.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
