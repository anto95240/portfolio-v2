'use client';

import { useState } from 'react';
import Nav from "../../components/Navbar";
import Footer from "../../components/Footer";
import Popup from "../../components/projet/Popup";
import Image from 'next/image';
import projetData from "../../data/projet.json"; // Chemin du fichier JSON

// Types
type Link = { type: string; url: string } | string;
type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  date: string;
  equipe: string[];
  links: Link[];
  images: { type: string; url: string }[];
};

type ProjectsCategory = {
  projects: Project[];
};

type ProjectsData = {
  [key: string]: ProjectsCategory;
};

export default function ProjetYdays() {
  const [showPopup, setShowPopup] = useState(false); // État pour afficher/masquer la popup
  const [selectedProject, setSelectedProject] = useState<Project | null>(null); // Projet actuellement sélectionné

  const projects = projetData.projectPage.jeux.projects; // Liste des projets

  // Fonction pour ouvrir la popup
  const handleShowPopup = (project: Project) => {
    setSelectedProject(project);
    setShowPopup(true);
  };

  // Fonction pour fermer la popup
  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedProject(null);
  };

  return (
    <div className="flex h-full bg-gradient-to-r from-blue-darkBlue to-dark-blue">
      {/* Composant Nav */}
      <div className="w-1/4 fixed z-50 h-full">
        <Nav />
      </div>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col items-center mt-10 mx-auto px-5 lg:pl-56 text-white w-full lg:w-3/4 lg:max-w-9xl">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl mb-20">Jeux</h1>
          {/* Liste des projets */}
          <div className="flex flex-col gap-8  w-full">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center text-center mx-auto w-10/12 gap-x-12`}
              >
                {/* Afficher l'image principale */}
                <Image
                  src={project.images.find((img) => img.type === "main")?.url || "/default-image.jpg"}
                  alt={`${project.title} Image`}
                  width={500}
                  height={345}
                  className="rounded-md mb-4"
                />
                {/* Section des informations */}
                <div className="flex flex-col text-center mx-auto gap-6">
                  <h3 className="text-xl font-bold mb-4">{project.title}</h3>
                  <p className="text-md">{project.description}</p>
                  {/* Bouton pour voir plus de détails */}
                  <button
                    onClick={() => handleShowPopup(project)}
                    className="bg-[rgb(1,37,125,0.7)] mx-auto border-black border w-fit text-white font-bold py-2 px-4 rounded-md mt-2 transition-all duration-300"
                  >
                    Voir plus de détails
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Composant Popup */}
        {showPopup && selectedProject && (
          <Popup project={selectedProject} onClose={handleClosePopup} />
        )}

        <Footer />
      </div>
    </div>
  );
}
