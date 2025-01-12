'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCircleCheck, faFile, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const FooterLink = ({ href, icon, label, children, target }: { href: string; icon: any; label: string; children: React.ReactNode, target?: string }) => (
  <Link
    href={href}
    className="bg-blue-footer flex flex-col items-center h-28 p-2 mx-auto justify-center gap-2 rounded-md shadow-[4px_4px_10px_0_rgba(0,0,0,0.5)] aspect-square transition-transform transform active:scale-90"
    target={target}
    rel={target === '_blank' ? 'noopener noreferrer' : undefined}
    aria-label={label}
  >
    <FontAwesomeIcon icon={icon} className="text-xl" />
    {children}
  </Link>
);

export default function Footer() {
  const pathname = usePathname();

  const footerText = '© 2024 créé par Antoine Richard tous droits réservés.';
  const footerStyle = pathname.startsWith('/projet/jeux') ? 'text-center pt-10 pb-10 text-white' : 'text-center pt-10 pb-10';

  return (
    <div className="flex flex-col">
      <hr className="bg-black w-full my-10 h-[2px] border-none rounded" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-16 w-11/12 max-w-l text-center mx-auto text-white justify-center">
        <FooterLink href="/projet" icon={faFileCircleCheck} label="Mes projets">
          Mes projets
        </FooterLink>

        {/* Lien spécifique avec target="_blank" */}
        <FooterLink href="/doc/CV.pdf" icon={faFile} label="Mon CV" target="_blank">
          Mon CV
        </FooterLink>

        <FooterLink href="mailto:antoine.richard@ynov.com" icon={faEnvelope} label="Mon Email">
          Mon Email
        </FooterLink>

        <FooterLink href="https://www.linkedin.com/in/ton-profile/" icon={faLinkedin} label="Mon Linkedin">
          Mon Linkedin
        </FooterLink>

        <FooterLink href="https://github.com/anto95240" icon={faGithub} label="Mon Github">
          Mon Github
        </FooterLink>
      </div>

      <p className={footerStyle}>{footerText}</p>
    </div>
  );
}
