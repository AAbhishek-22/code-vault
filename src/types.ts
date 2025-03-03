export interface CodeSolution {
  id: string;
  approach: string;
  code: string;
  language: 'javascript' | 'go';
  timeComplexity?: string;
  spaceComplexity?: string;
}

export interface PracticeQuestion {
  id: string;
  title: string;
  emoji: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  solutions: CodeSolution[];
}

export type Language = 'javascript' | 'go';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface EditableQuestionProps {
  question?: PracticeQuestion;
  onSave: (question: PracticeQuestion) => void;
  onCancel: () => void;
}

export interface EditableSolutionProps {
  solution?: CodeSolution;
  questionId: string;
  onSave: (solution: CodeSolution) => void;
  onCancel: () => void;
}