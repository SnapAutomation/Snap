import React from 'react';
import { Search, Menu, Flame } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {/* Menu Button */}
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">9GAG</h1>
        </div>

        {/* Search Button */}
        <button 
          onClick={onOpenSearch}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Search className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </header>
  );
};

export default Header;