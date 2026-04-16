import React from 'react';
import { shrineIndex } from '../data/shrines';
import ShrineSlot from '../components/shrines/ShrineSlot';
import '../styles/shrines.css';

function Shrines() {
  return (
    <div className="shrines-page">
      <div className="shrines-title-container">
        <h1 className="shrines-title">SHRINES</h1>
        <p className="shrines-subtitle">Escolha um shrine para explorar</p>
      </div>
      <div className="shrines-grid-border">
        <div className="shrines-grid">
          {shrineIndex.map((shrine) => (
            <ShrineSlot key={shrine.id} shrine={shrine} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shrines;
