import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

import '../../styles/header.css'; 

function Header() {
  return (
    <div className="header-container">
      {/* Top Banner */}
      <div className="top-banner">
        <img 
          src="/images/nagi_silhouette.png" 
          alt="Nagi Seishiro" 
          className="banner-character left-character nagi-character"
        />

        <img 
          src="/images/L_silhouette.png" 
          alt="L" 
          className="banner-character left-character l-character"
        />

        <div className="site-logo">
          <h1>RED</h1>
          <img src="/images/redBoxLogo.png" alt="Red Box Logo" className="logo-image" />
          <h1>BOX</h1>
        </div>
        
        <img 
          src="/images/kaito_silhouette.png" 
          alt="Daimon Kaito" 
          className="banner-character right-character kaito-character"
        />

        <img 
          src="/images/wright_silhouette.png" 
          alt="Phoenix Wright" 
          className="banner-character right-character wright-character"
        />
      </div>

      {/* Navigation and Search */}
      <div className="nav-search-container">
        <nav className="navigation">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/games">Games</Link></li>
            <li><Link to="/extras">Extras</Link></li>
            <li><Link to="/guestbook">Guestbook</Link></li>
            <li><Link to="/sobre-mim">Sobre mim</Link></li>
          </ul>
        </nav>
        
        <SearchBar />
      </div>
    </div>
  );
}

export default Header; 