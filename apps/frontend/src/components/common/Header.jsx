import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';

import '../../styles/header.css';

function Header() {
  return (
    <header className="header-container">
      <div className="header-inner">
        {/* Top Banner */}
        <div className="top-banner">
          <div className="banner-group">
            <img
              src="/images/nagi_silhouette.png"
              alt=""
              className="banner-character nagi-character"
            />
            <img
              src="/images/L_silhouette.png"
              alt=""
              className="banner-character l-character"
            />
          </div>

          <Link to="/" className="site-logo" aria-label="Red Box — página inicial">
            <span className="logo-word">RED</span>
            <img src="/images/redBoxLogo.png" alt="" className="logo-image" />
            <span className="logo-word">BOX</span>
          </Link>

          <div className="banner-group">
            <img
              src="/images/kaito_silhouette.png"
              alt=""
              className="banner-character kaito-character"
            />
            <img
              src="/images/wright_silhouette.png"
              alt=""
              className="banner-character wright-character"
            />
          </div>
        </div>

        {/* Navigation and Search */}
        <div className="nav-search-container">
          <nav className="navigation" aria-label="Principal">
            <ul>
              <li><NavLink to="/" end>Home</NavLink></li>
              <li><NavLink to="/blog">Blog</NavLink></li>
              <li><NavLink to="/games">Games</NavLink></li>
              <li className="nav-dropdown">
                <NavLink to="/extras">
                  Extras
                  <svg className="nav-caret" aria-hidden="true" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 4l4 4 4-4" />
                  </svg>
                </NavLink>
                <ul className="nav-dropdown-menu">
                  <li><NavLink to="/recomendacoes">Recomendações</NavLink></li>
                  <li><NavLink to="/shrines">Shrines</NavLink></li>
                </ul>
              </li>
              <li><NavLink to="/guestbook">Guestbook</NavLink></li>
              <li><NavLink to="/sobre-mim">Sobre mim</NavLink></li>
            </ul>
          </nav>

          <SearchBar />
        </div>
      </div>
    </header>
  );
}

export default Header;
