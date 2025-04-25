//app\components\BlogCard.js
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTransition } from 'react';
import { deleteMovieAction } from "../serversActions/deleteMovieAction";
import { getLocalStorageLastConsultedMovieIdAction } from "../serversActions/getLocalStorageLastconsultedMovieIdAction";

export default function BlogCard({ titre, description, imageUrl, id, className, onDelete }) {
    const [isLastConsulted, setIsLastConsulted] = useState(false);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        const lastConsultedMovieId = getLocalStorageLastConsultedMovieIdAction();
        setIsLastConsulted(lastConsultedMovieId === id);
    }, [id]);

    const handleDelete = () => {
        startTransition(async () => {
            const result = await deleteMovieAction(id);
            if (result?.success && onDelete) {
                onDelete(result.id);
            } else if (result?.error) {
                console.error("Erreur de suppression:", result.error, result.details);
                // Gérez l'affichage de l'erreur à l'utilisateur si nécessaire
            }
        });
    };

    return (
        <>
            <div className={`blog-card ${className || ''}`}>
                <img src={imageUrl} alt={titre} className="card-img-top" />
                <div className="card-body">
                    <h5 className="card-title">{titre}</h5>
                    <p className="card-text">{description}</p>
                    <Link href={`/detail/${id}`} className="btn btn-primary me-2">📖 Détails</Link>
                    <button onClick={handleDelete} className="btn btn-dark me-2" disabled={isPending}>
                        🗑️ {isPending ? 'Suppression...' : 'Supprimer'}
                    </button>
                    {isLastConsulted && <span className="text-success">Consulté récemment</span>}
                </div>
            </div>
        </>
    );
}