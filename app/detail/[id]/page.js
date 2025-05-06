//app\detail\[id]\page.js
"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { setLocalStorageLastConsultedMusiqueIdAction } from "../../serversActions/setLocalStorageLastConsultedMusiqueIdAction";


export default function PageDetailMusiqueId() {
  const { id } = useParams();
  const [musiqueDetail, setMusiqueDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMusiqueDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/musiques/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError("Musique non trouvé.");
          } else {
            throw new Error(`Erreur HTTP! statut: ${response.status}`);
          }
          return;
        }
        const data = await response.json();
        setMusiqueDetail(data);
        setLoading(false);

        setLocalStorageLastConsultedMusiqueIdAction(id);


      } catch (e) {
        setError("Impossible de charger les détails de la musique.");
        setLoading(false);
      }
    };

    fetchMusiqueDetails();
  }, [id]);

  if (loading) {
    return (
      <>
        <div>Chargement des détails de la musique...</div>
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

  if (musiqueDetail) {
    const isAbsoluteURL = musiqueDetail.imageUrl.startsWith('http://') || musiqueDetail.imageUrl.startsWith('https://');
    const imageSource = isAbsoluteURL ? musiqueDetail.imageUrl : `../${musiqueDetail.imageUrl}`;
  
    const handleAddToCart = () => {
      let cart = sessionStorage.getItem('cart');
      let cartArray = cart ? JSON.parse(cart) : [];
      if (!cartArray.includes(musiqueDetail.id.toString())) {
        cartArray.push(musiqueDetail.id.toString());
        sessionStorage.setItem('cart', JSON.stringify(cartArray));
        window.dispatchEvent(new Event('cartUpdated')); // Dispatch an event to update the cart count in the header
        alert(`L'article "${musiqueDetail.titre}" a été ajouté au panier !`);
      } else {
        alert(`L'article "${musiqueDetail.titre}" est déjà dans votre panier.`);
      }
    };
  
    return (
      <>
        <div className="cover-container">
          <img className="cover-img" src={imageSource} alt={musiqueDetail.titre} />
        </div>
        <h1 className="titre">{musiqueDetail.titre}</h1>
        <h2 className="artiste">Artiste: {musiqueDetail.artiste}</h2>
        {musiqueDetail.album && <h3 className="album">Album: {musiqueDetail.album}</h3>}
        {musiqueDetail.genre && <p className="genre">Genre: {musiqueDetail.genre.join(', ')}</p>}
        <p className="annee">Année: {musiqueDetail.annee}</p>
        <p className="duration">Durée: {musiqueDetail.duration}</p>
        <p className="prix">Prix: {musiqueDetail.prix} $</p>
        <p className="disponible">Disponible: {musiqueDetail.disponible}</p>
        <p className="vitesse">Vitesse: {musiqueDetail.tours33 ? '33 tours' : ''} {musiqueDetail.tours45 ? (musiqueDetail.tours33 ? ' / 45 tours' : '45 tours') : ''}</p>
        <button onClick={handleAddToCart} className="btn btn-success mt-3 me-2">
          🛒 Ajouter au panier
        </button>
      </>
    );
  }
}
