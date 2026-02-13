import React from 'react';
import PostCard from './PostCard';

function PostList({ posts }) {
  if (!posts || posts.length === 0) {
    return <div className="no-posts">No posts found</div>;
  }
  
  return (
    <div className="post-list">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList; 