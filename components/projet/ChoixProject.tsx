"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProjectsData, Project } from "@/types";

type CategoryStyles = {
  [key: string]: { bg: string; text: string };
};

// On accepte les données complètes en props au lieu de fetcher
export default function ProjectChoice({ allProjectsData }: { allProjectsData: ProjectsData }) {
  const params = useParams();
  const category = params?.category as string; // Sécurisation du typage
  const router = useRouter();
  
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [currentCategoryProjects, setCurrentCategoryProjects] = useState<Project[]>([]);

  const categoryStyles: CategoryStyles = {
    ydays: { bg: "bg-[#77D8FF]", text: "text-black" },
    web: { bg: "bg-[#10DFB9]", text: "text-black" },
    jeux: { bg: "bg-[#10DFB9]", text: "text-black" },
  };

  // Dès que la catégorie change ou que les données arrivent, on filtre
  useEffect(() => {
    if (allProjectsData && category && allProjectsData[category]) {
      setCurrentCategoryProjects(allProjectsData[category].projects || []);
    }
  }, [allProjectsData, category]);

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

  // Style par défaut si la catégorie n'est pas trouvée
  const currentStyle = categoryStyles[category] || { bg: "bg-white", text: "text-black" };

  return (
    <div className="flex flex-col items-center justify-center mb-16">
      <hr className="bg-black w-full my-10 h-[2px] border-none rounded" />

      <button
        onClick={handleShowPopup}
        className="bg-[rgb(1,37,125,0.7)] border-black border text-white py-2 px-4 rounded-full transition-transform transform active:scale-90 font-bold shadow-md"
        aria-label="Explorer les projets"
      >
        Explorer les projets
      </button>

      {isPopupVisible && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 opacity-100">
          <div className={`p-6 rounded-xl w-80 ${currentStyle.bg} shadow-2xl transition-all duration-300 transform scale-100`}>
            <h3 className={`text-xl font-bold mb-6 text-center border-b border-black/10 pb-2 ${currentStyle.text}`}>
              Choisir un projet
            </h3>
            <ul className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
              {currentCategoryProjects.length > 0 ? (
                currentCategoryProjects.map((project, index) => (
                  <li key={project.id}>
                    <div
                      className={`cursor-pointer hover:bg-white/30 p-3 rounded-lg transition-all transform active:scale-95 font-medium ${currentStyle.text}`}
                      onClick={() => handleProjectSelect(project.id)}
                      aria-label={`Sélectionner le projet ${project.title}`}
                    >
                      {project.title}
                    </div>
                    {/* Séparateur sauf pour le dernier élément */}
                    {index < currentCategoryProjects.length - 1 && <hr className="my-2 border-black/10" />}
                  </li>
                ))
              ) : (
                <li className="text-center py-4">Aucun projet trouvé pour cette catégorie.</li>
              )}
            </ul>
            <button
              onClick={handleClosePopup}
              className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-transform transform active:scale-95 shadow-md"
              aria-label="Fermer le popup"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}