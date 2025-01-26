"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Tool {
  id: number;
  images: string;
  title: string;
}

// Hook personnalisé pour gérer l'état 'isClient'
const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

export default function OutilHome() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const isClient = useIsClient();

  useEffect(() => {
    fetch("/api/cv_skill")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur de chargement des outils");
        }
        return response.json();
      })
      .then((data) => {
        setTools(data.homepage.skills as Tool[]);
        setLoading(false);
      })
      .catch((error) => {
        setError("Une erreur est survenue lors du chargement des outils.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const fadeLeftElements = document.querySelectorAll(".fade-left");
    if (fadeLeftElements.length) {
      gsap.fromTo(
        fadeLeftElements,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".fade-left",
            start: "top 70%",
            end: "top 40%",
            scrub: true,
          },
        }
      );
    }
  }, [isClient, tools]);

  if (!isClient) return null;

  if (loading) {
    return <p>Chargement des outils...</p>;
  }

  return (
    <div className="w-full md:w-10/12 lg:w-8/12 flex flex-col">
      <hr className="bg-black w-full my-10 h-[2px] border-none rounded" />
      <h1 className="mb-5 text-center">Mes outils</h1>
      <div className="bg-green-outil w-full max-w-2xl mx-auto p-3 rounded-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="flex items-center bg-blue-outil px-2 py-3 rounded-md shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] justify-between"
              >
                <Image
                  src={tool.images}
                  alt={`Logo de ${tool.title}`}
                  width={30}
                  height={30}
                  className="rounded-md fade-left w-7 h-7"
                  aria-label={`Logo de ${tool.title}`}
                />
                <p className="md:text-lg text-base text-white ml-2 font-text fade-left">{tool.title}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 md:mt-0 md:ml-6 text-center">
            <button className="bg-gradient-to-r from-light-blue via-light-green to-light-blue text-black md:text-lg py-3 px-4 text-base rounded-md shadow-[4px_4px_10px_0_rgba(0,0,0,0.5)] transition-transform transform active:scale-90">
              <Link href="/cv">
                VOIR PLUS
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
