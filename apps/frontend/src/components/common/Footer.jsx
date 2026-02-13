import React, { useState, useEffect } from 'react';

import { getQuote } from '../../services/blogService';

function Footer() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => { 
    const loadQuote = async () => {
      try {
        const response = await getQuote();
        setQuote(response.quote);
        setAuthor(response.author);
      } catch (error) {
        console.error('Failed to load quote:', error);
      }
    };
    loadQuote();
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
        </div>
      </div>
      
      <div className="footer-bottom">
        <h2>Frase em não tanto destaque: "{quote}", {author} </h2>
        <p>&copy; {new Date().getFullYear()} Red Box. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer; 