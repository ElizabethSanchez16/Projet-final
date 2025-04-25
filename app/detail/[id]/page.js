//app\detail\[id]\page.js
"use client";
import Header from "../../components/Header";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { setLocalStorageLastConsultedMovieIdAction } from "../../serversActions/setLocalStorageLastConsultedMovieIdAction";

export default function PageDetailId() {
  const { id } = useParams();
  const [filmDetail, setFilmDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/films/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError("Film non trouvé.");
          } else {
            throw new Error(`Erreur HTTP! statut: ${response.status}`);
          }
          return;
        }
        const data = await response.json();
        setFilmDetail(data);
        setLoading(false);

        setLocalStorageLastConsultedMovieIdAction(id);

  
      } catch (e) {
        setError("Impossible de charger les détails du film.");
        setLoading(false);
      }
    };

    fetchFilmDetails();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div>Chargement des détails du film...</div>
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

  if (filmDetail) {
    return (
      <>
        <Header />
        <img className="cover img-fluid" src={filmDetail.imageUrl} alt={filmDetail.titre} />
        <h1 className="titre">{filmDetail.titre}</h1>
        <h2 className="duration">Durée: {filmDetail.duration}</h2>
        <p className="description">{filmDetail.description}</p>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossOrigin="anonymous"></script>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <div>Impossible de charger les détails du film.</div>
      </>
    )
  }
}
