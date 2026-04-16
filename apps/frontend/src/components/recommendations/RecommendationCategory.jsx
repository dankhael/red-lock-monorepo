import React from 'react';
import RecommendationCard from './RecommendationCard';

function RecommendationCategory({ category }) {
  // Repetir o nome da categoria para o efeito de marquee
  const marqueeText = Array(12).fill(category.category).join('\u00A0\u00A0\u00A0');

  return (
    <section id={category.id} className="rec-category-section">
      <div className="rec-category-header">
        <div className="rec-marquee-bg" aria-hidden="true">
          <div className="rec-marquee-track">
            <span>{marqueeText}</span>
            <span>{marqueeText}</span>
          </div>
        </div>
        <h2 className="rec-category-title">{category.category}</h2>
      </div>
      <div className="rec-divider"></div>
      <div className="rec-grid">
        {category.items.map((item, index) => (
          <RecommendationCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
}

export default RecommendationCategory;
