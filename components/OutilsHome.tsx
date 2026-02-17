"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tool } from "@/types";

export default function OutilsHome({ tools }: { tools: Tool[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Utilisation de containerRef pour scoper la sélection
    const ctx = gsap.context(() => {
      const elems = document.querySelectorAll(".fade-left-tool"); // Ou utiliser une ref callback sur les items
      
      if(elems.length > 0) {
        gsap.fromTo(".fade-left-tool",
          { x: -50, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.3, ease: "power3.out", stagger: 0.1,
            scrollTrigger: { 
                trigger: containerRef.current, 
                start: "top 30%", // Déclenche quand le haut du conteneur est à 80% de l'écran
                toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, containerRef); // Scope
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full md:w-10/12 lg:w-8/12 flex flex-col tools-container">
      <hr className="bg-black w-full my-10 h-[2px] border-none rounded" />
      <h1 className="mb-5 text-center">Mes outils</h1>
      <div className="bg-green-outil w-full max-w-2xl mx-auto p-3 rounded-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 w-full">
            {tools.map((tool) => (
              <div key={tool.id} className="flex items-center bg-blue-outil px-2 py-3 rounded-md shadow-md justify-between">
                <div className="relative w-7 h-7">
                   <Image src={tool.images} alt={tool.title} fill className="rounded-md object-contain fade-left-tool" />
                </div>
                <p className="md:text-lg text-base text-white ml-2 font-text fade-left-tool">{tool.title}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 md:mt-0 md:ml-6 mb-3 md:mb-0 text-center shrink-0">
            <Link href="/cv" className="bg-gradient-to-r from-light-blue via-light-green to-light-blue text-black md:text-lg py-3 px-4 text-base rounded-md shadow-[4px_4px_10px_0_rgba(0,0,0,0.5)] transition-transform transform active:scale-90">
                VOIR PLUS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}