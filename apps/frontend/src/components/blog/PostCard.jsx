import React from 'react';
import { Link } from 'react-router-dom';
import CategoryBadge from '../common/CategoryBadge';
import { formatDate } from '../../utils/formatDate';

function PostCard({ post }) {
  const { title, slug, summary, image, publishedOn, category } = post;
  
  return (
    <article className="post-card">
      <Link to={`/blog/${slug}`} className="post-card__image" tabIndex={-1} aria-hidden="true">
        <img src={image} alt="" loading="lazy" />
      </Link>
      
      <div className="post-card__content">
        <div className="post-card__meta">
          <CategoryBadge category={category} />
          {publishedOn && <time dateTime={publishedOn}>{formatDate(publishedOn)}</time>}
        </div>
        
        <h3 className="post-card__title">
          <Link to={`/blog/${slug}`}>{title}</Link>
        </h3>
        
        <p className="post-card__summary">{summary}</p>
        
        <Link to={`/blog/${slug}`} className="read-more">
          Leia mais
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
        </Link>
      </div>
    </article>
  );
}

export default PostCard;
