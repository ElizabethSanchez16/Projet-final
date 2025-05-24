//app\api\AdminValidation\route.js
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    const filePath = path.join(process.cwd(), 'app', 'basededonnees', 'db.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const db = JSON.parse(jsonData);

    if (db.users) {
      const user = db.users.find((u) => u.username === username);
      if (user) {
        if (user.password === password) {
          if (user.admin === true) {
            return NextResponse.json({ isAdmin: true, message: 'Connexion réussie' }, { status: 200 });
          } else {
            return NextResponse.json({ message: "Vous n'êtes pas autorisé à accéder à cette page." }, { status: 403 });
          }
        } else {
          return NextResponse.json({ message: 'Identifiants invalides' }, { status: 401 });
        }
      } else {
        return NextResponse.json({ message: 'Utilisateur non trouvé' }, { status: 401 });
      }
    } else {
      return NextResponse.json({ message: 'Clé "users" non trouvée dans la base de données' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Erreur serveur lors de la vérification des identifiants' }, { status: 500 });
  }
}
