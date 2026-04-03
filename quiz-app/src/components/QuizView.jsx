import { useState, useCallback } from 'react';
import QuizForm from './QuizForm';
import { getQuizStats, saveQuizAttempt } from '../quizStats';

export default function QuizView({ quiz }) {
  const [stats, setStats] = useState(() => getQuizStats(quiz.quizId));
  const [results, setResults] = useState({});

  const handleResult = useCallback((questionId, isCorrect) => {
    if (isCorrect === null) {
      setResults((prev) => {
        const next = { ...prev };
        delete next[questionId];
        return next;
      });
    } else {
      setResults((prev) => ({ ...prev, [questionId]: isCorrect }));
    }
  }, []);

  function handleFinishQuiz() {
    const total = quiz.questions.length;
    const answered = Object.keys(results).length;
    const correct = Object.values(results).filter(Boolean).length;
    const wrong = answered - correct;
    const unanswered = total - answered;

    const score = { correct, wrong, unanswered };
    const newStats = saveQuizAttempt(quiz.quizId, score);
    setStats(newStats);
  }

  const answeredCount = Object.keys(results).length;
  const totalCount = quiz.questions.length;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
        <span className="font-mono text-lg text-indigo-600">{quiz.quizId}</span>
        {quiz.title}
      </h2>

      {/* Stats bar */}
      {stats.attempts > 0 && (
        <div className="flex flex-wrap gap-4 mb-6 p-3 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
          <span>Attempts: <strong>{stats.attempts}</strong></span>
          {stats.maxScore && (
            <span>
              Best:{' '}
              <strong className="text-emerald-600">{stats.maxScore.correct}&#10003;</strong>{' '}
              <strong className="text-red-500">{stats.maxScore.wrong}&#10007;</strong>{' '}
              <strong className="text-gray-400">{stats.maxScore.unanswered} skipped</strong>
            </span>
          )}
          {stats.latestScore && (
            <span>
              Latest:{' '}
              <strong className="text-emerald-600">{stats.latestScore.correct}&#10003;</strong>{' '}
              <strong className="text-red-500">{stats.latestScore.wrong}&#10007;</strong>{' '}
              <strong className="text-gray-400">{stats.latestScore.unanswered} skipped</strong>
            </span>
          )}
        </div>
      )}

      <p className="text-sm text-gray-500 mb-6">
        {totalCount} question{totalCount !== 1 ? 's' : ''} &middot;{' '}
        {answeredCount}/{totalCount} answered
      </p>

      <div className="space-y-6">
        {quiz.questions.map((question, idx) => (
          <QuizForm
            key={`${quiz.quizId}-${question.id}`}
            quiz={question}
            fileName={`Q${idx + 1}`}
            onResult={handleResult}
          />
        ))}
      </div>

      <div className="mt-8 flex items-center gap-4">
        <button
          type="button"
          onClick={handleFinishQuiz}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
        >
          Finish Quiz &amp; Record Score
        </button>
        {answeredCount < totalCount && (
          <span className="text-sm text-gray-400">
            {totalCount - answeredCount} question{totalCount - answeredCount !== 1 ? 's' : ''} unanswered
          </span>
        )}
      </div>
    </section>
  );
}
