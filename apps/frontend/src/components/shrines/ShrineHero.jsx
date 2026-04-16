import React from 'react';

function ShrineHero({ shrine }) {
  return (
    <div
      className="shrine-hero"
      style={{ backgroundImage: `url(${shrine.bannerImage})` }}
    >
      <div className="shrine-hero-overlay">
        <h1 className="shrine-hero-title">{shrine.name}</h1>
        <p className="shrine-hero-tagline">{shrine.tagline}</p>
      </div>
    </div>
  );
}

export default ShrineHero;
