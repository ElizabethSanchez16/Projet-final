// app\(users)\changepassword\ChangePasswordForm.js
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ChangePasswordForm() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (!storedUsername) {
            router.push('/connexion'); // Redirect to login if no username
        }
        setUsername(storedUsername);
    }, [router]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!newPassword) {
            setError('Le nouveau mot de passe est obligatoire.');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        try {
            const response = await fetch('/api/ChangePassword', { // Correction du chemin
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message || 'Mot de passe changé avec succès.');
                // Clear forcePasswordReset flag after successful change
                await fetch('/api/ChangePassword/ForcePasswordReset', { // Correction du chemin
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username }),
                });
                // Redirect to profile or home page after successful password change
                setTimeout(() => {
                    router.push('/');
                }, 1500);
            } else {
                setError(data.message || 'Erreur lors du changement de mot de passe.');
            }
        } catch (error) {
            console.error("Erreur lors du changement de mot de passe:", error);
            setError('Erreur serveur lors du changement de mot de passe.');
        }
    };

    return (
        <div className="container mt-4">
            <h1>Changer le mot de passe</h1>
            {username && <p>Connecté en tant que : <strong>{username}</strong></p>}
            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">Nouveau mot de passe</label>
                    <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmNewPassword" className="form-label">Confirmer le nouveau mot de passe</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmNewPassword"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Changer le mot de passe</button>
            </form>
        </div>
    );
}