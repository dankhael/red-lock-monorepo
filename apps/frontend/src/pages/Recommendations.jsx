import React from 'react';
import { recommendations } from '../data/recommendations';
import CategoryNav from '../components/recommendations/CategoryNav';
import RecommendationCategory from '../components/recommendations/RecommendationCategory';
import '../styles/recommendations.css';

function Recommendations() {
  return (
    <div className="recommendations-page">
      <h1>Recomendações</h1>
      <p className="recommendations-intro">
        Coisas que eu curto e recomendo. Jogos, animes, filmes, músicas e mangás que marcaram minha vida.
      </p>
      <CategoryNav categories={recommendations} />
      {recommendations.map((cat) => (
        <RecommendationCategory key={cat.id} category={cat} />
      ))}
    </div>
  );
}

export default Recommendations;
