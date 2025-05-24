//app\api\ChangePassword\route.js
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function POST(req) {
    try {
        const { username, newPassword } = await req.json();
        const filePath = path.join(process.cwd(), 'app', 'basededonnees', 'db.json');
        const jsonData = await fs.readFile(filePath, 'utf-8');
        const db = JSON.parse(jsonData);

        if (!db.users) {
            return NextResponse.json({ message: 'Aucun utilisateur trouvé' }, { status: 404 });
        }

        const userIndex = db.users.findIndex(user => user.username === username);

        if (userIndex === -1) {
            return NextResponse.json({ message: 'Utilisateur non trouvé' }, { status: 404 });
        }

        // Ici, en production, tu devrais HACHER le nouveau mot de passe avant de l'enregistrer.
        db.users[userIndex].password = newPassword;

        await fs.writeFile(filePath, JSON.stringify(db, null, 2), 'utf-8');
        return NextResponse.json({ message: 'Mot de passe changé avec succès' }, { status: 200 });

    } catch (error) {
        console.error("Erreur lors du changement de mot de passe:", error);
        return NextResponse.json({ message: 'Erreur serveur lors du changement de mot de passe' }, { status: 500 });
    }
}