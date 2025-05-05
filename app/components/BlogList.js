//app\components\BlogList.js
import BlogCard from "../components/BlogCard";

export default function BlogList({ musiques }) {
    return (
        <div className="row">
            {musiques
                .filter(musique => !musique.deleted)
                .map((musique, index) => (
                    <BlogCard
                        key={index}
                        titre={musique.titre}
                        album={musique.album}
                        artiste={musique.artiste}
                        genre={musique.genre}
                        année={musique.annee}
                        duration={musique.duration}
                        imageUrl={musique.imageUrl}
                        extraitUrl={musique.extraitUrl}
                        tours33={musique.tours33}
                        tours45={musique.tours45}
                        disponible={musique.disponible}
                        deleted={musique.deleted}
                        prix={musique.prix}
                        id={musique.id}
                        className="card col-lg-4 col-12"
                    />
                ))}
        </div>
    );
}