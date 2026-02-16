"use client";

import { useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Experience as ExperienceType } from "@/types";

export default function Experience({ data }: { data: ExperienceType[] }) {
  const [activeId, setActiveId] = useState<string | null>(data[0]?.id || null);

  const toggleInfo = useCallback((id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(".fade-exp", 
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, stagger: 0.2,
          scrollTrigger: { 
            trigger: ".exp-container", 
            start: "top 75%", 
            end: "top 10%",
            scrub: true,
          }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="w-10/12 lg:w-8/12 mx-auto exp-container">
      <hr className="bg-black w-full my-10 h-[2px] border-none" />
      <h1 className="text-2xl mb-10 text-center font-title uppercase">Expérience</h1>
      <div className="relative flex flex-col">
        <div className="absolute left-1/4 top-0 bottom-0 w-[2px] bg-black transform -translate-x-1/2 hidden md:block"></div>
        {data.map((exp) => (
          <div key={exp.id} className="relative flex flex-col md:flex-row items-center mb-10 w-full fade-exp  md:-ml-2.5">
            <div className="w-full md:w-1/4 text-sm font-text text-center md:text-right md:pr-4 mb-2 md:mb-0">{exp.date}</div>
            <div className="fade-left2 relative z-10 w-5 h-5 bg-white rounded-full border-2 border-black flex items-center justify-center"></div>
            <div className="flex-1 pl-0 md:pl-10 text-left w-full">
              {activeId === exp.id ? (
                <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-blue-500">
                  <h2 className="font-bold mb-2 text-lg">{exp.title}</h2>
                  <p className="text-sm"><strong>Lieu:</strong> {exp.lieux}</p>
                  <p className="text-sm italic">{exp.domaine}</p>
                  <p className="text-sm mt-2">{exp.realisation}</p>
                </div>
              ) : (
                <button onClick={() => toggleInfo(exp.id)} className="text-lg font-medium hover:text-blue-600 transition-colors">
                  {exp.title}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}