"use client";

import { useState } from "react";

import Footer from "@/components/Footer";
import Nav from "@/components/Navbar";
import Theme from "@/components/projet/theme";

export default function Projet() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white">
      <div className="w-1/4 fixed z-50 h-full">
        <Nav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 flex flex-col items-center mt-5 mx-auto px-5 lg:pl-56 w-full lg:w-3/4 lg:max-w-9xl focus:outline-none"
      >
        <h1 className="text-3xl mb-10">Liste de projets</h1>
        <Theme />
        <Footer />
      </main>
    </div>
  );
}
