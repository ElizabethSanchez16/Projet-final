//app\detail\[id]\page.js
"use client";
import Header from "../../components/Header";
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
        <Header />
        <div>Chargement des détails de la musique...</div>
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

  if (musiqueDetail) {
    const isAbsoluteURL = musiqueDetail.imageUrl.startsWith('http://') || musiqueDetail.imageUrl.startsWith('https://');
    const imageSource = isAbsoluteURL ? musiqueDetail.imageUrl : `../${musiqueDetail.imageUrl}`;

    return (
      <>
        <Header />
        <div className="cover-container">
          <img className="cover-img" src={imageSource} alt={musiqueDetail.titre} />
        </div>
        <h1 className="titre">{musiqueDetail.titre}</h1>
        <h2 className="artiste">Artiste: {musiqueDetail.artiste}</h2>
        {musiqueDetail.album && <h3 className="album">Album: {musiqueDetail.album}</h3>}
        {musiqueDetail.genre && <p className="genre">Genre: {musiqueDetail.genre.join(', ')}</p>}
        <p className="annee">Année: {musiqueDetail.année}</p>
        <p className="duration">Durée: {musiqueDetail.duration}</p>
        <p className="prix">Prix: {musiqueDetail.prix} $</p>
        <p className="disponible">Disponible: {musiqueDetail.disponible}</p>
        <p className="vitesse">Vitesse: {musiqueDetail.tours33 ? '33 tours' : ''} {musiqueDetail.tours45 ? (musiqueDetail.tours33 ? ' / 45 tours' : '45 tours') : ''}</p>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossOrigin="anonymous"></script>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <div>Impossible de charger les détails de la musique.</div>
      </>
    )
  }
}
