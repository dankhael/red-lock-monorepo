import React, { useState, useEffect } from 'react';
import GameList from '../components/games/GameList';
import '../styles/games.css';
import { getGames } from '../services/gameService';
import OnConstruction from '../components/common/OnConstruction';

function Games() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadGames = async () => {
      setIsLoading(true);
      try {
        const gamesData = await getGames();
        setGames(gamesData);
      } catch (error) {
        console.error('Failed to load games:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadGames();
  }, []);
  
  return (
    <div className="games-page">
      <h1>Games</h1>
      
      {/* <p className="games-intro">
        Check out the games I've created. Click on any game to learn more about it.
      </p>
      
      {isLoading ? (
        <div className="loading">Loading games...</div>
      ) : (
        <GameList games={games} />
      )} */}

      <OnConstruction />
    </div>
  );
}

export default Games; 