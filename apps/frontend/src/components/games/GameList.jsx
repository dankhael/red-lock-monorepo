import React from 'react';
import GameCard from './GameCard';

function GameList({ games }) {
  if (!games || games.length === 0) {
    return <div className="no-games">No games found</div>;
  }
  
  return (
    <div className="game-list">
      {games.map(game => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}

export default GameList; 