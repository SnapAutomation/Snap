import React from 'react';
import { Flame, TrendingUp, Clock } from 'lucide-react';
import clsx from 'clsx';

interface BottomNavigationProps {
  activeTab: 'hot' | 'trending' | 'fresh';
  onTabChange: (tab: 'hot' | 'trending' | 'fresh') => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'hot' as const, label: 'Hot', icon: Flame },
    { id: 'trending' as const, label: 'Trending', icon: TrendingUp },
    { id: 'fresh' as const, label: 'Fresh', icon: Clock },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-pb">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={clsx(
                'flex flex-col items-center space-y-1 py-2 px-4 rounded-lg transition-all duration-200',
                activeTab === id
                  ? 'text-orange-500'
                  : 'text-gray-400 hover:text-gray-600'
              )}
            >
              <Icon 
                className={clsx(
                  'w-6 h-6 transition-all duration-200',
                  activeTab === id && 'scale-110'
                )} 
              />
              <span 
                className={clsx(
                  'text-xs transition-all duration-200',
                  activeTab === id ? 'font-semibold' : 'font-medium'
                )}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;