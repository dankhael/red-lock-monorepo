import React from 'react';

function ShrineAbout({ data }) {
  return (
    <div className="shrine-about">
      {data.infobox && (
        <aside className="shrine-infobox">
          <h3 className="shrine-infobox-title">Info</h3>
          <dl className="shrine-infobox-list">
            {Object.entries(data.infobox).map(([key, value]) => (
              <div key={key} className="shrine-infobox-item">
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      )}
      <div className="shrine-about-text">
        {data.content.split('\n\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

export default ShrineAbout;
