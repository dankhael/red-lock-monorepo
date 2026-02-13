import { useState, useEffect } from 'react';
import { getPosts, getMockPosts } from '../services/blogService';

export const useRecentPosts = (limit = 5) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchRecentPosts = async () => {
      setIsLoading(true);
      try {
        // For development, you can use mock data
        // const response = getMockPosts();
        // setPosts(response.posts.slice(0, limit));
        
        // For production, use the API
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