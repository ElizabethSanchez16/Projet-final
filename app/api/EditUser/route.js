//app\api\EditUser\route.js
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(req) {
  try {
    const filePath = path.join(process.cwd(), 'app', 'basededonnees', 'db.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const db = JSON.parse(jsonData);

    if (!db.users) {
      return NextResponse.json({ message: 'Aucun utilisateur trouvé' }, { status: 200 });
    }

    // Retourne uniquement les informations nécessaires (id, username, admin)
    const users = db.users.map(user => ({
      id: user.id,
      username: user.username,
      admin: user.admin
    }));
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return NextResponse.json({ message: 'Erreur serveur lors de la récupération des utilisateurs' }, { status: 500 });
  }
}