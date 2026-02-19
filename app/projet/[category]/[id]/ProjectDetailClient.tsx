"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

import Nav from "@/components/Navbar";
import Footer from "@/components/Footer";

import ProjetChoice from "@/components/projet/ChoixProject";
import ProjectLinks from "@/components/projet/ProjectLinks";
import ProjectImage from "@/components/ui/ProjectImage";
import { CATEGORY_STYLES, DEFAULT_STYLE } from "@/lib/constants";

import { Project, ProjectsData } from "@/types";

interface ProjectDetailClientProps {
  project: Project;
  category: string;
  allProjects: ProjectsData;
}

export default function ProjectDetailClient({
  project,
  category,
  allProjects,
}: ProjectDetailClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentStyle = CATEGORY_STYLES[category] || DEFAULT_STYLE;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".fade-down").forEach((elem) => {
        gsap.fromTo(
          elem,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 90%",
              end: "top 15%",
              scrub: true,
            },
          },
        );
      });
    });
    return () => ctx.revert();
  }, []);

  if (!project)
    return <p className="text-xl text-center mt-20">Le projet est manquant.</p>;

  const mainImage =
    project.images?.find((img) => img.type === "main")?.url || "/default.jpg";
  const galleryImages =
    project.images?.filter((img) => img.type === "gallery") || [];

  return (
    <div className={`flex h-full ${currentStyle.bg}`}>
      <div className="w-1/4 fixed z-50 h-full">
        <Nav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>

      <div
        className={`flex-1 flex flex-col items-center mx-auto px-5 lg:pl-56 ${currentStyle.text} w-screen lg:w-3/4 lg:max-w-9xl`}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-8 w-full max-w-xl">
            <ProjectImage
              src={mainImage}
              alt={`${project.title} Couverture`}
              width={500}
              height={345}
              priority
              className="rounded-b-3xl w-4/5 h-auto"
            />

            <div className="flex flex-col w-full gap-x-12">
              <div className={`mb-8 relative ${isMenuOpen ? "z-10" : "z-20"}`}>
                <Link href={`/projet/${category}/`}>
                  <button
                    aria-label="Revenir au thème"
                    type="button"
                    className="hover:scale-110 transition-transform"
                  >
                    <FontAwesomeIcon
                      icon={faArrowLeftLong}
                      className="mr-2 text-4xl"
                    />
                  </button>
                </Link>
              </div>

              <div className="flex flex-col text-left gap-6">
                <h3 className="text-xl font-bold mb-4 uppercase">
                  {project.title}
                </h3>
                <hr className="bg-black w-full h-[2px] border-none rounded" />

                <div className="flex flex-col gap-10 md:flex-row">
                  <div className="flex flex-col gap-5 pl-10">
                    <p className="text-md uppercase">{category}</p>
                    <p className="text-md uppercase">{project.date}</p>
                    <p className="text-md uppercase">
                      {project.equipe.join(" - ")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((t, i) => (
                        <span
                          key={i}
                          className="text-md uppercase bg-white/20 px-2 rounded border border-white/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-5 pl-10 md:mx-auto">
                    <p className="text-md text-left md:text-center md:h-32">
                      {project.description}
                    </p>

                    <ProjectLinks links={project.links} />
                  </div>
                </div>

                <div className="flex flex-col gap-9 Mt-10 mx-auto">
                  {galleryImages.map((img, index) => (
                    <div key={index} className="flex flex-col gap-3 fade-down">
                      <ProjectImage
                        src={img.url}
                        alt={`Galerie ${index + 1}`}
                        width={700}
                        height={500}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 w-full">
          <ProjetChoice allProjectsData={allProjects} />
        </div>

        <Footer />
      </div>
    </div>
  );
}
