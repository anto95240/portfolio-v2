// app/api/projet/route.ts
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.resolve('app/data/projet.json');
    const fileData = await fs.readFile(filePath, 'utf-8'); // Utilisation de fs.promises pour les opérations asynchrones
    const jsonData = JSON.parse(fileData); // Vérification des données JSON

    // Vérification des données
    if (!jsonData || typeof jsonData !== 'object') {
      return new Response('Données invalides', { status: 500 });
    }

    return new Response(JSON.stringify(jsonData), { status: 200 });
  } catch {
    return new Response('Erreur du serveur', { status: 500 });
  }
}
