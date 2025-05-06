//administration\modificationmusique\page.js
"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ModificationMusiqueForm from "../../components/ModificationMusiqueForm";

import { modificationMusiqueAction } from "../../serversActions/modificationMusiqueAction";



export default async function PageModificationMusique() {
    const router = useRouter();

    useEffect(() => {
      const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
  
      if (!isAdminLoggedIn) {
        router.push('/administration/connexion');
      }
    }, [router]);
    
    return (
        <>
            <ModificationMusiqueForm modificationMusiqueAction={modificationMusiqueAction} />
        </>
    );
}