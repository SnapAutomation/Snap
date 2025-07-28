import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import clsx from 'clsx';

const ThemeToggle: React.FC = () => {
  const { theme, actualTheme, setTheme } = useTheme();

  const themes = [
    { key: 'light' as const, icon: Sun, label: 'Light' },
    { key: 'dark' as const, icon: Moon, label: 'Dark' },
    { key: 'system' as const, icon: Monitor, label: 'System' },
  ];

  return (
    <div className="relative">
      <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 transition-colors">
        {themes.map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            onClick={() => setTheme(key)}
            className={clsx(
              'relative flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200',
              theme === key
                ? 'bg-white dark:bg-gray-700 text-orange-500 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            )}
            title={label}
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>
      
      {/* Current theme indicator */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
        <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
          {actualTheme}
        </span>
      </div>
    </div>
  );
};

export default ThemeToggle;