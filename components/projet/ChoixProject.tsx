"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import { ProjectsData, Project } from "@/types";
import { PROJECT_CATEGORY_STYLES } from "@/lib/constants";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useEscapeKey } from "@/hooks/useEscapeKey";

export default function ProjectChoice({ allProjectsData }: { allProjectsData: ProjectsData }) {
  const params = useParams();
  const category = params?.category as string;
  const router = useRouter();
  
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useClickOutside<HTMLDivElement>(() => setIsPopupVisible(false)); 

  useEscapeKey(() => setIsPopupVisible(false));
  
  const [currentCategoryProjects, setCurrentCategoryProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (allProjectsData && category && allProjectsData[category]) {
      setCurrentCategoryProjects(allProjectsData[category].projects || []);
    }
  }, [allProjectsData, category]);

  const handleProjectSelect = (projectId: string) => {
    router.push(`/projet/${category}/${projectId}`);
    setIsPopupVisible(false);
  };

  const currentStyle = PROJECT_CATEGORY_STYLES[category] || { bg: "bg-white", text: "text-black" };

  return (
    <div className="flex flex-col items-center justify-center mb-16">
      <button
        onClick={() => setIsPopupVisible(true)}
        type="button"
        className="group relative flex items-center gap-4 bg-gradient-to-r from-blue-footer to-blue-projet text-white py-3 px-8 rounded-full font-bold shadow-[0_8px_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0_8px_25px_rgba(33,129,204,0.5)] hover:-translate-y-1 active:scale-95 border border-white/10 backdrop-blur-sm"
        aria-label="Explorer les projets"
      >
        <span className="text-lg tracking-wide">Explorer les projets</span>
        <span className="flex items-center justify-center w-7 h-7 bg-white/20 rounded-full transition-transform duration-300 group-hover:translate-x-1.5">
          <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
        </span>
      </button>

      {isPopupVisible && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 transition-opacity duration-300 opacity-100">
          <div ref={popupRef} className={`relative p-8 rounded-2xl w-80 md:w-96 ${currentStyle.bg} shadow-2xl transition-all duration-300 transform scale-100 border border-white/30`}>
            
            {/* Bouton croix en haut à droite pour fermer */}
            <button 
              onClick={() => setIsPopupVisible(false)}
              className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 transition-colors ${currentStyle.text}`}
              aria-label="Fermer"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <h3 className={`text-2xl font-black mb-6 text-center border-b border-black/10 pb-4 ${currentStyle.text}`}>
              Choisir un projet
            </h3>
            
            <ul className="space-y-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
              {currentCategoryProjects.length > 0 ? (
                currentCategoryProjects.map((project) => (
                  <li key={project.id}>
                    <button
                      type="button"
                      className={`w-full text-left flex items-center justify-between group/item cursor-pointer bg-white/10 hover:bg-white/40 p-4 rounded-xl transition-all transform active:scale-95 font-medium ${currentStyle.text} border border-transparent hover:border-white/50 shadow-sm`}
                      onClick={() => handleProjectSelect(project.id)}
                      aria-label={`Sélectionner le projet ${project.title}`}
                    >
                      <span className="text-lg">{project.title}</span>
                      <FontAwesomeIcon icon={faChevronRight} className="opacity-0 -translate-x-2 transition-all duration-300 group-hover/item:opacity-100 group-hover/item:translate-x-0" />
                    </button>
                  </li>
                ))
              ) : (
                <li className="text-center py-6 font-medium bg-black/5 rounded-xl">Aucun projet trouvé.</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}