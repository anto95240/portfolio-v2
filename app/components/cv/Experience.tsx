'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import experienceData from '../../data/cv_experience.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Définition du type pour l'expérience
interface Experience {
  id: string;
  date: string;
  title: string;
  lieux: string;
  domaine: string;
  realisation: string;
}

export default function Experience() {
  const experiences = useMemo<Experience[]>(() => experienceData.cvpage.experience, []); // Mémorisation des données d'expérience
  const [activeId, setActiveId] = useState<string | null>(experiences.length ? experiences[0].id : null); // Active la première date par défaut

  // Mémorisation de la fonction pour éviter les recréations inutiles
  const toggleInfo = useCallback((id: string) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  }, []);

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
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Animation fade-left2 avec stagger
      gsap.fromTo(
        '.fade-left2',
        { x: -50, opacity: 0 }, // Début de l'animation
        {
          x: 0, // Arrive à sa position finale
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          stagger: 0.2, // Intervalle entre chaque élément
          scrollTrigger: {
            trigger: '.fade-left2',
            start: 'top 90%', // L'animation commence quand l'élément atteint 90% du haut
            end: 'top 10%', // Terminé quand l'élément atteint 30%
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <div className="w-10/12 lg:w-8/12 mx-auto">
      <hr className="bg-black w-full my-10 h-[2px] border-none rounded mx-auto" />
      <h1 className="text-2xl mb-10 text-center font-title">EXPERIENCE</h1>
      <div className="relative flex flex-col">

        {/* Ligne verticale */}
        <div className="fade-left2 absolute left-1/4 top-0 bottom-0 w-[2px] bg-black transform -translate-x-1/2"></div>

        {/* Éléments de la timeline */}
        {experiences.map((experience) => (
          <div key={experience.id} className="relative flex items-center mb-10 w-full">
            {/* Date à droite */}
            <div className="fade-left2 w-1/5 md:w-1/4 text-sm font-text text-black">
              {experience.date}
            </div>

            <div className="fade-left2 relative z-10 w-6 h-5 bg-white rounded-full border-2 border-black flex items-center justify-center mx-6"></div>

            {/* Informations principales à gauche */}
            <div className="fade-left2 w-10/12 text-left">
              {renderExperienceDetails(experience)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
