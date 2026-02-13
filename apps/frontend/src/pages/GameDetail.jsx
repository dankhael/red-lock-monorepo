import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGameBySlug } from '../services/gameService';

function GameDetail() {
  const { slug } = useParams();
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadGame = async () => {
      setIsLoading(true);
      try {
        const gameData = await getGameBySlug(slug);
        setGame(gameData);
      } catch (error) {
        console.error('Failed to load game:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadGame();
  }, [slug]);
  
  if (isLoading) {
    return <div className="loading">Loading game details...</div>;
  }
  
  if (!game) {
    return <div className="error">Game not found</div>;
  }
  
  return (
    <div className="game-detail">
      <h1>{game.title}</h1>
      
      <div className="game-showcase">
        <img src={game.image} alt={game.title} className="game-image" />
        
        <div className="game-info">
          <div className="game-description">
            <h2>About this Game</h2>
            <p>{game.description}</p>
          </div>
          
          {game.features && (
            <div className="game-features">
              <h2>Features</h2>
              <ul>
                {game.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          
          {game.playLink && (
            <div className="game-play">
              <a href={game.playLink} className="play-button" target="_blank" rel="noopener noreferrer">
                Play Game
              </a>
            </div>
          )}
        </div>
      </div>
      
      {game.screenshots && (
        <div className="game-screenshots">
          <h2>Screenshots</h2>
          <div className="screenshot-gallery">
            {game.screenshots.map((screenshot, index) => (
              <img key={index} src={screenshot} alt={`Screenshot ${index + 1}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default GameDetail; 