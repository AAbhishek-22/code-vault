import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, Database, Edit, Trash2 } from 'lucide-react';
import { CodeSolution } from '../types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import SolutionEditor from './SolutionEditor';

interface SolutionItemProps {
  solution: CodeSolution;
  onEdit: () => void;
  onDelete: () => void;
}

const SolutionItem: React.FC<SolutionItemProps> = ({ solution, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const languageLabel = solution.language === 'javascript' ? 'JavaScript' : 'Go';
  const languageClass = solution.language === 'javascript' 
    ? 'bg-yellow-100 text-yellow-800' 
    : 'bg-blue-100 text-blue-800';

  if (isEditing) {
    return (
      <div className="border border-gray-200 rounded-md mb-3 overflow-hidden">
        <div className="p-3 bg-gray-50">
          <h4 className="font-medium mb-2">Edit Solution</h4>
          <SolutionEditor
            solution={solution}
            questionId=""
            onSave={(updatedSolution) => {
              onEdit();
              setIsEditing(false);
            }}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-md mb-3 overflow-hidden">
      <div className="p-3 bg-gray-50 flex justify-between items-center">
        <div 
          className="flex items-center space-x-2 cursor-pointer flex-grow"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className={`text-xs px-2 py-0.5 rounded-full ${languageClass}`}>
            {languageLabel}
          </span>
          <h4 className="font-medium">{solution.approach}</h4>
        </div>
        <div className="flex items-center space-x-1">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-full transition-colors"
            title="Edit solution"
          >
            <Edit size={16} />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full transition-colors"
            title="Delete solution"
          >
            <Trash2 size={16} />
          </button>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-3">
          <div className="mb-3 flex flex-wrap gap-3">
            {solution.timeComplexity && (
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Clock size={16} />
                <span>Time: {solution.timeComplexity}</span>
              </div>
            )}
            {solution.spaceComplexity && (
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Database size={16} />
                <span>Space: {solution.spaceComplexity}</span>
              </div>
            )}
          </div>
          
          <div className="rounded-md overflow-hidden">
            <SyntaxHighlighter 
              language={solution.language === 'javascript' ? 'javascript' : 'go'} 
              style={atomOneDark}
              showLineNumbers
              customStyle={{ margin: 0, borderRadius: '0.375rem' }}
            >
              {solution.code}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolutionItem;