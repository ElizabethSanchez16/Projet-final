//app\components\PanierForm.js
"use client";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false;

async function getProduitsParIds(ids) {
    try {
        const res = await fetch('http://localhost:3001/musiques');
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data.filter(produit => ids.includes(produit.id.toString()));
    } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
        return [];
    }
}

export default function PanierForm() {
    const [panierProduits, setPanierProduits] = useState([]);
    const [quantites, setQuantites] = useState({});
    const [inventaires, setInventaires] = useState({});
    const [sousTotal, setSousTotal] = useState(0);
    const tpsRate = 0.05; // 5%
    const tvqRate = 0.09975; // 9.975%
    const fraisLivraison = 5.00; // Exemple de frais de livraison

    useEffect(() => {
        const panierIdsStr = sessionStorage.getItem('cart');
        const panierIds = panierIdsStr ? JSON.parse(panierIdsStr) : [];

        if (panierIds && panierIds.length > 0) {
            getProduitsParIds(panierIds)
                .then(produits => {
                    setPanierProduits(produits);
                    const initialQuantites = {};
                    const initialInventaires = {};
                    produits.forEach(p => {
                        initialQuantites[p.id] = 1;
                        initialInventaires[p.id] = p.disponible;
                    });
                    setQuantites(initialQuantites);
                    setInventaires(initialInventaires);
                })
                .catch(error => console.error("Erreur lors du chargement du panier:", error));
        } else {
            setPanierProduits([]);
            setQuantites({});
            setInventaires({});
        }
    }, []);

    useEffect(() => {
        let nouveauSousTotal = 0;
        panierProduits.forEach(produit => {
            const quantite = quantites[produit.id] || 0;
            const inventaire = inventaires[produit.id] || 0;
            if (inventaire > 0 && quantite > 0) {
                nouveauSousTotal += produit.prix * quantite;
            }
        });
        setSousTotal(nouveauSousTotal);
    }, [panierProduits, quantites, inventaires]);

    const handleIncrement = (produitId) => {
        const inventaireDisponible = inventaires[produitId];
        const quantiteActuelle = quantites[produitId] || 0;

        if (quantiteActuelle < inventaireDisponible) {
            setQuantites(prevQuantites => ({
                ...prevQuantites,
                [produitId]: quantiteActuelle + 1,
            }));
        } else {
            alert(`La quantité maximale disponible pour ce produit est de ${inventaireDisponible}.`);
        }
    };

    const handleDecrement = (produitId) => {
        setQuantites(prevQuantites => {
            const newQuantity = (prevQuantites[produitId] || 1) - 1;
            if (newQuantity <= 0) {
                handleRemoveFromCart(produitId);
                return { ...prevQuantites, [produitId]: 0 };
            } else {
                return { ...prevQuantites, [produitId]: newQuantity };
            }
        });
    };

    const handleRemoveFromCart = (produitId) => {
        let cart = sessionStorage.getItem('cart');
        let cartArray = cart ? JSON.parse(cart) : [];
        const updatedCart = cartArray.filter(id => id !== produitId.toString());
        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
        setPanierProduits(panierProduits.filter(p => p.id !== produitId));
        const newQuantites = { ...quantites };
        delete newQuantites[produitId];
        setQuantites(newQuantites);
        const newInventaires = { ...inventaires };
        delete newInventaires[produitId];
        setInventaires(newInventaires);
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const calculerTotalArticle = (produit) => {
        return (produit.prix * (quantites[produit.id] || 0)).toFixed(2);
    };

    const calculerTPS = () => {
        return ((sousTotal + fraisLivraison) * tpsRate).toFixed(2);
    };

    const calculerTVQ = () => {
        return ((sousTotal + fraisLivraison) * tvqRate).toFixed(2);
    };

    const calculerGrandTotal = () => {
        const totalAvantTaxes = sousTotal + fraisLivraison;
        const tps = totalAvantTaxes * tpsRate;
        const tvq = totalAvantTaxes * tvqRate;
        return (totalAvantTaxes + tps + tvq).toFixed(2);
    };

    const grandTotal = calculerGrandTotal();

    const handlePayer = () => {
        alert(`Fonctionnalité de paiement par Stripe à intégrer ici ! Total à payer: ${grandTotal} $`);
    };

    return (
        <div className="container mt-5">
            <h2>Mise de côté</h2>
            {panierProduits.length > 0 ? (
                <ul className="list-group">
                    {panierProduits.map(produit => {
                        const isAbsoluteURL = produit.imageUrl?.startsWith('http://') || produit.imageUrl?.startsWith('https://');
                        const imageSource = produit.imageUrl ? (isAbsoluteURL ? produit.imageUrl : `../${produit.imageUrl}`) : '/images/default.png';
                        const quantity = quantites[produit.id] || 0;
                        const prixUnitaire = produit.prix.toFixed(2);
                        const totalArticle = calculerTotalArticle(produit);
                        const estEnRuptureDeStock = inventaires[produit.id] === 0;

                        return (
                            <li key={produit.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center" style={{ flexGrow: 1 }}>
                                    <img src={imageSource} alt={produit.titre} className="panier-image" />
                                    <div>
                                        <h5>{produit.titre}</h5>
                                        <p className="mb-0">Artiste: {produit.artiste}</p>
                                        <p className="mb-0">{inventaires[produit.id] === 0 ? <span className="text-danger">Rupture de stock - </span> : ''}{prixUnitaire} $</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    {!estEnRuptureDeStock && (
                                        <>
                                            <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => handleDecrement(produit.id)}>
                                                <FontAwesomeIcon icon={faMinus} />
                                            </button>
                                            <span className="me-2">Qté: {quantity}</span>
                                            <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => handleIncrement(produit.id)}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </button>
                                            <span className="ms-3">Total: {totalArticle} $</span> {/* Afficher le total seulement si pas en rupture */}
                                        </>
                                    )}
                                    <button className="btn btn-sm btn-outline-danger ms-3" onClick={() => handleRemoveFromCart(produit.id)}>
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </button>
                                    {!estEnRuptureDeStock && (
                                    <a href={produit.stripeURL} className="btn btn-success me-2">
                                        $
                                    </a>
                                    )}

                                </div>
                            </li>);
                    })}
                    <li className="list-group-item d-flex justify-content-end">
                        <strong>Sous-total: {sousTotal.toFixed(2)} $</strong>
                    </li>
                    <li className="list-group-item d-flex justify-content-end">
                        <strong>Frais de livraison: {fraisLivraison.toFixed(2)} $</strong>
                    </li>
                    <li className="list-group-item d-flex justify-content-end">
                        <strong>TPS (5%): {calculerTPS()} $</strong>
                    </li>
                    <li className="list-group-item d-flex justify-content-end">
                        <strong>TVQ (9.975%): {calculerTVQ()} $</strong>
                    </li>
                    <li className="list-group-item d-flex justify-content-end">
                        <strong>Grand Total: {grandTotal} $</strong>
                    </li>
                </ul>
            ) : (
                <p>Votre panier est vide.</p>
            )}
            {panierProduits.length > 0 && (
                <div className="mt-3 text-end">
                     <p className="" >
                        Payer ($) les articles individuellement, 
                    </p>
                   <p className="" >
                        pour un montant de {grandTotal} $ par Stripe
                    </p>
                </div>
            )}
        </div>
    );
}