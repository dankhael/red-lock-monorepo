import React from 'react';
import { Link } from 'react-router-dom';
import CategoryBadge from '../common/CategoryBadge';
import { formatDate } from '../../utils/formatDate';

function PostCard({ post }) {
  const { title, slug, summary, image, publishedOn, category } = post;
  
  return (
    <article className="post-card">
      <div className="post-image">
        <a href={`/blog/${slug}`}>
          <img src={image} alt={title}/>
        </a>
        
      </div>
      
      <div className="post-content">
        <div>
          <CategoryBadge category={category} />
          
          <h2 className="post-title">
            <Link to={`/blog/${slug}`}>{title}</Link>
          </h2>
          
          <div className="post-meta">
            <time>{formatDate(publishedOn)}</time>
          </div>
          
          <p className="post-summary">{summary}</p>
        </div>
        
        <Link to={`/blog/${slug}`} className="read-more">
          Leia Mais →
        </Link>
      </div>
    </article>
  );
}

export default PostCard; 