'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LinksForm from './LinksForm';
import GestionForm from './GestionForm';
import AdminValidationForm from '../adminvalidation/AdminValidationForm';

export default function PageDeGestion() {
  const router = useRouter();
  const [adminChecked, setAdminChecked] = useState(false); // Nouveau state pour suivre la vérification du mot de passe

  // Affiche AdminValidationForm si le mot de passe n'a pas encore été vérifié
  if (!adminChecked) {
    return (
      <>
        <AdminValidationForm onAdminVerified={() => setAdminChecked(true)} />
      </>
    );
  }

  // Affiche GestionForm seulement après que le mot de passe a été vérifié et que l'utilisateur est un admin
  if (adminChecked) {
    return (
      <>
        <LinksForm />
        <GestionForm />
      </>
    );
  }

  // Message par défaut si l'utilisateur n'est pas autorisé
  return (
    <div>
      <p>Vous n'avez pas la permission d'accéder à cette page.</p>
    </div>
  );
}
