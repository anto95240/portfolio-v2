"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tool } from "@/types";

export default function OutilsHome({ tools }: { tools: Tool[] }) {
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const elems = document.querySelectorAll(".fade-left-tool");
      if(elems.length > 0) {
        gsap.fromTo(elems,
          { x: -50, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.1,
            scrollTrigger: { trigger: ".tools-container", start: "top 70%", end: "top 40%", scrub: true }
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full md:w-10/12 lg:w-8/12 flex flex-col tools-container">
      <hr className="bg-black w-full my-10 h-[2px] border-none rounded" />
      <h1 className="mb-5 text-center text-2xl font-bold">Mes outils</h1>
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
          <div className="mt-6 md:mt-0 md:ml-6 text-center shrink-0">
            <Link href="/cv" className="inline-block bg-gradient-to-r from-light-blue via-light-green to-light-blue text-black py-3 px-4 rounded-md shadow-lg transition-transform transform active:scale-90 font-bold">
                VOIR PLUS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}