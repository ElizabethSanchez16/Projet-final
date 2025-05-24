//app\(users)\inscription\InscriptionForm.js
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function InscriptionForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/NouvelleInscription', { // MODIFICATION DE L'API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // INSCRIPTION RÉUSSIE
        console.log('Inscription réussie !');
        router.push('/connexion?message=inscription_reussie'); // Rediriger vers la connexion avec un message
      } else {
        // ERREUR D'INSCRIPTION
        setError(data.message || 'Erreur lors de l\'inscription. Veuillez réessayer.'); // MESSAGE D'ERREUR ADAPTÉ
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      setError('Une erreur inattendue s\'est produite. Veuillez réessayer plus tard.'); // MESSAGE D'ERREUR GÉNÉRAL
    }
  };

  return (
    <div className="container mt-4">
      <h1>Inscription</h1> {/* MODIFICATION DU TITRE */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Mot de passe</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">S'inscrire</button> {/* MODIFICATION DU TEXTE DU BOUTON */}
        {error && <p className="text-danger mt-2">{error}</p>}
      </form>
    </div>
  );
}