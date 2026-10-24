import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import { getFeaturedPosts } from '../../services/blogService';
import '../../styles/featuredSection.css';

function FeaturedSection() {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef(null);
  
  useEffect(() => {
    const loadFeaturedPosts = async () => {
      try {
        const posts = await getFeaturedPosts();
        setFeaturedPosts(posts);
      } catch (error) {
        console.error('Failed to load featured posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadFeaturedPosts();
  }, []);
  
  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return <div className="loading">Carregando destaques…</div>;
  }

  if (featuredPosts.length === 0) {
    return null;
  }
  
  return (
    <section className="featured-section" aria-labelledby="featured-heading">
      <div className="section-heading-row">
        <h2 id="featured-heading">Em destaque</h2>
        <div className="scroll-buttons">
          <button 
            type="button"
            className="scroll-button" 
            onClick={handleScrollLeft}
            aria-label="Destaques anteriores"
          >
            <svg aria-hidden="true" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 3L5 9l6 6" /></svg>
          </button>
          <button 
            type="button"
            className="scroll-button" 
            onClick={handleScrollRight}
            aria-label="Próximos destaques"
          >
            <svg aria-hidden="true" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 3l6 6-6 6" /></svg>
          </button>
        </div>
      </div>

      <div className="featured-posts" ref={scrollContainerRef}>
        {featuredPosts.map(post => (
          <Link 
            to={`/blog/${post.slug}`} 
            key={post.id} 
            className="featured-post-link"
          >
            <article className="featured-post-card">
              <div className="featured-post-image">
                <img src={post.image} alt="" loading="lazy" />
              </div>
              <div className="post-info">
                <h3>{post.title}</h3>
                <p>{post.summary}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default FeaturedSection;
