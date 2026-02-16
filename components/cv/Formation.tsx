"use client";

import { useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Formation as FormationType } from "@/types";

export default function Formation({ data }: { data: FormationType[] }) {
  const [activeId, setActiveId] = useState<string | null>(data[0]?.id || null);

  const toggleInfo = useCallback((id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  }, []);

  const renderList = (val: string | string[]) => Array.isArray(val) ? val.join(" / ") : val;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(".fade-form",
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, stagger: 0.2,
          scrollTrigger: { trigger: ".form-container", start: "top 80%", scrub: true }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="w-10/12 lg:w-8/12 mx-auto form-container">
      <hr className="bg-black w-full my-10 h-[2px] border-none" />
      <h1 className="text-2xl mb-10 text-center font-title uppercase">Formation</h1>
      <div className="relative flex flex-col">
        <div className="absolute left-3/4 top-0 bottom-0 w-[2px] bg-black transform -translate-x-1/2 hidden md:block"></div>
        {data.map((form) => (
          <div key={form.id} className="relative flex flex-col-reverse md:flex-row items-center mb-10 w-full fade-form">
            <div className="w-full md:w-3/4 md:pr-10 text-right">
              {activeId === form.id ? (
                <div className="bg-white shadow-md rounded-lg p-6 border-r-4 border-green-500 text-left md:text-right">
                  <h2 className="font-bold mb-2 text-lg">{form.title}</h2>
                  <p className="text-sm"><strong>Lieu:</strong> {renderList(form.lieux)}</p>
                  <p className="text-sm"><strong>Spécialité:</strong> {renderList(form.specialite)}</p>
                </div>
              ) : (
                <button onClick={() => toggleInfo(form.id)} className="text-lg font-medium hover:text-green-600 transition-colors">
                  {form.title}
                </button>
              )}
            </div>
            <div className="fade-right relative z-10 w-5 h-5 bg-white rounded-full border-2 border-black flex items-center justify-center md:-ml-2.5"></div>
            <div className="w-full md:w-1/4 text-sm font-text text-center md:text-left md:pl-4 mb-2 md:mb-0">{form.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}