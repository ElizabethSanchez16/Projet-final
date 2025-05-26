// app/components/BlogList.js
import { useState } from 'react';
import PropTypes from 'prop-types';
import BlogCard from "./BlogCard";

const safeString = (str) => String(str || '').toLowerCase();

export default function BlogList({ musiques = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const normalizedSearch = safeString(searchTerm);

//   funcion que hace el filtro en si de las musicas que llegan como props
  const filteredMusiques = musiques
    .filter(musique => !musique.deleted)
    .filter(musique => {
      if (!normalizedSearch) return true;
      return (
        safeString(musique.titre).includes(normalizedSearch) ||
        safeString(musique.artiste).includes(normalizedSearch) ||
        safeString(musique.album).includes(normalizedSearch)
      );
    });

  return (
    <div className="container">
        {/* empieza la barra de busqueda */}
      <div className="row mb-4">
        <div className="col-12">
          <input
            type="text"
            placeholder="Rechercher par titre, artiste ou album..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
          <button className="btn"
            type="button" 
              onClick={() => onSearch('test')} // Valor hardcodeado
          >
              Rechercher
          </button>
      </div>
      <div className="row">
        {filteredMusiques.map((musique) => (
          <BlogCard
            key={musique.id}
            {...musique}
            className="card col-lg-4 col-md-6 col-12 mb-4"
          />
        ))}
      </div>
    </div>
  );
}