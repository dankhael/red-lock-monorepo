import React from 'react';
import { Link } from 'react-router-dom';

const categoryIcons = {
  game: '\uD83C\uDFAE',
  anime: '\uD83D\uDCFA',
  music: '\uD83C\uDFB5',
  character: '\uD83D\uDC64',
  death: '\ud83d\udc80',
};

function ShrineSlot({ shrine }) {
  if (!shrine.available || !shrine.icon) {
    return (
      <div
        className="shrine-slot shrine-slot--empty"
        style={{ '--slot-color': shrine.color }}
      >
        <div className="shrine-slot-icon-placeholder">?</div>
        <span className="shrine-slot-name">{shrine.name}</span>
      </div>
    );
  }

  return (
    <Link
      to={`/shrines/${shrine.id}`}
      className="shrine-slot shrine-slot--active"
      style={{ '--slot-color': shrine.color }}
    >
      <img
        src={shrine.icon}
        alt={shrine.name}
        className="shrine-slot-icon"
        loading="lazy"
      />
      <span className="shrine-slot-name">{shrine.name}</span>
      <div className="shrine-slot-tooltip">
        {shrine.categoryIcon && (
          <span className="shrine-slot-category-icon">
            {categoryIcons[shrine.categoryIcon]}
          </span>
        )}
        <p className="shrine-slot-tagline">{shrine.tagline}</p>
      </div>
    </Link>
  );
}

export default ShrineSlot;
