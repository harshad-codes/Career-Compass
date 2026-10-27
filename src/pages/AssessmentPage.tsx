import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle, 
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { ASSESSMENT_QUESTIONS } from '../data/questions';
import { AssessmentAnswers } from '../types/assessment';
import { storage } from '../utils/storage';
import { calculateCareerAssessmentResults } from '../utils/assessmentEngine';
import { ActivePage } from '../components/layout/Navbar';

interface AssessmentPageProps {
  onNavigate: (page: ActivePage) => void;
  onAssessmentCompleted?: () => void;
}

export const AssessmentPage: React.FC<AssessmentPageProps> = ({ 
  onNavigate,
  onAssessmentCompleted
}) => {
  const existingAnswers = storage.getAssessmentAnswers() || {};
  const [answers, setAnswers] = useState<AssessmentAnswers>(existingAnswers);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    const handleStorage = () => {
      const a = storage.getAssessmentAnswers();
      if (a) setAnswers(a);
    };
    window.addEventListener('storage-update', handleStorage);
    return () => window.removeEventListener('storage-update', handleStorage);
  }, []);

  const currentQuestion = ASSESSMENT_QUESTIONS[currentQuestionIndex];
  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  const isCurrentAnswered = () => {
    const ans = answers[currentQuestion.id];
    if (!ans) return false;
    if (Array.isArray(ans)) return ans.length > 0;
    return typeof ans === 'string' && ans.trim().length > 0;
  };

  const handleSelectOption = (optionId: string) => {
    setValidationError(null);
    if (currentQuestion.type === 'single') {
      const updated = { ...answers, [currentQuestion.id]: optionId };
      setAnswers(updated);
      storage.setAssessmentAnswers(updated);
    } else {
      // Multi-select
      const currentSelection = (answers[currentQuestion.id] as string[]) || [];
      let updatedList: string[];
      if (currentSelection.includes(optionId)) {
        updatedList = currentSelection.filter(id => id !== optionId);
      } else {
        // limit to 2 for multi-selects to ensure balanced scoring
        if (currentSelection.length >= 2) {
          updatedList = [currentSelection[1], optionId];
        } else {
          updatedList = [...currentSelection, optionId];
        }
      }
      const updated = { ...answers, [currentQuestion.id]: updatedList };
      setAnswers(updated);
      storage.setAssessmentAnswers(updated);
    }
  };

  const handleNext = () => {
    if (!isCurrentAnswered()) {
      setValidationError('Please select an option before advancing to the next question.');
      return;
    }

    setValidationError(null);
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Final submission
      handleSubmitAssessment();
    }
  };

  const handlePrev = () => {
    setValidationError(null);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitAssessment = () => {
    // Verify all 10 questions have answers
    const unanswered = ASSESSMENT_QUESTIONS.filter(q => {
      const a = answers[q.id];
      if (!a) return true;
      if (Array.isArray(a)) return a.length === 0;
      return false;
    });

    if (unanswered.length > 0) {
      setValidationError(`Please answer all questions. (Question ${unanswered[0].id} is unanswered)`);
      setCurrentQuestionIndex(unanswered[0].id - 1);
      return;
    }

    // Calculate deterministic career profile
    const profile = storage.getProfile();
    const results = calculateCareerAssessmentResults(answers, profile?.interests);
    storage.setCareerResults(results);

    if (onAssessmentCompleted) onAssessmentCompleted();
    onNavigate('careers');
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 space-y-6 animate-fadeIn">
      {/* Header with Progress */}
      <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-500/20 rounded-xl text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white">Career Aptitude Assessment</h1>
              <p className="text-xs text-slate-400">10-Question Scientific Cognitive & Interest Evaluation</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-semibold text-slate-400">
            <span>Assessment Progress</span>
            <span className="text-indigo-400">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="p-6 sm:p-8 bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 px-2.5 py-0.5 rounded-md bg-indigo-500/15 border border-indigo-500/30">
              {currentQuestion.type === 'single' ? 'Single Choice' : 'Multi-Select (Choose up to 2)'}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
            {currentQuestion.question}
          </h2>
          {currentQuestion.subtitle && (
            <p className="text-xs text-slate-400 mt-1">{currentQuestion.subtitle}</p>
          )}
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {currentQuestion.options.map(opt => {
            const currentAnswer = answers[currentQuestion.id];
            const isSelected = Array.isArray(currentAnswer)
              ? currentAnswer.includes(opt.id)
              : currentAnswer === opt.id;

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-4 group ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-950/80 to-slate-900 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-indigo-600 border-indigo-500 text-white'
                      : 'border-slate-700 bg-slate-900 group-hover:border-slate-600'
                  }`}>
                    {isSelected ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <span className="text-[10px] font-mono text-slate-400">{opt.id.slice(-1).toUpperCase()}</span>
                    )}
                  </div>
                  <span className="text-xs sm:text-sm leading-relaxed">{opt.text}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Validation Warning */}
        {validationError && (
          <div className="p-3 bg-rose-950/40 border border-rose-500/40 rounded-xl flex items-center gap-2.5 text-xs text-rose-300 animate-shake">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Navigation Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-800">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${
              currentQuestionIndex === 0
                ? 'opacity-40 cursor-not-allowed text-slate-500'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition-all"
          >
            <span>{currentQuestionIndex === totalQuestions - 1 ? 'Complete Assessment' : 'Next Question'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
