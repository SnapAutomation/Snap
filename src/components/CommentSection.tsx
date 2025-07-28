import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Reply, MoreHorizontal } from 'lucide-react';
import { Comment } from '../types';
import clsx from 'clsx';

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (text: string, parentId?: string) => void;
  onVoteComment: (commentId: string, voteType: 'up' | 'down') => void;
}

interface CommentItemProps {
  comment: Comment;
  onVoteComment: (commentId: string, voteType: 'up' | 'down') => void;
  onReply: (parentId: string, text: string) => void;
  depth?: number;
}

const CommentItem: React.FC<CommentItemProps> = ({ 
  comment, 
  onVoteComment, 
  onReply, 
  depth = 0 
}) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [showReplies, setShowReplies] = useState(true);

  const handleReplySubmit = () => {
    if (replyText.trim()) {
      onReply(comment.id, replyText);
      setReplyText('');
      setShowReplyBox(false);
    }
  };

  const formatPoints = (points: number) => {
    if (points >= 1000) {
      return `${(points / 1000).toFixed(1)}k`;
    }
    return points.toString();
  };

  return (
    <div className={clsx('border-l-2 border-gray-100', depth > 0 && 'ml-4 pl-3')}>
      <div className="py-3">
        {/* Comment Header */}
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">
              {comment.author.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="font-medium text-gray-900">{comment.author}</span>
          <span className="text-gray-500 text-sm">•</span>
          <span className="text-gray-500 text-sm">{comment.createdAt}</span>
        </div>

        {/* Comment Text */}
        <p className="text-gray-800 mb-3 leading-relaxed">{comment.text}</p>

        {/* Comment Actions */}
        <div className="flex items-center space-x-4">
          {/* Voting */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => onVoteComment(comment.id, 'up')}
              className="p-1 text-gray-400 hover:text-orange-500 transition-colors"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium text-gray-600 min-w-[30px] text-center">
              {formatPoints(comment.points)}
            </span>
            <button
              onClick={() => onVoteComment(comment.id, 'down')}
              className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Reply Button */}
          <button
            onClick={() => setShowReplyBox(!showReplyBox)}
            className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Reply className="w-4 h-4" />
            <span className="text-sm">Reply</span>
          </button>

          {/* More Options */}
          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Reply Input */}
        {showReplyBox && (
          <div className="mt-3 space-y-2">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              rows={3}
            />
            <div className="flex space-x-2">
              <button
                onClick={handleReplySubmit}
                disabled={!replyText.trim()}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reply
              </button>
              <button
                onClick={() => {
                  setShowReplyBox(false);
                  setReplyText('');
                }}
                className="px-4 py-2 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Nested Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3">
            {comment.replies.length > 0 && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors mb-2"
              >
                {showReplies ? 'Hide' : 'Show'} {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
              </button>
            )}
            {showReplies && (
              <div className="space-y-2">
                {comment.replies.map((reply) => (
                  <CommentItem
                    key={reply.id}
                    comment={reply}
                    onVoteComment={onVoteComment}
                    onReply={onReply}
                    depth={depth + 1}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  onAddComment,
  onVoteComment,
}) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  const handleReply = (parentId: string, text: string) => {
    onAddComment(text, parentId);
  };

  return (
    <div className="bg-white border-t border-gray-200">
      {/* Add Comment */}
      <div className="p-4 border-b border-gray-100">
        <div className="space-y-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="What do you think?"
            className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            rows={3}
          />
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={!newComment.trim()}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Comment
            </button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="divide-y divide-gray-100">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="px-4">
              <CommentItem
                comment={comment}
                onVoteComment={onVoteComment}
                onReply={handleReply}
              />
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;