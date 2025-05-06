//app\page.js
"use client";
import BlogList from "./components/BlogList";
import { useState, useEffect } from "react";

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
                <div>Chargement de la liste des musiques...</div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <div>Erreur: {error}</div>
            </>
        );
    }

    return (
        <>
                <BlogList musiques={musiques} />
        </>
    );
}