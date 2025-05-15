//app/components/BlogCard.js
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTransition } from 'react';
import { getLocalStorageLastConsultedMusiqueIdAction } from "../serversActions/getLocalStorageLastconsultedMusiqueIdAction";

export default function BlogCard({ key, titre, album, artiste, genre, annee, duration, imageUrl, extraitUrl, tours33, tours45, disponible, prix, id, className, stripeURL }) {
    const [isLastConsulted, setIsLastConsulted] = useState(false);

    useEffect(() => {
        const lastConsultedMusiqueId = getLocalStorageLastConsultedMusiqueIdAction();
        setIsLastConsulted(lastConsultedMusiqueId === id);
    }, [id]);

    const handleAddToCart = () => {
        let cart = sessionStorage.getItem('cart');
        let cartArray = cart ? JSON.parse(cart) : [];

        if (!cartArray.includes(id)) {
            cartArray.push(id);
            sessionStorage.setItem('cart', JSON.stringify(cartArray));
            alert(`L'article "${titre}" a été ajouté au panier.`);
            console.log("Panier dans sessionStorage mis à jour:", cartArray);
            window.dispatchEvent(new Event('cartUpdated'));
        } else {
            alert(`L'article "${titre}" est déjà dans le panier.`);
        }
    };

    return (
        <>
            <div className={`blog-card ${className || ''}`}>
                <div className="image-container">
                    <img src={imageUrl} alt={titre} className="card-img" />
                </div>
                <div className="card-body">
                    <h5 className="card-title">{titre}</h5>
                    <p className="card-text">Artiste: {artiste}</p>
                    {album && <p className="card-text">Album: {album}</p>}
                    {genre && <p className="card-text">Genre: {genre.join(', ')}</p>}
                    <p className="card-text">Année: {annee}</p>
                    <p className="card-text">Durée: {duration}</p>
                    <p className="card-text">Prix: {prix} $</p>
                    <p className="card-text">Disponible: {disponible}</p>
                    <p className="card-text">Vitesse: {tours33 ? '33 tours' : ''} {tours45 ? (tours33 ? ' / 45 tours' : '45 tours') : ''}</p>
                    <Link href={`/detail/${id}`} className="btn btn-primary me-2">📖 Détails</Link>
                    <button onClick={handleAddToCart} className="btn btn-success me-2">
                        🛒 Mettre de coté pour plus tard
                    </button>
                    <a href={stripeURL} className="btn btn-success me-2">
                        🛒 Payer cet article avec Stripe
                    </a>
                    {isLastConsulted && <span className="text-success">Consulté récemment</span>}
                </div>
            </div>
        </>
    );
}