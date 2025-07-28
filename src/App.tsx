import React, { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import Header from './components/Header';
import PostCard from './components/PostCard';
import LoadingSpinner from './components/LoadingSpinner';
import BottomNavigation from './components/BottomNavigation';
import { Post } from './types';
import { mockPosts, generateMorePosts } from './data/mockData';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [activeTab, setActiveTab] = useState<'hot' | 'trending' | 'fresh'>('hot');

  // Intersection observer for infinite scroll
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    rootMargin: '100px',
  });

  // Load initial posts
  useEffect(() => {
    setPosts(mockPosts);
    setPage(1);
  }, []);

  // Load more posts when scrolling to bottom
  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newPosts = generateMorePosts(mockPosts.length + (page - 1) * 10 + 1, 10);
    
    setPosts(prev => [...prev, ...newPosts]);
    setPage(prev => prev + 1);
    
    // Stop loading after 5 pages for demo
    if (page >= 5) {
      setHasMore(false);
    }
    
    setLoading(false);
  }, [loading, hasMore, page]);

  // Trigger load more when in view
  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMorePosts();
    }
  }, [inView, hasMore, loading, loadMorePosts]);

  // Handle voting
  const handleVote = useCallback((postId: string, voteType: 'up' | 'down') => {
    setPosts(prev => 
      prev.map(post => {
        if (post.id === postId) {
          const currentVote = post.userVote;
          let newPoints = post.points;
          let newVote: 'up' | 'down' | null = voteType;

          // Remove previous vote if exists
          if (currentVote === 'up') newPoints -= 1;
          if (currentVote === 'down') newPoints += 1;

          // Apply new vote
          if (voteType === 'up') {
            if (currentVote === 'up') {
              // Remove upvote
              newVote = null;
              newPoints -= 1;
            } else {
              // Add upvote
              newPoints += 1;
            }
          } else {
            if (currentVote === 'down') {
              // Remove downvote
              newVote = null;
              newPoints += 1;
            } else {
              // Add downvote
              newPoints -= 1;
            }
          }

          return { ...post, points: newPoints, userVote: newVote };
        }
        return post;
      })
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-md mx-auto pb-20">
        {/* Posts Feed */}
        <div className="pt-4">
          {posts.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              onVote={handleVote}
            />
          ))}
          
          {/* Loading trigger and spinner */}
          {hasMore && (
            <div ref={loadMoreRef}>
              {loading && <LoadingSpinner />}
            </div>
          )}
          
          {/* End of feed message */}
          {!hasMore && (
            <div className="text-center py-8 text-gray-500">
              <p>You've reached the end! 🎉</p>
              <p className="text-sm mt-1">That's all the memes for now</p>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
    </div>
  );
};

export default App;