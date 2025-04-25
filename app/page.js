"use client";
import Header from "./components/Header";
import BlogList from "./components/BlogList";
import { useState, useEffect } from "react";
import { useFormState } from 'react-dom';

export default function PagePrincipale() {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const response = await fetch("http://localhost:3001/films");
                if (!response.ok) {
                    throw new Error(`Erreur HTTP! statut: ${response.status}`);
                }
                const data = await response.json();
                setFilms(data);
                setLoading(false);
            } catch (e) {
                setError("Impossible de charger la liste des films.");
                setLoading(false);
            }
        };

        fetchFilms();
    }, []);

    if (loading) {
        return (
            <>
                <Header />
                <div>Chargement de la liste des films...</div>
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
                <BlogList films={films} />
        </>
    );
}