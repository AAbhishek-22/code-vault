import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Edit, Trash2, Plus } from 'lucide-react';
import { PracticeQuestion, CodeSolution } from '../types';
import SolutionList from './SolutionList';
import SolutionEditor from './SolutionEditor';

interface QuestionCardProps {
  question: PracticeQuestion;
  selectedLanguage: 'javascript' | 'go' | 'all';
  onEdit: () => void;
  onDelete: () => void;
  onAddSolution: (solution: CodeSolution) => void;
  onUpdateSolution: (solution: CodeSolution) => void;
  onDeleteSolution: (solutionId: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  selectedLanguage,
  onEdit,
  onDelete,
  onAddSolution,
  onUpdateSolution,
  onDeleteSolution
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAddingSolution, setIsAddingSolution] = useState(false);

  const filteredSolutions = selectedLanguage === 'all'
    ? question.solutions
    : question.solutions.filter(solution => solution.language === selectedLanguage);

  const difficultyColor = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800'
  }[question.difficulty];

  const handleAddSolution = (solution: CodeSolution) => {
    onAddSolution(solution);
    setIsAddingSolution(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 transition-all duration-300">
      <div className="p-4 flex justify-between items-center">
        <div 
          className="flex items-center space-x-3 cursor-pointer flex-grow"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="text-2xl">{question.emoji}</span>
          <div>
            <h3 className="text-lg font-semibold">{question.title}</h3>
            <div className="flex mt-1 space-x-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColor}`}>
                {question.difficulty}
              </span>
              {question.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-full transition-colors"
            title="Edit question"
          >
            <Edit size={18} />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full transition-colors"
            title="Delete question"
          >
            <Trash2 size={18} />
          </button>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="border-t border-gray-200 p-4">
          <p className="text-gray-700 mb-4">{question.description}</p>
          
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-lg font-medium">Solutions</h4>
            <button
              onClick={() => setIsAddingSolution(true)}
              className="flex items-center space-x-1 text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-md transition-colors"
            >
              <Plus size={16} />
              <span>Add Solution</span>
            </button>
          </div>
          
          {isAddingSolution && (
            <div className="mb-4 p-4 border border-gray-200 rounded-md bg-gray-50">
              <SolutionEditor
                questionId={question.id}
                onSave={handleAddSolution}
                onCancel={() => setIsAddingSolution(false)}
              />
            </div>
          )}
          
          <SolutionList 
            solutions={filteredSolutions} 
            onEdit={onUpdateSolution}
            onDelete={onDeleteSolution}
          />
        </div>
      )}
    </div>
  );
};

export default QuestionCard;