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
      <div className="footer-bottom">
        <div className="footer-card">
          {quote && (
            <>
              <span className="footer-label">Frase em não tanto destaque</span>
              <blockquote className="footer-quote">
                “{quote}” {author && <cite>— {author}</cite>}
              </blockquote>
            </>
          )}
          <p className="footer-meta">
            &copy; {new Date().getFullYear()} Red Box
            {' · '}
            <a href="https://api.dankredbox.com/api/rss" target="_blank" rel="noopener noreferrer" className="rss-link">
              RSS Feed
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
