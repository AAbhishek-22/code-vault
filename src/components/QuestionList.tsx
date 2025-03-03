import React from 'react';
import { PracticeQuestion, CodeSolution } from '../types';
import QuestionCard from './QuestionCard';

interface QuestionListProps {
  questions: PracticeQuestion[];
  selectedLanguage: 'javascript' | 'go' | 'all';
  onEdit: (questionId: string) => void;
  onDelete: (questionId: string) => void;
  onAddSolution: (questionId: string, solution: CodeSolution) => void;
  onUpdateSolution: (questionId: string, solution: CodeSolution) => void;
  onDeleteSolution: (questionId: string, solutionId: string) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({ 
  questions, 
  selectedLanguage,
  onEdit,
  onDelete,
  onAddSolution,
  onUpdateSolution,
  onDeleteSolution
}) => {
  if (questions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">No questions available. Add your first question!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map(question => (
        <QuestionCard 
          key={question.id} 
          question={question} 
          selectedLanguage={selectedLanguage}
          onEdit={() => onEdit(question.id)}
          onDelete={() => onDelete(question.id)}
          onAddSolution={(solution) => onAddSolution(question.id, solution)}
          onUpdateSolution={(solution) => onUpdateSolution(question.id, solution)}
          onDeleteSolution={(solutionId) => onDeleteSolution(question.id, solutionId)}
        />
      ))}
    </div>
  );
};

export default QuestionList;