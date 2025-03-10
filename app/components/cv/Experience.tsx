"use client";

import { useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Experience {
  id: string;
  date: string;
  title: string;
  lieux: string;
  domaine: string;
  realisation: string;
}

// Hook personnalisé pour gérer l'état 'isClient'
const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const isClient = useIsClient();

  // Fonction pour récupérer les expériences depuis l'API interne
  const fetchExperiences = async () => {
    setLoading(true); // Assurez-vous de démarrer le chargement avant l'appel API

    try {
      const response = await fetch("/api/experience");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des expériences");
      }
      const data = await response.json();
      setExperiences(data.cvpage.experience);

      if (data.cvpage.experience.length > 0) {
        setActiveId(data.cvpage.experience[0].id);
      }
    } catch (error) {
      console.error("Erreur API:", error);
    } finally {
      setLoading(false); // Arrêt du chargement dans tous les cas
    }
  };

  // Mémorisation de la fonction pour éviter les recréations inutiles
  const toggleInfo = useCallback((id: string) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  }, []);

  // Fonction de rendu pour afficher les détails de l'expérience
  const renderExperienceDetails = (experience: Experience) => {
    return activeId === experience.id ? (
      <div className="bg-white shadow-[-2px_2px_5px_0_rgba(0,0,0,0.25)] rounded-lg p-6 border-black">
        <h2 className="text-lg font-text mb-2">{experience.title}</h2>
        <p className="text-sm font-text mb-1">
          <strong>Lieu:</strong> {experience.lieux}
        </p>
        <p className="text-sm font-text">
          <strong>Spécialisation:</strong> {experience.domaine}
        </p>
        <p className="text-sm font-text">
          <strong>Réalisation:</strong> {experience.realisation}
        </p>
      </div>
    ) : (
      <button onClick={() => toggleInfo(experience.id)} className="text-lg font-text">
        {experience.title}
      </button>
    );
  };

  useEffect(() => {
    if (experiences.length === 0) {
      fetchExperiences();
    }
  }, [experiences]);

  useEffect(() => {
    if (isClient && experiences.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".fade-left2",
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 2,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".fade-left2",
          start: "top 90%",
          end: "top 10%",
          scrub: true,
        },
      }
    );
  }, [experiences, isClient]);

  if (loading) {
    return <p>Chargement des expériences...</p>;
  }

  if (!experiences.length) return <p>Chargement des expériences...</p>;

  return (
    <div className="w-10/12 lg:w-8/12 mx-auto">
      <hr className="bg-black w-full my-10 h-[2px] border-none rounded mx-auto" />
      <h1 className="text-2xl mb-10 text-center font-title">EXPERIENCE</h1>
      <div className="relative flex flex-col">
        <div className="fade-left2 absolute left-1/4 top-0 bottom-0 w-[2px] bg-black transform -translate-x-1/2"></div>
        {experiences.map((experience) => (
          <div key={experience.id} className="relative flex items-center mb-10 w-full">
            <div className="fade-left2 w-1/5 md:w-1/4 text-sm font-text text-black">
              {experience.date}
            </div>
            <div className="fade-left2 relative z-10 w-6 h-5 bg-white rounded-full border-2 border-black flex items-center justify-center mx-6"></div>
            <div className="fade-left2 w-10/12 text-left">
              {renderExperienceDetails(experience)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
