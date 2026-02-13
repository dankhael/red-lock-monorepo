import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/guestbook.css';
import OnConstruction from '../components/common/OnConstruction';

function Guestbook() {
  return (
    <div className="guestbook-page">
      <h1>Guestbook</h1>
      <OnConstruction />
    </div>
  );
}

export default Guestbook;