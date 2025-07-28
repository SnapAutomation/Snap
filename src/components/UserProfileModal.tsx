import React, { useState } from 'react';
import { X, Settings, Award, TrendingUp, MessageCircle, ThumbsUp, Edit3, Share2, Calendar } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import clsx from 'clsx';

interface UserStats {
  postsCount: number;
  commentsCount: number;
  totalPoints: number;
  joinDate: string;
  achievements: string[];
}

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: string;
    username: string;
    avatar?: string;
    bio?: string;
  };
  stats: UserStats;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  stats,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState(user.bio || '');

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const achievements = [
    { id: 'first-post', name: 'First Post', icon: '🎯', description: 'Posted your first meme' },
    { id: 'viral', name: 'Viral Content', icon: '🔥', description: 'Got 1000+ points on a post' },
    { id: 'commenter', name: 'Social Butterfly', icon: '💬', description: 'Made 100+ comments' },
    { id: 'early-adopter', name: 'Early Adopter', icon: '⭐', description: 'Joined in the first month' },
  ];

  const statCards = [
    { label: 'Posts', value: stats.postsCount, icon: TrendingUp, color: 'text-blue-500' },
    { label: 'Comments', value: stats.commentsCount, icon: MessageCircle, color: 'text-green-500' },
    { label: 'Total Points', value: stats.totalPoints, icon: ThumbsUp, color: 'text-orange-500' },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white dark:bg-gray-900 w-full max-w-md mx-4 rounded-xl overflow-hidden animate-fade-in shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-orange-500 to-red-500 px-6 py-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Profile Info */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.username} className="w-full h-full rounded-full object-cover" />
                ) : (
                  user.username.charAt(0).toUpperCase()
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white">{user.username}</h2>
              <div className="flex items-center space-x-1 text-white/80 text-sm mt-1">
                <Calendar className="w-4 h-4" />
                <span>Joined {stats.joinDate}</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          {isEditing ? (
            <div className="mt-4">
              <textarea
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
                placeholder="Tell us about yourself..."
                className="w-full p-3 bg-white/20 text-white placeholder-white/60 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-white/50"
                rows={3}
              />
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    // Here you would save the bio
                  }}
                  className="px-4 py-2 bg-white text-orange-500 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedBio(user.bio || '');
                  }}
                  className="px-4 py-2 bg-white/20 text-white rounded-lg text-sm font-medium hover:bg-white/30 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <p className="text-white/90 text-sm leading-relaxed">
                {user.bio || 'No bio yet. Click edit to add one!'}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-2 flex items-center space-x-1 text-white/80 hover:text-white text-sm transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit bio</span>
              </button>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {[
            { key: 'profile', label: 'Profile', icon: Award },
            { key: 'settings', label: 'Settings', icon: Settings },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={clsx(
                'flex-1 flex items-center justify-center space-x-2 py-4 font-medium transition-colors',
                activeTab === key
                  ? 'text-orange-500 border-b-2 border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {activeTab === 'profile' ? (
            <div className="space-y-6">
              {/* Stats */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Statistics</h3>
                <div className="grid grid-cols-3 gap-4">
                  {statCards.map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className="text-center">
                      <div className={clsx('inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 mb-2', color)}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Achievements</h3>
                <div className="space-y-3">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={clsx(
                        'flex items-center space-x-3 p-3 rounded-lg transition-colors',
                        stats.achievements.includes(achievement.id)
                          ? 'bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800'
                          : 'bg-gray-50 dark:bg-gray-800 opacity-50'
                      )}
                    >
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">{achievement.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{achievement.description}</div>
                      </div>
                      {stats.achievements.includes(achievement.id) && (
                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button className="flex-1 flex items-center justify-center space-x-2 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span>Share Profile</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Theme Settings */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Appearance</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Theme</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Choose your preferred theme</div>
                  </div>
                  <ThemeToggle />
                </div>
              </div>

              {/* Notification Settings */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Notifications</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Comment replies', description: 'Get notified when someone replies to your comments' },
                    { label: 'Post reactions', description: 'Get notified when someone votes on your posts' },
                    { label: 'Trending posts', description: 'Get notified about trending content' },
                  ].map((setting) => (
                    <div key={setting.label} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">{setting.label}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{setting.description}</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Account Actions */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Account</h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                    Export Data
                  </button>
                  <button className="w-full text-left p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                    Privacy Settings
                  </button>
                  <button className="w-full text-left p-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;