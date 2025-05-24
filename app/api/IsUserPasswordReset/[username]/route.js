// app/api/IsUserPasswordReset/[username]/route.js
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(req, { params }) {
    try {
        const { username } = await params; // Utilise await ici
        const filePath = path.join(process.cwd(), 'app', 'basededonnees', 'db.json');
        const jsonData = await fs.readFile(filePath, 'utf-8');
        const db = JSON.parse(jsonData);

        if (!db.users) {
            return NextResponse.json({ message: 'Aucun utilisateur trouvé' }, { status: 404 });
        }

        const user = db.users.find(user => user.username === username);

        if (!user) {
            return NextResponse.json({ message: 'Utilisateur non trouvé' }, { status: 404 });
        }

        return NextResponse.json({ forcePasswordReset: user.forcePasswordReset }, { status: 200 });

    } catch (error) {
        console.error("Erreur lors de la vérification de la réinitialisation du mot de passe:", error);
        return NextResponse.json({ message: 'Erreur serveur lors de la vérification' }, { status: 500 });
    }
}