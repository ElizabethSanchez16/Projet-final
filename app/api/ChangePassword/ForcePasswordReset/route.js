//app\api\ChangePassword\ForcePasswordReset\route.js
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function POST(req) {
    try {
        const { username } = await req.json();
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

        db.users[userIndex].forcePasswordReset = false;

        await fs.writeFile(filePath, JSON.stringify(db, null, 2), 'utf-8');
        return NextResponse.json({ message: 'Flag de réinitialisation effacé' }, { status: 200 });

    } catch (error) {
        console.error("Erreur lors de l'effacement du flag de réinitialisation:", error);
        return NextResponse.json({ message: 'Erreur serveur lors de l\'effacement du flag' }, { status: 500 });
    }
}