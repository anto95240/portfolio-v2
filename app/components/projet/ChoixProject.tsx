"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

type CategoryStyles = {
  [key: string]: { bg: string; text: string };
};

interface Project {
  id: string;
  title: string;
}

interface ProjectData {
  [key: string]: {
    projects: Project[];
  };
}

export default function ProjectChoice() {
  const { category } = useParams<{ category: string }>();
  const router = useRouter();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsData, setProjectsData] = useState<ProjectData>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoryStyles: CategoryStyles = {
    ydays: { bg: "bg-[#77D8FF]", text: "text-black" },
    web: { bg: "bg-[#10DFB9]", text: "text-black" },
    jeux: { bg: "bg-[#10DFB9]", text: "text-black" },
  };

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`/api/projets`);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des projets");
      }
      const data = await response.json();
      setProjectsData(data.projectPage || {});
    } catch (error) {
      setError("Impossible de récupérer les projets.");
      console.error("Erreur API:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (projectsData && projectsData[category]) {
      setProjects(projectsData[category].projects || []);
    }
  }, [projectsData, category]);

  if (isLoading) {
    return <p className="text-center text-lg font-semibold text-blue-600">Chargement des projets...</p>;
  }

  if (error) {
    return <p className="text-center text-lg font-semibold text-red-600">{error}</p>;
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
        aria-label="Explorer les projets"
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
                      aria-label={`Sélectionner le projet ${project.title}`}
                    >
                      {project.title}
                    </div>
                    {index < projects.length - 1 && <hr className="my-4 border-t-2 border-black" />}
                  </li>
                ))
              ) : (
                <li>Aucun projet trouvé pour cette catégorie.</li>
              )}
            </ul>
            <button
              onClick={handleClosePopup}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md transition-transform transform active:scale-90"
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
