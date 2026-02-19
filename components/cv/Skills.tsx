"use client";

import { SkillsData } from "@/types";
import renderCategory from "./SkillCategory";
import { useScrollReveal } from "@/hooks/animations/useScrollReveal";

export default function Skill({ data }: { data: SkillsData }) {

  useScrollReveal(".skills-anim", {
    axis: "y",
    offset: 30,
    duration: 0.5,
    start: "top 90%",
    end: "top 70%",
    scrub: 1, // On passe 1 car dans votre code original vous aviez `scrub: 1`
  }); 

  return (
    <div className="w-11/12 lg:w-8/12 flex flex-col mx-auto pb-20">
      <hr className="bg-black w-full my-10 h-[2px] border-none rounded" />
      <h1 className="text-2xl mb-10 text-center font-title uppercase">Compétences</h1>
      <div className="flex flex-col gap-4">
        {renderCategory(data.frontend, "Développement Front-end")}
        {renderCategory(data.backend, "Développement Back-end")}
        {renderCategory(data.database, "Bases de données")}
        {renderCategory(data.outils, "Outils & Méthodologie")}
        {renderCategory(data.autres_langages, "Autres langages & Expériences")}
      </div>
    </div>
  );
}