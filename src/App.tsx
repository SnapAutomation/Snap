import React, { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import Header from './components/Header';
import PostCard from './components/PostCard';
import LoadingSpinner from './components/LoadingSpinner';
import BottomNavigation from './components/BottomNavigation';
import PostModal from './components/PostModal';
import SearchModal from './components/SearchModal';
import UserProfileModal from './components/UserProfileModal';
import ImageUploadModal from './components/ImageUploadModal';
import FloatingActionButton from './components/FloatingActionButton';
import { ThemeProvider } from './contexts/ThemeContext';
import { Post, Comment } from './types';
import { mockPosts, generateMorePosts } from './data/mockData';
import { getCommentsForPost } from './data/mockComments';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [activeTab, setActiveTab] = useState<'hot' | 'trending' | 'fresh'>('hot');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postComments, setPostComments] = useState<Record<string, Comment[]>>({});
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isImageUploadOpen, setIsImageUploadOpen] = useState(false);

  // Mock user data
  const currentUser = {
    id: 'user-1',
    username: 'MemeUser',
    bio: 'Love creating and sharing memes! 🎭 Always looking for the next viral content.',
  };

  const userStats = {
    postsCount: 42,
    commentsCount: 156,
    totalPoints: 3247,
    joinDate: 'Dec 2023',
    achievements: ['first-post', 'viral', 'commenter'],
  };

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

    // Update selected post if it's the same post
    if (selectedPost && selectedPost.id === postId) {
      const updatedPost = posts.find(p => p.id === postId);
      if (updatedPost) {
        setSelectedPost({ ...updatedPost });
      }
    }
  }, [posts, selectedPost]);

  // Handle opening comments modal
  const handleOpenComments = useCallback((postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      setSelectedPost(post);
      // Load comments if not already loaded
      if (!postComments[postId]) {
        setPostComments(prev => ({
          ...prev,
          [postId]: getCommentsForPost(postId)
        }));
      }
    }
  }, [posts, postComments]);

  // Handle adding comments
  const handleAddComment = useCallback((postId: string, text: string, parentId?: string) => {
    const newComment: Comment = {
      id: `${postId}-${Date.now()}`,
      text,
      points: 1,
      author: 'You',
      createdAt: 'now'
    };

    setPostComments(prev => {
      const comments = prev[postId] || [];
      if (parentId) {
        // Add as reply
        const addReplyToComment = (comments: Comment[]): Comment[] => {
          return comments.map(comment => {
            if (comment.id === parentId) {
              return {
                ...comment,
                replies: [...(comment.replies || []), newComment]
              };
            }
            if (comment.replies) {
              return {
                ...comment,
                replies: addReplyToComment(comment.replies)
              };
            }
            return comment;
          });
        };
        return {
          ...prev,
          [postId]: addReplyToComment(comments)
        };
      } else {
        // Add as top-level comment
        return {
          ...prev,
          [postId]: [newComment, ...comments]
        };
      }
    });

    // Update post comment count
    setPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { ...post, commentsCount: post.commentsCount + 1 }
          : post
      )
    );
  }, []);

  // Handle comment voting
  const handleVoteComment = useCallback((postId: string, commentId: string, voteType: 'up' | 'down') => {
    setPostComments(prev => {
      const comments = prev[postId] || [];
      const updateCommentVote = (comments: Comment[]): Comment[] => {
        return comments.map(comment => {
          if (comment.id === commentId) {
            return {
              ...comment,
              points: comment.points + (voteType === 'up' ? 1 : -1)
            };
          }
          if (comment.replies) {
            return {
              ...comment,
              replies: updateCommentVote(comment.replies)
            };
          }
          return comment;
        });
      };
      return {
        ...prev,
        [postId]: updateCommentVote(comments)
      };
    });
  }, []);

  // Handle image upload
  const handleImageUpload = useCallback((imageData: string, title: string) => {
    const newPost: Post = {
      id: `user-${Date.now()}`,
      title,
      imageUrl: imageData,
      points: 1,
      commentsCount: 0,
      tags: ['User Created', 'Meme'],
      createdAt: 'now',
      type: 'image',
      userVote: 'up',
    };
    
    setPosts(prev => [newPost, ...prev]);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header 
          onOpenSearch={() => setIsSearchOpen(true)} 
          onOpenProfile={() => setIsProfileOpen(true)}
        />
      
      <main className="max-w-md mx-auto pb-20">
        {/* Posts Feed */}
        <div className="pt-4">
          {posts.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              onVote={handleVote}
              onOpenComments={handleOpenComments}
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

        {/* Floating Action Button */}
        <FloatingActionButton
          onCreateImage={() => setIsImageUploadOpen(true)}
          onCreateText={() => alert('Text posts coming soon!')}
          onCreateVideo={() => alert('Video posts coming soon!')}
        />

      {/* Post Modal */}
      {selectedPost && (
        <PostModal
          post={selectedPost}
          comments={postComments[selectedPost.id] || []}
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          onVote={handleVote}
          onAddComment={handleAddComment}
          onVoteComment={handleVoteComment}
        />
      )}

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        posts={posts}
        onSelectPost={(post) => handleOpenComments(post.id)}
      />

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={currentUser}
        stats={userStats}
      />

      {/* Image Upload Modal */}
      <ImageUploadModal
        isOpen={isImageUploadOpen}
        onClose={() => setIsImageUploadOpen(false)}
        onUpload={handleImageUpload}
      />
      </div>
    </ThemeProvider>
  );
};

export default App;