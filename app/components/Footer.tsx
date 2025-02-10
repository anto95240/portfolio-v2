"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faFileCircleCheck, faFile, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";

const FooterLink = ({ icon, label, children, onClick }: { icon: IconDefinition; label: string; children: React.ReactNode, onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="bg-blue-footer flex flex-col items-center h-28 p-2 mx-auto justify-center gap-2 rounded-md shadow-[4px_4px_10px_0_rgba(0,0,0,0.5)] aspect-square transition-transform transform active:scale-90"
    aria-label={label}
  >
    <FontAwesomeIcon icon={icon} className="text-xl" />
    {children}
  </button>
);

export default function Footer() {
  const pathname = usePathname();
  const [showPopup, setShowPopup] = useState(false);

  const footerText = "© 2024 créé par Antoine Richard tous droits réservés.";
  const footerStyle = pathname.startsWith("/projet/jeux") ? "text-center pt-10 pb-10 text-white" : "text-center pt-10 pb-10";

  return (
    <div className="flex flex-col">
      <hr className="bg-black w-full my-10 h-[2px] border-none rounded" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-16 w-11/12 max-w-l text-center mx-auto text-white justify-center">
        <FooterLink icon={faFileCircleCheck} label="Mes projets">
          <Link href="/projet">Mes projets</Link>
        </FooterLink>

        {/* Bouton Mon CV avec Popup */}
        <FooterLink icon={faFile} label="Mon CV" onClick={() => setShowPopup(true)}>
          Mon CV
        </FooterLink>

        <FooterLink icon={faEnvelope} label="Mon Email">
          <Link href="mailto:antoine.richard@ynov.com">Mon Email</Link>
        </FooterLink>

        <FooterLink icon={faLinkedin} label="Mon Linkedin">
          <Link href="https://www.linkedin.com/in/ton-profile/" target="_blank">Mon Linkedin</Link>
        </FooterLink>

        <FooterLink icon={faGithub} label="Mon Github">
          <Link href="https://github.com/anto95240" target="_blank">Mon Github</Link>
        </FooterLink>
      </div>

      <p className={footerStyle}>{footerText}</p>

      {/* Popup de sélection du CV */}
      {showPopup && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <p className="mb-4 text-lg">Choisissez une version du CV :</p>
            <div className="flex gap-4">
              <Link href="/doc/Antoine RICHARD CV-s.pdf" target="_blank" className="bg-blue-500 text-white px-4 py-2 rounded">CV Stage</Link>
              <Link href="/doc/Antoine RICHARD CV.pdf" target="_blank" className="bg-green-500 text-white px-4 py-2 rounded">CV Alternance</Link>
            </div>
            <button onClick={() => setShowPopup(false)} className="mt-8">Annuler</button>
          </div>
        </div>
      )}
    </div>
  );
}