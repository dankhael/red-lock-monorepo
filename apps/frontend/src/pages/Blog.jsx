import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PostList from '../components/blog/PostList';
import { getPosts } from '../services/blogService';
import Sidebar from '../components/common/Sidebar';
import '../styles/blog.css';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1
  });
  
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const page = parseInt(searchParams.get('page') || '1', 10);
  
  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const response = await getPosts({
          category,
          search,
          page,
          limit: 10,
          sort: 'date',
          order: 'desc'  // descending order - newest first
        });
        
        setPosts(response.posts);
        setPagination({
          currentPage: response.currentPage,
          totalPages: response.totalPages
        });
      } catch (error) {
        console.error('Failed to load posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPosts();
  }, [category, search, page]);
  
  return (
    <div className="blog-page">
      <h1>Blog</h1>
      
      {category && (
        <div className="filter-info">
          Showing posts in category: <strong>{category}</strong>
        </div>
      )}
      
      {search && (
        <div className="filter-info">
          Search results for: <strong>{search}</strong>
        </div>
      )}
      
      {isLoading ? (
        <div className="loading">Loading posts...</div>
      ) : (
        <div className="blog-content">
          <div className="main-content">
            <PostList posts={posts} />
            
            {/* Pagination controls */}
            <div className="pagination">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(pageNum => (
                <a 
                  key={pageNum}
                  href={`/blog?page=${pageNum}${category ? `&category=${category}` : ''}${search ? `&search=${search}` : ''}`}
                  className={pageNum === pagination.currentPage ? 'active' : ''}
                >
                  {pageNum}
                </a>
              ))}
            </div>
          </div>
          <Sidebar />
        </div>
      )}
    </div>
  );
}

export default Blog; 