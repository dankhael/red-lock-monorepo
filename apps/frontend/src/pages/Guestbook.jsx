import React from 'react';

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