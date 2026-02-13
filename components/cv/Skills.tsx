"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { SkillsData, SkillItem } from "@/types";

export default function Skill({ data }: { data: SkillsData }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(".skills-anim",
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.5, ease: "power3.out", stagger: 0.05,
          scrollTrigger: { trigger: ".skills-container", start: "top 90%", end: "bottom 20%", scrub: true }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const renderCategory = (list: SkillItem[], title: string) => {
    if (!list?.length) return null;
    return (
      <div className="skills-container mb-10">
        <p className="mb-5 font-bold text-lg border-b border-gray-200 pb-2 skills-anim">{title}</p>
        <div className="flex flex-row flex-wrap gap-6 justify-center md:justify-start">
          {list.map((skill) => (
            <div key={skill.id} className="flex flex-col items-center group w-24 lg:w-32 skills-anim">
              <div className="relative w-12 h-12 lg:w-16 lg:h-16 mb-2">
                <Image src={skill.images} alt={skill.title} fill className="object-contain transition-transform duration-300 group-hover:scale-110" />
              </div>
              <p className="text-sm font-medium text-center">{skill.title}</p>
              <p className="text-[10px] text-gray-500 text-center italic mt-1">{skill.usage}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-11/12 lg:w-8/12 flex flex-col mx-auto pb-20">
      <hr className="bg-black w-full my-10 h-[2px] border-none rounded" />
      <h1 className="text-2xl mb-12 text-center font-bold tracking-widest uppercase">Compétences</h1>
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