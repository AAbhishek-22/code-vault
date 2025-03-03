import React from 'react';
import { CodeSolution } from '../types';
import SolutionItem from './SolutionItem';

interface SolutionListProps {
  solutions: CodeSolution[];
  onEdit: (solution: CodeSolution) => void;
  onDelete: (solutionId: string) => void;
}

const SolutionList: React.FC<SolutionListProps> = ({ solutions, onEdit, onDelete }) => {
  return (
    <div>
      {solutions.length > 0 ? (
        solutions.map(solution => (
          <SolutionItem 
            key={solution.id} 
            solution={solution} 
            onEdit={() => onEdit(solution)}
            onDelete={() => onDelete(solution.id)}
          />
        ))
      ) : (
        <p className="text-gray-500 italic">No solutions available for the selected language.</p>
      )}
    </div>
  );
};

export default SolutionList;