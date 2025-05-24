//app\(admin)\adminvalidation\AdminValidation.js
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminValidationForm({ onAdminVerified }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const username = localStorage.getItem('username');
      
      const response = await fetch('/api/AdminValidation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onAdminVerified();
      } else {
        setError(data.message || 'Mot de passe incorrect');
      }
    } catch (error) {
      console.error("Erreur lors de la validation du mot de passe:", error);
      setError('Erreur lors de la vérification du mot de passe.');
    }
  };

  return (
    <div className="container mt-4">
      <h1>Validation du status Admin pour accéder à la page de gestion</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary">Valider</button>
        {error && <p className="text-danger mt-2">{error}</p>}
      </form>
    </div>
  );
}
