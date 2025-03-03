import React from 'react';
import { Code2, BookOpen } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Code2 size={28} className="text-white" />
          <h1 className="text-2xl font-bold">CodeVault</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-md transition-colors">
            <BookOpen size={18} />
            <span>Practice</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;