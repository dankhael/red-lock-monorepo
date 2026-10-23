import React from 'react';
import { Link } from 'react-router-dom';

const toModifier = (category = '') =>
  category
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

function CategoryBadge({ category }) {
  if (!category) return null;

  return (
    <Link 
      to={`/blog?category=${encodeURIComponent(category)}`}
      className={`category-badge category-badge--${toModifier(category)}`}
    >
      {category}
    </Link>
  );
}

export default CategoryBadge; 
