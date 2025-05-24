// app/api/ConnexionValidation/route.js
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function POST(req) {
    try {
        const { username, password } = await req.json();
        const filePath = path.join(process.cwd(), 'app', 'basededonnees', 'db.json');
        const jsonData = await fs.readFile(filePath, 'utf-8');
        const db = JSON.parse(jsonData);

        const user = db.users.find(u => u.username === username);

        if (!user) {
            return NextResponse.json({ message: 'Identifiants invalides' }, { status: 401 });
        }

        if (user.forcePasswordReset) {
            return NextResponse.json({ message: 'Réinitialisation du mot de passe requise', forcePasswordReset: true }, { status: 200 });
        }

        // Vérifier le mot de passe seulement si la réinitialisation n'est pas forcée
        if (user.password === password) { // NE PAS faire en production
            return NextResponse.json({ message: 'Connexion réussie', forcePasswordReset: false }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Identifiants invalides' }, { status: 401 });
        }
    } catch (error) {
        console.error("Erreur lors de la validation de la connexion:", error);
        return NextResponse.json({ message: 'Erreur serveur lors de la connexion' }, { status: 500 });
    }
}