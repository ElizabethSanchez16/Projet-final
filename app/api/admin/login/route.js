// app/api/admin/login/route.js
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    const filePath = path.join(process.cwd(), 'app', 'basededonnees', 'users.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const profiles = JSON.parse(jsonData);

    if (profiles.users && profiles.users.username === username && profiles.users.password === password) {
      return NextResponse.json({ message: 'Connexion réussie' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Identifiants invalides' }, { status: 401 });
    }
  } catch (error) {
    console.error("Erreur lors de la lecture du fichier de profils:", error);
    return NextResponse.json({ message: 'Erreur serveur lors de la vérification des identifiants' }, { status: 500 });
  }
}