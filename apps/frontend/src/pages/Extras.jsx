import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/extras.css';

function Extras() {
  return (
    <div className="extras-page">
      <h1>Extras</h1>
      <p className="extras-intro">
        Páginas especiais fora do blog principal.
      </p>
      <div className="extras-grid">
        <Link to="/recomendacoes" className="extras-card">
          <span className="extras-card-icon" aria-hidden="true">&#9733;</span>
          <h2>Recomendações</h2>
          <p>Jogos, animes, filmes, músicas e mangás que eu recomendo.</p>
        </Link>
        <Link to="/shrines" className="extras-card extras-card--dark">
          <span className="extras-card-icon" aria-hidden="true">&#9961;</span>
          <h2>Shrines</h2>
          <p>Páginas dedicadas às coisas que eu mais amo.</p>
        </Link>
      </div>
    </div>
  );
}

export default Extras;
