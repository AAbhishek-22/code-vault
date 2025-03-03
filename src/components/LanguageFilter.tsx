import React from 'react';
import { Language } from '../types';

interface LanguageFilterProps {
  selectedLanguage: Language | 'all';
  onLanguageChange: (language: Language | 'all') => void;
}

const LanguageFilter: React.FC<LanguageFilterProps> = ({ selectedLanguage, onLanguageChange }) => {
  return (
    <div className="flex space-x-2 mb-4">
      <button
        onClick={() => onLanguageChange('all')}
        className={`px-3 py-1.5 rounded-md transition-colors ${
          selectedLanguage === 'all'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
        }`}
      >
        All
      </button>
      <button
        onClick={() => onLanguageChange('javascript')}
        className={`px-3 py-1.5 rounded-md transition-colors ${
          selectedLanguage === 'javascript'
            ? 'bg-yellow-500 text-white'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
        }`}
      >
        JavaScript
      </button>
      <button
        onClick={() => onLanguageChange('go')}
        className={`px-3 py-1.5 rounded-md transition-colors ${
          selectedLanguage === 'go'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
        }`}
      >
        Go
      </button>
    </div>
  );
};

export default LanguageFilter;