"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faFileCircleCheck,
  faFile,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import CvModal from "@/components/ui/CvModal";

const FooterLink = ({
  icon,
  label,
  children,
  onClick,
}: {
  icon: IconDefinition;
  label: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    type="button"
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

  const footerText = `© 2024 créé par Antoine Richard tous droits réservés.`;

  const isJeux = pathname.startsWith("/projet/jeux");
  const footerStyle = isJeux
    ? "text-center pt-10 pb-2 text-white"
    : "text-center pt-10 pb-2";
  const versionStyle = isJeux
    ? "text-center pb-10 text-xs text-white"
    : "text-center pb-10 text-xs";

  return (
    <div className="flex flex-col">
      <hr className="bg-black w-full my-10 h-[2px] border-none rounded" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-16 w-11/12 max-w-l text-center mx-auto text-white justify-center">
        <FooterLink icon={faFileCircleCheck} label="Mes projets">
          <Link href="/projet">Mes projets</Link>
        </FooterLink>

        <FooterLink
          icon={faFile}
          label="Mon CV"
          onClick={() => setShowPopup(true)}
        >
          Mon CV
        </FooterLink>

        <FooterLink icon={faEnvelope} label="Mon Email">
          <Link href="mailto:antoine.richard@ynov.com">Mon Email</Link>
        </FooterLink>

        <FooterLink icon={faLinkedin} label="Mon Linkedin">
          <Link href="https://www.linkedin.com/in/ton-profile/" target="_blank">
            Mon Linkedin
          </Link>
        </FooterLink>

        <FooterLink icon={faGithub} label="Mon Github">
          <Link href="https://github.com/anto95240" target="_blank">
            Mon Github
          </Link>
        </FooterLink>
      </div>

      <p className={footerStyle}>{footerText}</p>

      <p className={versionStyle}>v{process.env.NEXT_PUBLIC_APP_VERSION}</p>

      {showPopup && <CvModal onClose={() => setShowPopup(false)} />}
    </div>
  );
}
