"use client";

import { useRouter } from "next/navigation"; 
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

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

interface PopupProps {
  project: Project;
  category: string;
  onClose: () => void;
}

export default function PopUp({ project, category, onClose }: PopupProps) {
  const router = useRouter();

  const handleMoreDetails = () => {
    router.push(`/projet/${category}/${project.id}`);
  };

  // Trouver l'image principale ou utiliser une image de remplacement
  const mainImage = project.images.find((image) => image.type === "main")?.url || "/placeholder.jpg";

  return (
    <div
      className="fixed top-0 right-0 w-8/12 lg:w-3/12 bottom-0 bg-[#274B6D] text-white overflow-y-auto flex flex-col gap-6 rounded-b-md pt-5 z-50"
      role="dialog"
      aria-labelledby="popup-title"
    >
      <button 
        aria-label="Fermer la popup" 
        onClick={onClose} 
        className="absolute top-5 left-5 text-white"
      >
        <FontAwesomeIcon icon={faReply} />
      </button>

      <h1 id="popup-title" className="text-center text-xl font-bold">{project.title}</h1>
      <hr className="w-10/12 mx-auto" />

      <div className="flex flex-col gap-8 flex-grow">
        {/* Image principale du projet */}
        <Image
          src={mainImage}
          alt={project.title}
          width={500}
          height={300}
          className="h-48 w-10/12 mx-auto object-cover rounded-lg"
          priority
        />

        {/* Description du projet */}
        <p className="pl-10 h-12 text-ellipsis overflow-hidden">{project.description}</p>

        {/* Technologies utilisées */}
        <div className="flex flex-col gap-3">
          <p className="pl-10">Technologies</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {project.technologies.map((tech, techIndex) => (
              <span key={techIndex} className="bg-[#D9D9D9] text-black px-2 py-1 rounded-md shadow-md">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Liens */}
        <div className="flex flex-col gap-3 pl-10">
          {project.links.map((link, linkIndex) => {
            const isObjectLink = typeof link !== "string";
            const url = isObjectLink ? link.url : link;
            const label = isObjectLink ? (link.type === "site" ? "Site web" : "GitHub") : "Site web";

            return (
              <div key={linkIndex} className="flex flex-col gap-3">
                <p>{label}</p>
                <div className="flex ml-3 items-center">
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="mr-2" />
                  <a href={url} className="underline" target="_blank" rel="noopener noreferrer">
                    {label}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bouton "Plus de détails" */}
      <button
        onClick={handleMoreDetails}
        className="bg-green-projet mx-auto w-full flex gap-3 justify-center items-center text-white font-bold py-3 rounded-md mt-auto transition-all duration-300 transform active:scale-95"
        aria-label="Plus de détails"
      >
        Plus de détails
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="mr-2" />
      </button>
    </div>
  );
}
