import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CategoryBadge from '../components/common/CategoryBadge';
import { getPostBySlug } from '../services/blogService';
import { formatDate } from '../utils/formatDate';
import MarkdownRenderer from '../components/MarkdownRenderer';
import '../styles/blogPost.css';
import Sidebar from '../components/common/Sidebar';

function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      setIsLoading(true);
      try {
        const postData = await getPostBySlug(slug);
        setPost(postData);
      } catch (error) {
        console.error('Failed to load post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (isLoading) {
    return <div className="loading">Loading post...</div>;
  }

  if (!post) {
    return <div className="error">Post not found</div>;
  }

  return (
    <div className="blog-post-page">
      <div className="blog-post-layout">
        <article className="blog-post">
          <header className="post-header">
            <CategoryBadge category={post.category} />
            <h1 className="post-title">{post.title}</h1>
            <div className="post-meta">
              <time>{formatDate(post.publishedAt)}</time>
            </div>
          </header>

          {post.image && (
            <div className="post-featured-image">
              <img
                src={post.image}
                alt={post.title}
                width="800"
                height="400"
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  maxWidth: '800px',
                  height: 'auto',
                  aspectRatio: '2/1',
                  borderRadius: '8px',
                  marginBottom: '2rem',
                }}
              />
            </div>
          )}

          <div className="post-wrapper">
            <MarkdownRenderer content={post.content} />
          </div>
        </article>

        <Sidebar />
      </div>
    </div>
  );
}

export default BlogPost;