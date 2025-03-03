import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import QuestionList from './components/QuestionList';
import LanguageFilter from './components/LanguageFilter';
import { sampleQuestions } from './data/sampleData';
import { Language, PracticeQuestion } from './types';
import QuestionEditor from './components/QuestionEditor';
import { Plus } from 'lucide-react';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | 'all'>('all');
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);

  // Load questions from localStorage or use sample data
  useEffect(() => {
    const savedQuestions = localStorage.getItem('codeVaultQuestions');
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    } else {
      setQuestions(sampleQuestions);
    }
  }, []);

  // Save questions to localStorage whenever they change
  useEffect(() => {
    if (questions.length > 0) {
      localStorage.setItem('codeVaultQuestions', JSON.stringify(questions));
    }
  }, [questions]);

  const handleAddQuestion = (newQuestion: PracticeQuestion) => {
    setQuestions([...questions, newQuestion]);
    setIsAddingQuestion(false);
  };

  const handleUpdateQuestion = (updatedQuestion: PracticeQuestion) => {
    setQuestions(
      questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
    setEditingQuestionId(null);
  };

  const handleDeleteQuestion = (questionId: string) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      setQuestions(questions.filter((q) => q.id !== questionId));
    }
  };

  const handleAddSolution = (questionId: string, newSolution: any) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            solutions: [...q.solutions, newSolution],
          };
        }
        return q;
      })
    );
  };

  const handleUpdateSolution = (questionId: string, updatedSolution: any) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            solutions: q.solutions.map((s) =>
              s.id === updatedSolution.id ? updatedSolution : s
            ),
          };
        }
        return q;
      })
    );
  };

  const handleDeleteSolution = (questionId: string, solutionId: string) => {
    if (window.confirm('Are you sure you want to delete this solution?')) {
      setQuestions(
        questions.map((q) => {
          if (q.id === questionId) {
            return {
              ...q,
              solutions: q.solutions.filter((s) => s.id !== solutionId),
            };
          }
          return q;
        })
      );
    }
  };

  const currentlyEditingQuestion = questions.find(q => q.id === editingQuestionId);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="container mx-auto py-8 px-4 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Coding Practice</h2>
              <p className="text-gray-600">
                Expand questions to view solutions in JavaScript and Go. Practice and review different approaches.
              </p>
            </div>
            <button
              onClick={() => setIsAddingQuestion(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              <Plus size={18} className="mr-1" />
              Add Question
            </button>
          </div>
          
          {isAddingQuestion && (
            <div className="mb-6">
              <QuestionEditor
                onSave={handleAddQuestion}
                onCancel={() => setIsAddingQuestion(false)}
              />
            </div>
          )}

          {editingQuestionId && (
            <div className="mb-6">
              <QuestionEditor
                question={currentlyEditingQuestion}
                onSave={handleUpdateQuestion}
                onCancel={() => setEditingQuestionId(null)}
              />
            </div>
          )}
          
          <LanguageFilter 
            selectedLanguage={selectedLanguage} 
            onLanguageChange={setSelectedLanguage} 
          />
          
          <QuestionList 
            questions={questions} 
            selectedLanguage={selectedLanguage}
            onEdit={setEditingQuestionId}
            onDelete={handleDeleteQuestion}
            onAddSolution={handleAddSolution}
            onUpdateSolution={handleUpdateSolution}
            onDeleteSolution={handleDeleteSolution}
          />
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p className="text-sm">CodeVault - Your Coding Practice Companion</p>
      </footer>
    </div>
  );
}

export default App;