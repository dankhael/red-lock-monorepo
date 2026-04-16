import React from 'react';

function ShrineLinks({ links }) {
  return (
    <div className="shrine-links">
      <ul className="shrine-links-list">
        {links.map((link, index) => (
          <li key={index} className="shrine-links-item">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrine-links-anchor"
            >
              <span className="shrine-links-icon">&#8599;</span>
              <span className="shrine-links-label">{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShrineLinks;
