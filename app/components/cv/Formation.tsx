'use client';

import { useState, useMemo, useCallback } from 'react';
import formationData from '../../data/cv_formation.json';

// Définition du type pour la formation
interface Formation {
  id: string;
  title: string;
  date: string;
  lieux: string | string[];
  specialite: string | string[];
}

export default function Formation() {
  const formations = useMemo<Formation[]>(() => formationData.cvpage.formation, []); // Mémorisation des données de formations
  const [activeId, setActiveId] = useState<string | null>(formations.length ? formations[0].id : null); // Active la première formation par défaut

  // Mémorisation de la fonction pour éviter les recréations inutiles
  const toggleInfo = useCallback((id: string) => {
    setActiveId(prevId => (prevId === id ? null : id));
  }, []);

  // Fonction utilitaire pour afficher les lieux et spécialités
  const renderList = (data: string | string[]) => {
    return Array.isArray(data) ? data.join(' / ') : data;
  };

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
      <button onClick={() => toggleInfo(formation.id)} className="text-lg font-text" >
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
        <div className="absolute left-3/4 top-0 bottom-0 w-[2px] bg-black transform -translate-x-1/2"></div>

        {/* Éléments de la timeline */}
        {formations.map((formation) => (
          <div key={formation.id} className="relative flex items-center mb-10 w-full">
            {/* Informations principales à gauche */}
            <div className="w-10/12 text-right">
            {renderFormationDetails(formation)}
            </div>

            {/* Cercle */}
            <div className="relative z-10 w-6 h-5 bg-white rounded-full border-2 border-black flex items-center justify-center mx-6"></div>

            {/* Date à droite */}
            <div className="w-1/5 md:w-1/4 text-sm font-title text-black">
              {formation.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
