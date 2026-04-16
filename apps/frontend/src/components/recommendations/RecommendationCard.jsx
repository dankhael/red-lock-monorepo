import React from 'react';

function RecommendationCard({ item }) {
  return (
    <div className="rec-card" style={{ aspectRatio: item.aspectRatio || '3/4' }}>
      <img
        src={item.image}
        alt={item.name}
        className="rec-card-image"
        loading="lazy"
      />
      <div className="rec-card-overlay">
        <h3 className="rec-card-name">{item.name}</h3>
        <p className="rec-card-comment">{item.comment}</p>
      </div>
    </div>
  );
}

export default RecommendationCard;
