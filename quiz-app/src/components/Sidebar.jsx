import { useState } from 'react';

function formatSectionName(name) {
  return name
    .replace(/([a-z])(\d)/g, '$1 $2')
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Sidebar({ sections, activeSection, activeQuizId, onSelectQuiz }) {
  const sectionNames = Object.keys(sections).sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true })
  );
  const [expanded, setExpanded] = useState(() => {
    const init = {};
    sectionNames.forEach((name) => { init[name] = true; });
    return init;
  });

  function toggleSection(name) {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  }

  return (
    <nav className="w-72 flex-shrink-0 bg-gray-50 border-r border-gray-200 p-6 hidden md:block overflow-y-auto max-h-screen">
      <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
        Sections
      </h2>
      <div className="space-y-2">
        {sectionNames.map((name) => (
          <div key={name}>
            <button
              onClick={() => toggleSection(name)}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-xs font-bold text-gray-500">
                  {name.replace(/\D/g, '') || name[0]?.toUpperCase()}
                </span>
                {formatSectionName(name)}
              </span>
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform ${expanded[name] ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expanded[name] && (
              <ul className="ml-4 mt-1 space-y-0.5">
                {sections[name].map((quiz) => {
                  const isActive = activeSection === name && activeQuizId === quiz.quizId;
                  return (
                    <li key={quiz.quizId}>
                      <button
                        onClick={() => onSelectQuiz(name, quiz.quizId)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive
                            ? 'bg-indigo-100 text-indigo-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        <span className="font-mono text-xs text-gray-400 mr-1.5">{quiz.quizId}</span>
                        <span>{quiz.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
