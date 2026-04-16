import React, { useState, useEffect, useCallback } from 'react';

function ShrineGallery({ images }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showPrev = useCallback((e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const showNext = useCallback((e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev(e);
      if (e.key === 'ArrowRight') showNext(e);
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  return (
    <div className="shrine-gallery">
      <div className="shrine-gallery-grid">
        {images.map((img, index) => (
          <button
            key={index}
            className="shrine-gallery-item"
            onClick={() => setLightboxIndex(index)}
            aria-label={`Ver imagem: ${img.alt}`}
          >
            <img src={img.src} alt={img.alt} loading="lazy" />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          className="shrine-lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-label="Visualizar imagem"
        >
          <button
            className="shrine-lightbox-close"
            onClick={closeLightbox}
            aria-label="Fechar"
          >
            &times;
          </button>
          <button
            className="shrine-lightbox-nav shrine-lightbox-prev"
            onClick={showPrev}
            aria-label="Imagem anterior"
          >
            &#8249;
          </button>
          <img
            src={images[lightboxIndex].src}
            alt={images[lightboxIndex].alt}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="shrine-lightbox-nav shrine-lightbox-next"
            onClick={showNext}
            aria-label="Próxima imagem"
          >
            &#8250;
          </button>
        </div>
      )}
    </div>
  );
}

export default ShrineGallery;
