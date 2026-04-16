import React from 'react';

const tabs = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'galeria', label: 'Galeria' },
  { id: 'citacoes', label: 'Citações' },
  { id: 'links', label: 'Links' },
];

function ShrineTabs({ activeTab, onTabChange }) {
  return (
    <nav className="shrine-tabs" aria-label="Navegação do shrine">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`shrine-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
          aria-selected={activeTab === tab.id}
          role="tab"
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

export default ShrineTabs;
