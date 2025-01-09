'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import projetData from "../../data/projet.json"; // Chemin vers votre fichier JSON

export default function ProjectChoice() {
  const { id, category } = useParams();
  const router = useRouter(); // Utilisation de useRouter pour rediriger l'utilisateur
  const [isPopupVisible, setIsPopupVisible] = useState(false); // État pour afficher/masquer la popup

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
    setIsPopupVisible(true); // Affiche la popup
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false); // Masque la popup
  };

  const handleProjectSelect = (projectId: string) => {
    // Redirige l'utilisateur vers la page du projet sélectionné
    router.push(`/projet/${category}/${projectId}`);
    setIsPopupVisible(false); // Ferme la popup après la sélection
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <hr className="bg-black w-full my-10 h-[2px] border-none rounded" />

      {/* Bouton pour ouvrir la popup */}
      <button
        onClick={handleShowPopup}
        className="bg-[rgb(1,37,125,0.7)] border-black border text-white py-2 px-4 rounded-full"
      >
        Explorer les projets
      </button>

      {/* Popup */}
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#10DFB9] text-black p-6 rounded-md w-80">
            <h3 className="text-xl font-semibold mb-4">Choisir un projet</h3>
            <ul className="space-y-4">
              {projects.map((project) => (
                <li
                  key={project.id}
                  className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
                  onClick={() => handleProjectSelect(project.id)} // Rediriger avec l'ID du projet
                >
                  {project.title}
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
