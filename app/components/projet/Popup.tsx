'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation'; // Utiliser useParams pour récupérer la catégorie
import Image from 'next/image';
import projectsData from '../../data/projet.json'; // Adapter le chemin selon votre projet
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

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

export default function PopUp() {
  const { category } = useParams(); // Récupérer la catégorie depuis l'URL
  const router = useRouter();

  // Charger les données de projets pour la catégorie
  const categories: ProjectsData = projectsData.projectPage;

  // Vérifier que category est bien une string avant d'utiliser comme clé
  if (typeof category !== 'string') {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        <p>Catégorie invalide.</p>
      </div>
    );
  }

  // Récupérer les projets de la catégorie si elle existe, sinon un tableau vide
  const projects = categories[category]?.projects || []; // Projets de la catégorie

  // Gestion de l'état du projet actif
  const [currentProjectIndex, setCurrentProjectIndex] = useState<number>(0);
  const currentProject = projects[currentProjectIndex]; // Projet actif

  // Fonction pour naviguer vers le projet suivant
  const handleNextProject = () => {
    setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  // Redirection si la catégorie n'existe pas
  if (!categories[category]) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        <p>Catégorie introuvable. <a href="/projects" className="underline">Retourner à la liste des projets.</a></p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#274B6D] w-3/12 ml-auto text-white gap-6 flex flex-col">
      {/* Bouton pour revenir en arrière */}
      <button onClick={() => router.back()} className="ml-5 mt-2">
        <FontAwesomeIcon icon={faReply} />
      </button>
      <hr className="w-10/12 mx-auto" />

      {/* Titre de la catégorie */}
      <h1 className="text-center text-xl font-bold">{category.toUpperCase()}</h1>

      {/* Projet actuel */}
      {currentProject ? (
        <>
          {/* Titre */}
          <p className="pl-10">{currentProject.title}</p>

          {/* Image principale */}
          <Image
            src={currentProject.images.find((image) => image.type === 'main')?.url || '/placeholder.jpg'}
            alt={currentProject.title}
            width={500}
            height={300}
            className="h-48 w-10/12 mx-auto object-cover rounded-lg"
          />

          {/* Description */}
          <p className="pl-10 h-12">{currentProject.description}</p>

          {/* Technologies */}
          <div className="flex flex-col gap-3">
            <p className="pl-10">Technologies</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {currentProject.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="bg-[#D9D9D9] text-black px-2 py-1 rounded-md shadow-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Liens */}
          <div className="flex flex-col gap-3 pl-10">
            {currentProject.links.map((link, linkIndex) => {
              const isObjectLink = typeof link !== 'string';
              const url = isObjectLink ? link.url : link;
              const label = isObjectLink ? (link.type === 'site' ? 'Site web' : 'GitHub') : 'Site web';

              return (
                <div key={linkIndex}>
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="mr-2" />
                  <a href={url} className="underline" target="_blank" rel="noopener noreferrer">
                    {label}
                  </a>
                </div>
              );
            })}
          </div>

          {/* Bouton pour changer de projet */}
          <button
            onClick={handleNextProject}
            className="mt-auto bg-green-projet w-full h-10 rounded-md text-black"
          >
            Voir le projet suivant
          </button>
        </>
      ) : (
        <p className="text-center mt-10">Aucun projet disponible dans cette catégorie.</p>
      )}
    </div>
  );
}
