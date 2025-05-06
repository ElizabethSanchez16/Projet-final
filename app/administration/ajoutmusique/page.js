// app/administration/ajoutmusique/page.js
"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AjoutMusiqueForm from "../../components/AjoutMusiqueForm";
import { ajoutMusiqueAction } from "../../serversActions/ajoutMusiqueAction";

export default function PageAjoutMusique() {
  const router = useRouter();

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');

    if (!isAdminLoggedIn) {
      router.push('/administration/connexion');
    }
  }, [router]);

  return (
    <>
      <AjoutMusiqueForm ajoutMusiqueAction={ajoutMusiqueAction} />
    </>
  );
}