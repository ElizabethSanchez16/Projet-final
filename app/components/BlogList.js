// app/components/BlogList.js
import BlogCard from "../components/BlogCard";

export default function BlogList({ films }) {
    return (
        <div className="row">
            {films
                .filter(film => !film.deleted) // Filtrer les films où 'deleted' est false (ou absent)
                .map((film, index) => (
                    <BlogCard
                        key={index}
                        titre={film.titre}
                        description={film.description}
                        imageUrl={film.imageUrl}
                        id={film.id} // Assurez-vous que vos objets 'film' ont une propriété 'id'
                        className="card col-lg-4 col-12"
                    />
                ))}
        </div>
    );
}