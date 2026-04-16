import React from 'react';

function CategoryNav({ categories }) {
  const scrollToCategory = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="rec-category-nav" aria-label="Navegação por categoria">
      {categories.map((cat) => (
        <button
          key={cat.id}
          className="rec-category-nav-btn"
          onClick={() => scrollToCategory(cat.id)}
        >
          {cat.category}
        </button>
      ))}
    </nav>
  );
}

export default CategoryNav;
