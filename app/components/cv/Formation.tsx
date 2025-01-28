"use client";

import { useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Formation {
  id: string;
  title: string;
  date: string;
  lieux: string | string[];
  specialite: string | string[];
}

// Hook personnalisé pour gérer l'état 'isClient'
const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

export default function Formation() {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const isClient = useIsClient();

  // Fonction pour récupérer les formations depuis l'API interne
  const fetchFormations = async () => {
    try {
      const response = await fetch("/api/formation");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des formations");
      }
      const data = await response.json();
      setFormations(data.cvpage.formation);
      setLoading(false);
      if (data.cvpage.formation.length > 0) {
        setActiveId(data.cvpage.formation[0].id);
      }
    } catch (error) {
      console.error("Erreur API:", error);
      setLoading(false);
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

  useEffect(() => {
    if (formations.length === 0) {
      fetchFormations();
    }
  }, [formations]);

  useEffect(() => {
    if (isClient && formations.length === 0) return;

    if (formations.length > 0) {
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        ".fade-right",
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 2,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".fade-right",
            start: "top 90%",
            end: "top 20%",
            scrub: true,
          },
        }
      );
    }
  }, [formations, isClient]);

  if (loading) {
    return <p>Chargement des formations...</p>;
  }

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
        <div className="fade-right absolute left-3/4 top-0 bottom-0 w-[2px] bg-black transform -translate-x-1/2"></div>
        {formations.map((formation) => (
          <div key={formation.id} className="relative flex items-center mb-10 w-full">
            <div className="w-10/12 text-right fade-right">
              {renderFormationDetails(formation)}
            </div>
            <div className="fade-right relative z-10 w-6 h-5 bg-white rounded-full border-2 border-black flex items-center justify-center mx-6"></div>
            <div className="fade-right w-1/5 md:w-1/4 text-sm font-title text-black">
              {formation.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
