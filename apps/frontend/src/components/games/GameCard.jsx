import React from 'react';
import { Link } from 'react-router-dom';

function GameCard({ game }) {
  const { title, slug, thumbnail, description } = game;
  
  return (
    <div className="game-card">
      <div className="game-thumbnail">
        <Link to={`/games/${slug}`}>
          <img src={thumbnail} alt={title} />
        </Link>
      </div>
      
      <div className="game-info">
        <h3 className="game-title">
          <Link to={`/games/${slug}`}>{title}</Link>
        </h3>
        
        <p className="game-description">{description}</p>
        
        <Link to={`/games/${slug}`} className="view-game">
          View Game
        </Link>
      </div>
    </div>
  );
}

export default GameCard; 