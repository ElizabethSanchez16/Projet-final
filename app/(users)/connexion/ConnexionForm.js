"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ConnexionForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const [forcePasswordReset, setForcePasswordReset] = useState(false);
    const [checkingResetStatus, setCheckingResetStatus] = useState(true); // Nouvelle état pour le chargement

useEffect(() => {
    const checkForceReset = async () => {
        const storedUsername = localStorage.getItem('username');
        console.log("Nom d'utilisateur stocké:", storedUsername); // Ajout
        if (storedUsername) {
            try {
                const response = await fetch(`/api/IsUserPasswordReset/${storedUsername}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log("Réponse de l'API de réinitialisation:", data); // Ajout
                    setForcePasswordReset(data.forcePasswordReset);
                    setCheckingResetStatus(false);
                    if (data.forcePasswordReset) {
                        console.log("Redirection vers /change-password depuis useEffect"); // Ajout
                        router.push('/change-password');
                    }
                } else {
                    console.error("Erreur lors de la vérification de la réinitialisation du mot de passe:", response.status);
                    setCheckingResetStatus(false);
                }
            } catch (error) {
                console.error("Erreur lors de la vérification de la réinitialisation du mot de passe:", error);
                setCheckingResetStatus(false);
            }
        } else {
            setCheckingResetStatus(false);
        }
    };

    checkForceReset();
}, [router]);

const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        try {
            const response = await fetch(`/api/IsUserPasswordReset/${storedUsername}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                if (data.forcePasswordReset) {
                    console.log("Redirection vers /changepassword depuis handleSubmit");
                    router.push('/changepassword');
                    return; // Empêcher la tentative de connexion
                }
            } else {
                console.error("Erreur lors de la vérification de la réinitialisation du mot de passe:", response.status);
            }
        } catch (error) {
            console.error("Erreur lors de la vérification de la réinitialisation du mot de passe:", error);
        }
    }

    try {
        const response = await fetch('/api/ConnexionValidation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('isUserLoggedIn', 'true');
            localStorage.setItem('username', username);

            if (data.forcePasswordReset) {
                router.push('/changepassword');
            } else {
                window.dispatchEvent(new Event('userLoggedIn'));
                router.push('/');
            }
        } else {
            setError(data.message || 'Identifiants invalides');
        }
    } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        setError('Mauvais identifiants et/ou mot de passe.');
    }
};

    if (checkingResetStatus) {
        return <div>Vérification de l'état du mot de passe...</div>; // Ou un autre indicateur de chargement
    }

    return (
        <div className="container mt-4">
            <h1>Connexion</h1>
            {forcePasswordReset ? (
                <p className="alert alert-warning">Votre mot de passe doit être réinitialisé. Veuillez aller sur la page de changement de mot de passe.</p>
            ) : (
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
                    <button type="submit" className="btn-primary">Se connecter</button>
                    {error && <p className="text-danger mt-2">{error}</p>}
                </form>
            )}

            <h1>Vous n'avez pas de compte ?</h1>
            <button type="submit" className="btn-primary" onClick={() => router.push('/inscription')}>Inscription</button>
        </div>
    );
}