import React, { useEffect } from 'react';
import { X, ChevronUp, ChevronDown, Share, MoreHorizontal } from 'lucide-react';
import { Post, Comment } from '../types';
import CommentSection from './CommentSection';
import clsx from 'clsx';

interface PostModalProps {
  post: Post;
  comments: Comment[];
  isOpen: boolean;
  onClose: () => void;
  onVote: (postId: string, voteType: 'up' | 'down') => void;
  onAddComment: (postId: string, text: string, parentId?: string) => void;
  onVoteComment: (postId: string, commentId: string, voteType: 'up' | 'down') => void;
}

const PostModal: React.FC<PostModalProps> = ({
  post,
  comments,
  isOpen,
  onClose,
  onVote,
  onAddComment,
  onVoteComment,
}) => {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const formatPoints = (points: number) => {
    if (points >= 1000) {
      return `${(points / 1000).toFixed(1)}k`;
    }
    return points.toString();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleVote = (voteType: 'up' | 'down') => {
    onVote(post.id, voteType);
  };

  const handleAddComment = (text: string, parentId?: string) => {
    onAddComment(post.id, text, parentId);
  };

  const handleVoteComment = (commentId: string, voteType: 'up' | 'down') => {
    onVoteComment(post.id, commentId, voteType);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white w-full max-w-md h-[90vh] rounded-t-xl overflow-hidden flex flex-col animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Post Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Post Content */}
          <div className="p-4">
            {/* Post Title */}
            <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
              {post.title}
            </h3>

            {/* Post Meta */}
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <span>{post.createdAt}</span>
              <span>•</span>
              <div className="flex space-x-1">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Media Content */}
            <div className="mb-4">
              {post.type === 'video' && post.videoUrl ? (
                <video
                  className="w-full rounded-lg"
                  controls
                  poster={post.imageUrl}
                >
                  <source src={post.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full rounded-lg object-cover"
                  />
                )
              )}
            </div>

            {/* Post Actions */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              {/* Voting */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleVote('up')}
                  className={clsx(
                    'vote-button upvote',
                    post.userVote === 'up' && 'active'
                  )}
                >
                  <ChevronUp className="w-6 h-6" />
                </button>
                <span className="text-lg font-semibold text-gray-700 min-w-[50px] text-center">
                  {formatPoints(post.points)}
                </span>
                <button
                  onClick={() => handleVote('down')}
                  className={clsx(
                    'vote-button downvote',
                    post.userVote === 'down' && 'active'
                  )}
                >
                  <ChevronDown className="w-6 h-6" />
                </button>
              </div>

              {/* Other Actions */}
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">
                  {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
                </span>
                <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                  <Share className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <CommentSection
            comments={comments}
            onAddComment={handleAddComment}
            onVoteComment={handleVoteComment}
          />
        </div>
      </div>
    </div>
  );
};

export default PostModal;