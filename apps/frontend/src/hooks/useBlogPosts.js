import { useState, useEffect } from 'react';
import { getPosts } from '../services/blogService';

export const useRecentPosts = (limit = 5) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchRecentPosts = async () => {
      setIsLoading(true);
      try {
        const response = await getPosts({ page: 1, limit });
        setPosts(response.posts);
      } catch (err) {
        setError(err);
        console.error('Error fetching recent posts:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecentPosts();
  }, [limit]);
  
  return { posts, isLoading, error };
}; 