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
    return <div className="loading">Loading featured posts...</div>;
  }
  
  return (
    <section className="featured-section">
      <h2>Em destaque</h2>
      <div className="featured-container">
        <button 
          className="scroll-button scroll-left" 
          onClick={handleScrollLeft}
          aria-label="Scroll left"
        >
          ←
        </button>
        
        <div className="featured-posts" ref={scrollContainerRef}>
          {featuredPosts.map(post => (
            <Link 
              to={`/blog/${post.slug}`} 
              key={post.id} 
              className="featured-post-link"
            >
              <div className="featured-post-card">
                <div className="post-image">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="post-info">
                  <h3>{post.title}</h3>
                  <p>{post.summary}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <button 
          className="scroll-button scroll-right" 
          onClick={handleScrollRight}
          aria-label="Scroll right"
        >
          →
        </button>
      </div>
    </section>
  );
}

export default FeaturedSection; 