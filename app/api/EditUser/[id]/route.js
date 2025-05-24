import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function PATCH(req, { params }) {
  try {
    const { id } = params; // L'id de l'utilisateur à modifier
    const { isAdmin } = await req.json(); // Le nouveau statut admin
    const filePath = path.join(process.cwd(), 'app', 'basededonnees', 'db.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const db = JSON.parse(jsonData);

    if (!db.users) {
      return NextResponse.json({ message: 'Aucun utilisateur trouvé' }, { status: 404 });
    }

    const userIndex = db.users.findIndex(user => user.id === parseInt(id)); // Comparaison avec des entiers

    if (userIndex === -1) {
      return NextResponse.json({ message: 'Utilisateur non trouvé' }, { status: 404 });
    }

    // Mise à jour du statut admin
    db.users[userIndex].admin = isAdmin;

    // Réécrit le fichier db.json avec les nouvelles données
    await fs.writeFile(filePath, JSON.stringify(db, null, 2), 'utf-8');

    return NextResponse.json({ message: 'Statut admin mis à jour' }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut admin:", error);
    return NextResponse.json({ message: 'Erreur serveur lors de la mise à jour du statut admin' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;   // L'id de l'utilisateur à supprimer.
    const filePath = path.join(process.cwd(), 'app', 'db', 'db.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const db = JSON.parse(jsonData);

    if (!db.users) {
      return NextResponse.json({ message: 'Aucun utilisateur trouvé' }, { status: 404 });
    }

    const userIndex = db.users.findIndex(user => user.id === parseInt(id)); // Comparaison avec des entiers

    if (userIndex === -1) {
      return NextResponse.json({ message: 'Utilisateur non trouvé' }, { status: 404 });
    }

    // Suppression de l'utilisateur
    db.users.splice(userIndex, 1);

    // Réécrit le fichier db.json sans l'utilisateur supprimé
    await fs.writeFile(filePath, JSON.stringify(db, null, 2), 'utf-8');

    return NextResponse.json({ message: 'Utilisateur supprimé' }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    return NextResponse.json({ message: 'Erreur serveur lors de la suppression de l\'utilisateur' }, { status: 500 });
  }
}