// app/api/cv_skill/route.ts
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.resolve('app/data/cv_skill.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  return new Response(fileData, { status: 200 });
}
