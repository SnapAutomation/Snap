import React, { useState } from 'react';
import { Plus, Image, Video, Type, X } from 'lucide-react';
import clsx from 'clsx';

interface FloatingActionButtonProps {
  onCreateImage: () => void;
  onCreateText: () => void;
  onCreateVideo: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onCreateImage,
  onCreateText,
  onCreateVideo,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: Image, label: 'Image Meme', onClick: onCreateImage, color: 'bg-blue-500 hover:bg-blue-600' },
    { icon: Type, label: 'Text Post', onClick: onCreateText, color: 'bg-green-500 hover:bg-green-600' },
    { icon: Video, label: 'Video', onClick: onCreateVideo, color: 'bg-purple-500 hover:bg-purple-600' },
  ];

  const handleActionClick = (action: typeof actions[0]) => {
    action.onClick();
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-24 right-6 z-40">
      {/* Action Items */}
      <div className={clsx(
        'flex flex-col space-y-3 mb-4 transition-all duration-300',
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      )}>
        {actions.map((action, index) => (
          <div
            key={action.label}
            className="flex items-center space-x-3"
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            <span className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap">
              {action.label}
            </span>
            <button
              onClick={() => handleActionClick(action)}
              className={clsx(
                'w-12 h-12 rounded-full text-white shadow-lg transition-all duration-200 active:scale-95',
                action.color
              )}
            >
              <action.icon className="w-6 h-6 mx-auto" />
            </button>
          </div>
        ))}
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'w-14 h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-xl transition-all duration-300 active:scale-95',
          isOpen && 'rotate-45'
        )}
      >
        {isOpen ? (
          <X className="w-6 h-6 mx-auto" />
        ) : (
          <Plus className="w-6 h-6 mx-auto" />
        )}
      </button>
    </div>
  );
};

export default FloatingActionButton;