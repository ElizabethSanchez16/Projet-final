//app\api\Inscription\route.js
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    const filePath = path.join(process.cwd(), 'app', 'basededonnees', 'db.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const db = JSON.parse(jsonData);

    if (!db.users) {
      db.users = []; // Initialise le tableau 'users' s'il n'existe pas
    }

    // Vérifie si le nom d'utilisateur existe déjà
    const existingUser = db.users.find(u => u.username === username);
    if (existingUser) {
      return NextResponse.json({ message: 'Ce nom d\'utilisateur est déjà pris' }, { status: 409 }); // Code 409 pour conflit
    }

    // Crée un nouvel utilisateur
    const newUser = {
      id: db.users.length + 1, // Simple auto-incrémentation de l'ID (à améliorer en production)
      username: username,
      password: password, // À REMPLACER PAR UN HACHAGE DE MOT DE PASSE EN PRODUCTION !
      admin: false,       // Valeur par défaut
      forcePasswordReset: false, // Valeur par défaut
    };

    // Ajoute le nouvel utilisateur à la base de données
    db.users.push(newUser);

    // Réécrit le fichier db.json avec les nouvelles données
    await fs.writeFile(filePath, JSON.stringify(db, null, 2), 'utf-8');

    return NextResponse.json({ message: 'Inscription réussie' }, { status: 201 }); // Code 201 pour "Created"
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return NextResponse.json({ message: 'Erreur serveur lors de l\'inscription' }, { status: 500 });
  }
}