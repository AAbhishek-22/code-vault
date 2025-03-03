import React, { useState } from 'react';
import { CodeSolution } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface SolutionEditorProps {
  solution?: CodeSolution;
  questionId: string;
  onSave: (solution: CodeSolution) => void;
  onCancel: () => void;
}

const SolutionEditor: React.FC<SolutionEditorProps> = ({ 
  solution, 
  questionId, 
  onSave, 
  onCancel 
}) => {
  const [approach, setApproach] = useState(solution?.approach || '');
  const [language, setLanguage] = useState(solution?.language || 'javascript');
  const [code, setCode] = useState(solution?.code || '');
  const [timeComplexity, setTimeComplexity] = useState(solution?.timeComplexity || '');
  const [spaceComplexity, setSpaceComplexity] = useState(solution?.spaceComplexity || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedSolution: CodeSolution = {
      id: solution?.id || uuidv4(),
      approach,
      language: language as 'javascript' | 'go',
      code,
      timeComplexity: timeComplexity || undefined,
      spaceComplexity: spaceComplexity || undefined,
    };
    
    onSave(updatedSolution);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Approach
          </label>
          <input
            type="text"
            value={approach}
            onChange={(e) => setApproach(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Brute Force, Dynamic Programming, etc."
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'javascript' | 'go')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="javascript">JavaScript</option>
            <option value="go">Go</option>
          </select>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Code
        </label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={10}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time Complexity
          </label>
          <input
            type="text"
            value={timeComplexity}
            onChange={(e) => setTimeComplexity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="O(n), O(n²), etc."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Space Complexity
          </label>
          <input
            type="text"
            value={spaceComplexity}
            onChange={(e) => setSpaceComplexity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="O(1), O(n), etc."
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default SolutionEditor;