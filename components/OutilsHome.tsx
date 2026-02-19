"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Tool } from "@/types";
import { useScrollReveal } from "@/hooks/animations/useScrollReveal";

export default function OutilsHome({ tools }: { tools: Tool[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useScrollReveal(".fade-left-tool", {
    axis: "x",
    offset: -50,
    duration: 1.8,
    stagger: 0.2,
    triggerElement: ".fade-left-tool",
    start: "top 60%",
    end: "top 40%",
  });

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
                   <Image src={tool.images} alt={tool.title} fill className="fade-left-tool rounded-md object-contain" />
                </div>
                <p className="fade-left-tool md:text-lg text-base text-white ml-2 font-text">{tool.title}</p>
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