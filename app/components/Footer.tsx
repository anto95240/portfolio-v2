import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCircleCheck, faFile, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 w-8/12 max-w-l text-center mx-auto text-white justify-center">
        <a
          href="#"
          className="bg-blue-footer flex flex-col items-center h-24 mx-auto justify-center gap-2 rounded-md shadow-[4px_4px_10px_0_rgba(0,0,0,0.5)] aspect-square"
        >
          <FontAwesomeIcon icon={faFileCircleCheck} className="text-l" />
          Mes projets
        </a>

        <a
          href="/doc/CV.pdf"
          className="bg-blue-footer flex flex-col items-center h-24 mx-auto justify-center gap-2 rounded-md shadow-[4px_4px_10px_0_rgba(0,0,0,0.5)] aspect-square"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faFile} className="text-l" />
          Mon CV
        </a>

        <a
          href="mailto:antoine.richard@ynov.com"
          className="bg-blue-footer flex flex-col items-center h-24 mx-auto justify-center gap-2 rounded-md shadow-[4px_4px_10px_0_rgba(0,0,0,0.5)] aspect-square"
        >
          <FontAwesomeIcon icon={faEnvelope} className="text-l" />
          Mon Email
        </a>

        <a
          href="https://www.linkedin.com/in/ton-profile/"
          className="bg-blue-footer flex flex-col items-center h-24 mx-auto justify-center gap-2 rounded-md shadow-[4px_4px_10px_0_rgba(0,0,0,0.5)] aspect-square"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedin} className="text-l" />
          Mon Linkedin
        </a>

        <a
          href="https://github.com/anto95240"
          className="bg-blue-footer flex flex-col items-center h-24 mx-auto justify-center gap-2 rounded-md shadow-[4px_4px_10px_0_rgba(0,0,0,0.5)] aspect-square"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} className="text-l" />
          Mon Github
        </a>
      </div>
      <p className='text-center pt-10'>© 2024 créé par Antoine Richard tous droits réservés.</p>
    </div>
  );
}
