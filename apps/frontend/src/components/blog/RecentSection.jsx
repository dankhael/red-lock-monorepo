import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from './PostCard';
import { getRecentPosts } from '../../services/blogService';
import '../../styles/recentSection.css';

function RecentSection() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadRecentPosts = async () => {
            try {
                const recentPosts = await getRecentPosts();
                // Sort posts by publishedAt date in descending order
                const sortedPosts = recentPosts.sort((a, b) => 
                    new Date(b.publishedOn) - new Date(a.publishedOn)
                );
                setPosts(sortedPosts);
            } catch (error) {
                console.error('Failed to load recent posts:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadRecentPosts();
    }, []);

    if (isLoading) {
        return <div className="loading">Loading recent posts...</div>;
    }

    return (
        <section className="recent-section">
            <h2>Posts recentes</h2>
            <div className="post-list">
                {posts.slice(0, 5).map((post) => (
                    <Link to={`/blog/${post.slug}`} key={post.id}>
                        <PostCard post={post} />
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default RecentSection;