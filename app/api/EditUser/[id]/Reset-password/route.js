//app\api\EditUser\[id]\Reset-password\route.js
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function POST(req, { params }) {
  try {
    const { id } = params;
    const filePath = path.join(process.cwd(), 'app', 'basededonnees', 'db.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const db = JSON.parse(jsonData);

    if (!db.users) {
      return NextResponse.json({ message: 'Aucun utilisateur trouvé' }, { status: 404 });
    }

    const userIndex = db.users.findIndex(user => user.id === parseInt(id));

    if (userIndex === -1) {
      return NextResponse.json({ message: 'Utilisateur non trouvé' }, { status: 404 });
    }

    const newPassword = ''; 
    db.users[userIndex].password = newPassword;
    db.users[userIndex].forcePasswordReset = true;

    await fs.writeFile(filePath, JSON.stringify(db, null, 2), 'utf-8');
    return NextResponse.json({ message: `Mot de passe réinitialisé pour l'utilisateur ${db.users[userIndex].username}. Il devra choisir un nouveau mot de passe lors de sa prochaine connexion.` }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la réinitialisation du mot de passe:", error);
    return NextResponse.json({ message: 'Erreur serveur lors de la réinitialisation du mot de passe' }, { status: 500 });
  }
}