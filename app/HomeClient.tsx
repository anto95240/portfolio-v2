"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

import { ProjectsData, Tool } from "@/types";

import Footer from "../components/Footer";
import Nav from "../components/Navbar";

const OutilsHome = dynamic(() => import("../components/OutilsHome"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[200px] flex items-center justify-center">Chargement...</div>
  ),
});
const ProjetCV = dynamic(() => import("../components/cv/ProjetCV"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center">Chargement...</div>
  ),
});

interface HomeClientProps {
  projects: ProjectsData;
  tools: Tool[];
}

export default function HomeClient({ projects, tools }: HomeClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-1/4 fixed z-50 h-full lg:block">
        <Nav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>

      <main
        id="main-content"
        tabIndex={-1}
        className={`flex-1 flex flex-col items-center mt-10 px-5 w-full transition-transform duration-300 focus:outline-none ${isMenuOpen ? "lg:pl-56 translate-x-1/4 lg:translate-x-0" : "lg:pl-56"}`}
      >
        <section className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center max-w-5xl">
          <div className="flex flex-col justify-center text-center lg:text-left">
            <h1 className="text-center text-xl">
              Hello, moi c’est <b>Antoine</b> ! <br />
              <br />
            </h1>
            <p className="text-center">
              <b>Etudiant</b> en <br /> <b>informatique</b>. <br />
              <br />
            </p>
            <p className="text-center">
              Je suis actuellement un cursus de 5 ans en <br /> informatique et me passionne de plus
              en plus pour <br /> le <b>domaine du web</b> et plus précisément pour le <br />{" "}
              <b>développement web front-end</b>.
            </p>
          </div>
          <Image
            src="/images/photo.svg"
            alt="Antoine"
            width={230}
            height={310}
            priority
            className="w-56 h-auto rounded-xl shadow-lg"
          />
        </section>

        <OutilsHome tools={tools} />
        <ProjetCV data={projects} title="Mes Projets" />

        <Footer />
      </main>
    </div>
  );
}
