import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.resolve('app/data/projet.json'); // Chemin vers votre fichier JSON
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(fileData); // Parse les données JSON pour vérifier leur validité

    // Vérification des données
    if (!jsonData || typeof jsonData !== 'object') {
      return new Response('Données invalides', { status: 500 });
    }

    return new Response(JSON.stringify(jsonData), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la lecture du fichier JSON :", error);
    return new Response('Erreur du serveur', { status: 500 });
  }
}
