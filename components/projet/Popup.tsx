"use client";

import { useRouter } from "next/navigation"; 
import ProjectImage from "@/components/ui/ProjectImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Project } from "@/types"; 

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

  const mainImage = project.images.find((image) => image.type === "main")?.url || "/placeholder.jpg";

  return (
    <div
      className="fixed top-0 right-0 w-10/12 lg:w-3/12 bottom-0 bg-[#274B6D] text-white overflow-y-auto flex flex-col gap-6 rounded-b-md pt-5 z-50"
      role="dialog"
      aria-labelledby="popup-title"
    >
      <button 
        type="button" 
        aria-label="Fermer la popup" 
        onClick={onClose} 
        className="absolute top-3 left-5 text-white"
      >
        <FontAwesomeIcon icon={faReply} />
      </button>

      <h1 id="popup-title" className="text-center text-xl mt-5 font-bold">{project.title}</h1>
      <hr className="w-10/12 mx-auto" />

      <div className="flex flex-col gap-8 flex-grow">
        <ProjectImage
          src={mainImage}
          alt={project.title}
          width={500}
          height={300}
          className="h-48 w-10/12 mx-auto rounded-lg shadow-lg"
          priority
        />

        <p className="text-center px-5 h-12 w-full text-ellipsis overflow-hidden">{project.description}</p>

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

      <button
        type="button"
        onClick={handleMoreDetails}
        className="bg-green-projet mx-auto w-full flex gap-3 justify-center items-center text-white font-bold py-3 rounded-md mt-auto transition-all duration-300 transform active:scale-95"
      >
        Plus de détails
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="mr-2" />
      </button>
    </div>
  );
}