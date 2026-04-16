import React from 'react';

function ShrineQuotes({ quotes }) {
  return (
    <div className="shrine-quotes">
      {quotes.map((quote, index) => (
        <blockquote key={index} className="shrine-quote-card">
          <p className="shrine-quote-text">&ldquo;{quote.text}&rdquo;</p>
          <footer className="shrine-quote-source">&mdash; {quote.source}</footer>
        </blockquote>
      ))}
    </div>
  );
}

export default ShrineQuotes;
