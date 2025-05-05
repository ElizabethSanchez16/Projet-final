//app\components\BlogCard.js
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTransition } from 'react';

import { deleteMusiqueAction } from "../serversActions/deleteMusiqueAction";

import { getLocalStorageLastConsultedMusiqueIdAction } from "../serversActions/getLocalStorageLastconsultedMusiqueIdAction";

export default function BlogCard({ key, titre, album, artiste, genre, année, duration, imageUrl, extraitUrl, tours33, tours45, disponible, deleted, prix, id, className, onDelete }){
    const [isLastConsulted, setIsLastConsulted] = useState(false);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        const lastConsultedMusiqueId = getLocalStorageLastConsultedMusiqueIdAction();
        setIsLastConsulted(lastConsultedMusiqueId === id);
    }, [id]);

    const handleDelete = () => {
        startTransition(async () => {
            const result = await deleteMusiqueAction(id);
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
                    <p className="card-text">Artiste: {artiste}</p>
                    {album && <p className="card-text">Album: {album}</p>} {/* Afficher l'album s'il existe */}
                    {genre && <p className="card-text">Genre: {genre.join(', ')}</p>} {/* Afficher les genres */}
                    <p className="card-text">Année: {année}</p>
                    <p className="card-text">Durée: {duration}</p>
                    <p className="card-text">Prix: {prix} $</p>
                    <p className="card-text">Disponible: {disponible}</p>
                    <p className="card-text">Vitesse: {tours33 ? '33 tours' : ''} {tours45 ? (tours33 ? ' / 45 tours' : '45 tours') : ''}</p>
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