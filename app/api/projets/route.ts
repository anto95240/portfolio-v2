// app/api/projet/route.ts
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'app/data/projet.json'); // Utilisation de process.cwd()
    const fileData = await fs.readFile(filePath, 'utf-8'); // Lecture asynchrone du fichier
    const jsonData = JSON.parse(fileData); // Parse JSON

    // Vérification des données
    if (!jsonData || typeof jsonData !== 'object' || !jsonData.homePage) {
      console.error('Données invalides ou structure manquante', jsonData); // Log des erreurs spécifiques
      return new Response('Données invalides', { status: 400 }); // Erreur avec un status plus spécifique
    }

    return new Response(JSON.stringify(jsonData), { status: 200 });
  } catch (error) {
    console.error('Erreur de lecture du fichier', error); // Log des erreurs spécifiques
    return new Response('Erreur du serveur', { status: 500 });
  }
}
