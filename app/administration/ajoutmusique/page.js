// app/administration/ajoutmusique/page.js
"use client";

import Header from "../../components/Header";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AjoutMusiqueForm from "../../components/AjoutMusiqueForm";
import { ajoutMusiqueAction } from "../../serversActions/ajoutMusiqueAction";

export default function PageAjoutMusique() { // Suppression de 'async' ici
  const router = useRouter();

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');

    if (!isAdminLoggedIn) {
      router.push('/administration/connexion');
    }
  }, [router]);

  return (
    <>
      <Header />
      <AjoutMusiqueForm ajoutMusiqueAction={ajoutMusiqueAction} />
    </>
  );
}