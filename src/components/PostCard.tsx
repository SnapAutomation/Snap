import React, { useState } from 'react';
import { ChevronUp, ChevronDown, MessageCircle, Share, MoreHorizontal, Play } from 'lucide-react';
import { Post } from '../types';
import clsx from 'clsx';

interface PostCardProps {
  post: Post;
  onVote: (postId: string, voteType: 'up' | 'down') => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onVote }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleVote = (voteType: 'up' | 'down') => {
    onVote(post.id, voteType);
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const formatPoints = (points: number) => {
    if (points >= 1000) {
      return `${(points / 1000).toFixed(1)}k`;
    }
    return points.toString();
  };

  return (
    <article className="post-card mb-4 mx-4">
      {/* Post Header */}
      <div className="p-4 pb-3">
        <h2 className="text-lg font-semibold text-gray-900 leading-tight mb-2">
          {post.title}
        </h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
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
      </div>

      {/* Media Content */}
      <div className="relative">
        {post.type === 'video' && post.videoUrl ? (
          <div className="relative">
            {!isVideoPlaying ? (
              <div
                className="relative cursor-pointer"
                onClick={handleVideoPlay}
              >
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <div className="w-16 h-16 bg-black bg-opacity-70 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-black bg-opacity-70 text-white text-xs rounded">
                  Video
                </div>
              </div>
            ) : (
              <video
                className="w-full aspect-video"
                controls
                autoPlay
                onLoadedData={() => setImageLoaded(true)}
              >
                <source src={post.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        ) : (
          post.imageUrl && (
            <div className="relative">
              <img
                src={post.imageUrl}
                alt={post.title}
                className={clsx(
                  'w-full object-cover transition-opacity duration-300',
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                )}
                onLoad={() => setImageLoaded(true)}
                loading="lazy"
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              )}
            </div>
          )
        )}
      </div>

      {/* Actions Bar */}
      <div className="p-4 pt-3">
        <div className="flex items-center justify-between">
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
            <span className="text-sm font-semibold text-gray-700 min-w-[40px] text-center">
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
            <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{post.commentsCount}</span>
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <Share className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;