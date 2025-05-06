//app\components\ConnexionForm.js
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ConnexionForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/admin/login', { // Créez cette route API dans Next.js
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Connexion réussie, stockez un token ou un indicateur de connexion
                localStorage.setItem('isAdminLoggedIn', 'true'); // Exemple
                router.push('/administration/ajoutmusique');
            } else {
                setError(data.message || 'Identifiants invalides');
            }
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
            setError('Mauvais identifiants et/ou mot de passe.');
        }
    };

    return (
        <div className="container mt-4">
            <h1>Connexion Administration</h1>
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
                <button type="submit" className="btn btn-primary">Se connecter</button>
                {error && <p className="text-danger mt-2">{error}</p>}
            </form>
        </div>
    );
}