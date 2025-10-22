import React from 'react';
import { Search, Flame, User } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenProfile: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSearch, onOpenProfile }) => {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 transition-colors">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {/* Profile Button */}
        <button 
          onClick={onOpenProfile}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <User className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>

        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">9GAG</h1>
        </div>

        {/* Search Button */}
        <button 
          onClick={onOpenSearch}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Search className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>
      </div>
    </header>
  );
};

export default Header;