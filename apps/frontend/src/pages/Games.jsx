import React from 'react';
import '../styles/games.css';
import OnConstruction from '../components/common/OnConstruction';

function Games() {
  
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