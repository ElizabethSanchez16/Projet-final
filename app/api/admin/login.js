// pages/api/admin/login.js
import path from 'path';
import fs from 'fs/promises';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    const filePath = path.join(process.cwd(), 'app', 'basededonnees', 'users.json');

    try {
      const jsonData = await fs.readFile(filePath, 'utf-8');
      const profiles = JSON.parse(jsonData);

      if (profiles.users && profiles.users.username === username && profiles.users.password === password) {
        res.status(200).json({ message: 'Connexion réussie' });
      } else {
        res.status(401).json({ message: 'Identifiants invalides' });
      }
    } catch (error) {
      console.error("Erreur lors de la lecture du fichier de profils:", error);
      res.status(500).json({ message: 'Erreur serveur lors de la vérification des identifiants' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}