"use client"; 

import { useState } from "react";
import Nav from "@/components/Navbar";
import Theme from "@/components/projet/theme";
import Footer from "@/components/Footer";

export default function Projet() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white">
      <div className="w-1/4 fixed z-50 h-full">
        <Nav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>
      <div className="flex-1 flex flex-col items-center mt-5 mx-auto px-5 lg:pl-56 w-full lg:w-3/4 lg:max-w-9xl">
        <h1 className="text-3xl mb-10">Liste de projets</h1>
        <Theme /> 
        <Footer />
      </div>
    </div>
  );
}