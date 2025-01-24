// app/api/experience/route.ts
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.resolve('app/data/cv_experience.json');
  try {
    // Vérifie si le fichier existe avant de le lire
    await fs.access(filePath);

    const fileData = await fs.readFile(filePath, 'utf-8');

    return new Response(fileData, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=3600', // Cache pendant 1 heure
      },
    });
  } catch {
    return new Response('Fichier introuvable ou erreur lors de la lecture.', { status: 404 });
  }
}
