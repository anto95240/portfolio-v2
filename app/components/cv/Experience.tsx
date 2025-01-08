'use client';

import { useState } from 'react';
import experienceData from '../../data/cv_experience.json';

export default function Experience() {
  const experiences = experienceData.cvpage.experience;
  const [activeId, setActiveId] = useState<string | null>(experiences[0]?.id || null); // Active la première date par défaut

  const toggleInfo = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="w-10/12 lg:w-8/12 mx-auto">
      <hr className="bg-black w-full my-10 h-[2px] border-none rounded mx-auto" />
      <h1 className="text-2xl mb-10 text-center font-title">EXPERIENCE</h1>
      <div className="relative flex flex-col">

        {/* Ligne verticale */}
        <div className="absolute left-1/4 top-0 bottom-0 w-[2px] bg-black transform -translate-x-1/2"></div>

        {/* Éléments de la timeline */}
        {experiences.map((experience) => (
          <div
            key={experience.id}
            className="relative flex items-center mb-10 w-full"
          >
            {/* Date à droite */}
            <div className="w-1/5 md:w-1/4 text-sm font-title text-black">
              {experience.date}
            </div>

            <div className="relative z-10 w-6 h-5 bg-white rounded-full border-2 border-black flex items-center justify-center mx-6">
              {/* Placeholder pour un logo */}
              {/* <img
                src="{formation.logo}" // Ajouter un champ "logo" dans le JSON si nécessaire
                alt={`${formation.title} logo`}
                className="w-4 h-4"
              /> */}
            </div>

            {/* Informations principales à gauche */}
            <div className="w-10/12 text-left">
              {activeId === experience.id ? (
                // Informations détaillées affichées
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
                // Titre cliquable
                <button
                  onClick={() => toggleInfo(experience.id)}
                  className="text-lg font-title"
                >
                  {experience.title}
                </button>
              )}
            </div>

          </div>
          
        ))}
      </div>
    </div>
  );
}
