import React from 'react';
import { Link } from 'react-router-dom';

function CategoryBadge({ category }) {
  return (
    <Link 
      to={`/blog?category=${encodeURIComponent(category)}`}
      className="category-badge"
    >
      {category}
    </Link>
  );
}

export default CategoryBadge; 