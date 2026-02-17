"use client"; // Indispensable pour utiliser onClick

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi } from "@fortawesome/free-solid-svg-icons";

export default function OfflineContent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center text-gray-800">
      <div className="bg-gray-200 p-6 rounded-full mb-6">
        <FontAwesomeIcon icon={faWifi} className="text-4xl text-gray-500" />
      </div>
      
      <h1 className="text-3xl font-bold mb-4">Oups, vous êtes hors ligne</h1>
      
      <p className="text-lg mb-2 max-w-md">
        Cette page n&apos;a pas encore été sauvegardée sur votre appareil.
      </p>
      
      <p className="text-sm text-gray-500 mb-8 max-w-md">
        Pour y accéder sans internet, vous devez la visiter au moins une fois en étant connecté.
      </p>

      <div className="flex gap-4 flex-col sm:flex-row">
        <button 
          onClick={() => window.location.reload()} 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          Réessayer
        </button>
        
        <Link 
          href="/" 
          className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-900 transition-colors"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}