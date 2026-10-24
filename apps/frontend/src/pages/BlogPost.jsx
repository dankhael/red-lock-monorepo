import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CategoryBadge from '../components/common/CategoryBadge';
import { getPostBySlug } from '../services/blogService';
import { formatDate } from '../utils/formatDate';
import MarkdownRenderer from '../components/MarkdownRenderer';
import '../styles/blogPost.css';
import '../styles/markdown.css';
import DisqusComments from '../components/common/DisqusComments';

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
    return <div className="loading">Carregando post…</div>;
  }

  if (!post) {
    return (
      <div className="error">
        Post não encontrado. <Link to="/blog">Voltar pro blog</Link>
      </div>
    );
  }

  const subtitle = post.excerpt || post.summary;
  const readingMinutes = post.content
    ? Math.max(1, Math.round(post.content.split(/\s+/).length / 200))
    : null;

  return (
    <div className="blog-post-page">
      <article className="blog-post">
        <nav className="post-breadcrumb" aria-label="Trilha">
          <Link to="/blog">Blog</Link>
          {post.category && (
            <>
              <span aria-hidden="true">/</span>
              <Link to={`/blog?category=${encodeURIComponent(post.category)}`}>{post.category}</Link>
            </>
          )}
        </nav>

        <header className="post-header">
          <CategoryBadge category={post.category} />
          <h1 className="post-header__title">{post.title}</h1>
          {subtitle && <p className="post-header__subtitle">{subtitle}</p>}
          <div className="post-header__meta">
            {post.publishedAt && <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}
            {readingMinutes && (
              <>
                <span aria-hidden="true">·</span>
                <span>{readingMinutes} min de leitura</span>
              </>
            )}
          </div>
        </header>

        {post.image && (
          <figure className="post-featured-image">
            <img
              src={post.image}
              alt=""
              width="800"
              height="450"
            />
          </figure>
        )}

        <div className="post-wrapper">
          <MarkdownRenderer content={post.content} />
        </div>

        <DisqusComments slug={slug} title={post.title} />
      </article>
    </div>
  );
}

export default BlogPost;
