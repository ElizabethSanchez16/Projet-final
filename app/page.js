//app\page.js
"use client";
import Header from "./components/Header";
import BlogList from "./components/BlogList";
import { useState, useEffect } from "react";
import { useFormState } from 'react-dom';

export default function PagePrincipale() {
    const [musiques, setMusiques] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMusiques = async () => {
            try {
                const response = await fetch("http://localhost:3001/musiques");
                if (!response.ok) {
                    throw new Error(`Erreur HTTP! statut: ${response.status}`);
                }
                const data = await response.json();
                setMusiques(data);
                setLoading(false);
            } catch (e) {
                setError("Impossible de charger la liste des musiques.");
                setLoading(false);
            }
        };

        fetchMusiques();
    }, []);

    if (loading) {
        return (
            <>
                <Header />
                <div>Chargement de la liste des musiques...</div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <div>Erreur: {error}</div>
            </>
        );
    }

    return (
        <>
                <Header />
                <BlogList musiques={musiques} />
        </>
    );
}