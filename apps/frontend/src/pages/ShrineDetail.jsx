import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { shrineDetails } from '../data/shrines';
import ShrineHero from '../components/shrines/ShrineHero';
import ShrineTabs from '../components/shrines/ShrineTabs';
import ShrineAbout from '../components/shrines/ShrineAbout';
import ShrineGallery from '../components/shrines/ShrineGallery';
import ShrineQuotes from '../components/shrines/ShrineQuotes';
import ShrineLinks from '../components/shrines/ShrineLinks';
import '../styles/shrine-detail.css';

function ShrineDetail() {
  const { id } = useParams();
  const shrine = shrineDetails[id];
  const [activeTab, setActiveTab] = useState('sobre');

  if (!shrine) {
    return (
      <div className="shrine-not-found">
        <h1>Shrine não encontrado</h1>
        <p>O shrine que você procura não existe ou ainda está em construção.</p>
        <Link to="/shrines" className="shrine-not-found-link">
          ← Voltar aos Shrines
        </Link>
      </div>
    );
  }

  const themeVars = {
    '--shrine-primary': shrine.color,
    '--shrine-secondary': shrine.secondaryColor,
    '--shrine-bg': shrine.bgColor,
    '--shrine-text': shrine.textColor,
    '--shrine-accent': shrine.accentColor,
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'sobre':
        return <ShrineAbout data={shrine.tabs.sobre} />;
      case 'galeria':
        return <ShrineGallery images={shrine.tabs.galeria} />;
      case 'citacoes':
        return <ShrineQuotes quotes={shrine.tabs.citacoes} />;
      case 'links':
        return <ShrineLinks links={shrine.tabs.links} />;
      default:
        return <ShrineAbout data={shrine.tabs.sobre} />;
    }
  };

  return (
    <div className="shrine-detail-page" style={themeVars}>
      <header className="shrine-mini-header">
        <Link to="/shrines" className="shrine-back-btn">
          ← Voltar aos Shrines
        </Link>
        <span className="shrine-mini-title">{shrine.name}</span>
      </header>
      <ShrineHero shrine={shrine} />
      <ShrineTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="shrine-content">
        {renderTabContent()}
      </main>
    </div>
  );
}

export default ShrineDetail;
