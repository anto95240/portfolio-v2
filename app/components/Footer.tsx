'use client';

import Link from 'next/link';

import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCircleCheck, faFile, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {  
  const pathname = usePathname()

  const footerText = '© 2024 créé par Antoine Richard tous droits réservés.';
  const footerStyle =
      pathname.startsWith('/projet/jeux')
      ? 'text-center pt-10 pb-10 text-white'
      : 'text-center pt-10 pb-10';

  return (
    <div className="flex flex-col">
      <hr className="bg-black w-full my-10 h-[2px] border-none rounded" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-16 w-10/12 max-w-l text-center mx-auto text-white justify-center">
        
        <Link
          href="/projet"
          className="bg-blue-footer flex flex-col items-center h-24 mx-auto justify-center gap-2 rounded-md shadow-[4px_4px_10px_0_rgba(0,0,0,0.5)] aspect-square"
        >
          <FontAwesomeIcon icon={faFileCircleCheck} className="text-xl" />
          Mes projets
        </Link>

        <a
          href="/doc/CV.pdf"
          className="bg-blue-footer flex flex-col items-center h-24 mx-auto justify-center gap-2 rounded-md shadow-[4px_4px_10px_0_rgba(0,0,0,0.5)] aspect-square"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faFile} className="text-xl" />
          Mon CV
        </a>

        <a
          href="mailto:antoine.richard@ynov.com"
          className="bg-blue-footer flex flex-col items-center h-24 mx-auto justify-center gap-2 rounded-md shadow-[4px_4px_10px_0_rgba(0,0,0,0.5)] aspect-square"
        >
          <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
          Mon Email
        </a>

        <a
          href="https://www.linkedin.com/in/ton-profile/"
          className="bg-blue-footer flex flex-col items-center h-24 mx-auto justify-center gap-2 rounded-md shadow-[4px_4px_10px_0_rgba(0,0,0,0.5)] aspect-square"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
          Mon Linkedin
        </a>

        <a
          href="https://github.com/anto95240"
          className="bg-blue-footer flex flex-col items-center h-24 mx-auto justify-center gap-2 rounded-md shadow-[4px_4px_10px_0_rgba(0,0,0,0.5)] aspect-square"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} className="text-xl" />
          Mon Github
        </a>
      </div>
      <p className={`${footerStyle}`}>{footerText}</p>
    </div>
  );
}
