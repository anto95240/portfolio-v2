"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

type CategoryStyles = {
  jeux: { bg: string; text: string };
  ydays: { bg: string; text: string };
  web: { bg: string; text: string };
};

export default function ProjectChoice() {
  const { id, category } = useParams<{ id: string; category: keyof CategoryStyles }>();
  const router = useRouter();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [projects, setProjects] = useState<any[]>([]); // State pour les projets
  const [projectsData, setProjectsData] = useState<any>({}); // State pour stocker les données de tous les projets

  const categoryStyles: CategoryStyles = {
    ydays: { bg: "bg-[#77D8FF]", text: "text-black" },
    web: { bg: "bg-[#10DFB9]", text: "text-black" },
    jeux: { bg: "bg-[#10DFB9]", text: "text-black" },
  };

  // Fonction pour récupérer les projets depuis l'API
  const fetchProjects = async () => {
    try {
      const response = await fetch(`/api/projets`);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des projets");
      }
      const data = await response.json();
  
      // Assurez-vous de prendre la propriété ProjectPage avant les catégories
      setProjectsData(data.projectPage || {}); // Enregistrer la structure de ProjectPage
    } catch (error) {
      console.error("Erreur API:", error);
    }
  };
  

  useEffect(() => {
    fetchProjects(); // Appel de la fonction pour récupérer les projets à chaque changement de catégorie
  }, []);
  
  useEffect(() => {
    if (projectsData && projectsData[category]) {
      setProjects(projectsData[category].projects || []);
    }
  }, [projectsData, category]);  

  // Vérification si les projets sont présents et valides
  if (!Array.isArray(projects)) {
    return <p className="text-center text-lg font-semibold text-red-600">Chargement des projets...</p>;
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
        className="bg-[rgb(1,37,125,0.7)] border-black border text-white py-2 px-4 rounded-full transition-transform transform active:scale-90"
      >
        Explorer les projets
      </button>

      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 opacity-100">
          <div className={`p-6 rounded-md w-80 ${categoryStyles[category]?.bg} transition-all duration-300`}>
            <h3 className={`text-xl font-semibold mb-4 ${categoryStyles[category]?.text}`}>Choisir un projet</h3>
            <ul className="space-y-4">
              {projects.length > 0 ? (
                projects.map((project, index) => (
                  <li key={project.id}>
                    <div
                      className={`cursor-pointer hover:bg-gray-200 p-2 ms-4 rounded-md transition-transform transform active:scale-95 ${categoryStyles[category]?.text}`}
                      onClick={() => handleProjectSelect(project.id)}
                    >
                      {project.title}
                    </div>
                    {/* Ajouter un hr après chaque projet sauf le dernier */}
                    {index < projects.length - 1 && (
                      <hr className="my-4 border-t-2 border-black" />
                    )}
                  </li>
                ))
              ) : (
                <p>Aucun projet trouvé pour cette catégorie.</p>
              )}
            </ul>
            <button
              onClick={handleClosePopup}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md transition-transform transform active:scale-90"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
