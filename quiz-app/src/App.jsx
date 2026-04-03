import { useState } from 'react'
import './App.css'
import { quizSections } from './quizData'
import Sidebar from './components/Sidebar'
import QuizView from './components/QuizView'

function App() {
  const sectionNames = Object.keys(quizSections).sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true })
  );
  const [activeSection, setActiveSection] = useState(sectionNames[0] || '');
  const [activeQuizId, setActiveQuizId] = useState(null);

  const activeQuiz = activeQuizId && activeSection
    ? quizSections[activeSection]?.find((q) => q.quizId === activeQuizId)
    : null;

  function handleSelectQuiz(section, quizId) {
    setActiveSection(section);
    setActiveQuizId(quizId);
  }

  const totalQuizzes = Object.values(quizSections).reduce((sum, qs) => sum + qs.length, 0);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar
        sections={quizSections}
        activeSection={activeSection}
        activeQuizId={activeQuizId}
        onSelectQuiz={handleSelectQuiz}
      />

      <div className="flex-1 min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Quiz Runner</h1>
          <p className="text-gray-500 mt-1">
            {sectionNames.length} section{sectionNames.length !== 1 ? 's' : ''} &middot;{' '}
            {totalQuizzes} quiz{totalQuizzes !== 1 ? 'zes' : ''}
          </p>

          {/* Mobile section picker */}
          <div className="mt-4 md:hidden">
            <select
              value={activeQuizId ? `${activeSection}::${activeQuizId}` : ''}
              onChange={(e) => {
                const [sec, qid] = e.target.value.split('::');
                handleSelectQuiz(sec, qid);
              }}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium bg-white"
            >
              <option value="">Select a quiz...</option>
              {sectionNames.map((name) =>
                quizSections[name].map((quiz) => (
                  <option key={`${name}::${quiz.quizId}`} value={`${name}::${quiz.quizId}`}>
                    {quiz.quizId} — {quiz.title}
                  </option>
                ))
              )}
            </select>
          </div>
        </header>

        {/* Content */}
        <main className="p-8">
          {activeQuiz ? (
            <QuizView key={`${activeSection}-${activeQuizId}`} quiz={activeQuiz} />
          ) : (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">Select a quiz from the sidebar to get started.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
