'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import projetData from "../../data/projet.json"; // Chemin vers votre fichier JSON

type CategoryStyles = {
  jeux: { bg: string; text: string };
  ydays: { bg: string; text: string };
  web: { bg: string; text: string };
};

export default function ProjectChoice() {
  const { id, category } = useParams<{ id: string; category: keyof CategoryStyles }>();
  const router = useRouter();
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const categoryStyles: CategoryStyles = {
    ydays: { bg: 'bg-[#77D8FF]', text: 'text-black' },
    web: { bg: 'bg-[#10DFB9]', text: 'text-black' },
    jeux: { bg: 'bg-[#10DFB9]', text: 'text-black' },
  };

  const categoryData = projetData.projectPage[category as keyof typeof projetData.projectPage];
  
  if (!categoryData) {
    return <p>Catégorie non trouvée.</p>;
  }

  // Trouver le projet par ID
  const projects = categoryData.projects;
  const selectedProjectData = projects.find((proj) => proj.id === id);

  if (!selectedProjectData) {
    return <p>Le projet n'a pas été trouvé.</p>;
  }

  const handleShowPopup = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handleProjectSelect = (projectId: string) => {
    router.push(`/projet/${category}/${projectId}`);
    setIsPopupVisible(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <hr className="bg-black w-full my-10 h-[2px] border-none rounded" />

      <button
        onClick={handleShowPopup}
        className="bg-[rgb(1,37,125,0.7)] border-black border text-white py-2 px-4 rounded-full"
      >
        Explorer les projets
      </button>

      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-md w-80 ${categoryStyles[category]?.bg}`}>
            <h3 className={`text-xl font-semibold mb-4 ${categoryStyles[category]?.text}`}>Choisir un projet</h3>
            <ul className="space-y-4">
              {projects.map((project, index) => (
                <li key={project.id}>
                  <div
                    className={`cursor-pointer hover:bg-gray-200 p-2 ms-4 rounded-md ${categoryStyles[category]?.text}`}
                    onClick={() => handleProjectSelect(project.id)}
                  >
                    {project.title}
                  </div>
                  {/* Ajouter un hr après chaque projet sauf le dernier */}
                  {index < projects.length - 1 && (
                    <hr className="my-4 border-t-2 border-black" />
                  )}
                </li>
              ))}
            </ul>
            <button
              onClick={handleClosePopup}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
