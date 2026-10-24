import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/blog?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <form className="search-bar" role="search" onSubmit={handleSearch}>
      <label htmlFor="site-search" className="visually-hidden">Buscar posts</label>
      <input
        id="site-search"
        type="search"
        placeholder="Buscar posts…"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  );
}

export default SearchBar;
