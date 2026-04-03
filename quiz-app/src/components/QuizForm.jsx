import { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';

function Md({ children }) {
  return (
    <ReactMarkdown
      components={{
        pre({ children: preChildren }) {
          return (
            <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-2 text-sm font-mono leading-relaxed">
              {preChildren}
            </pre>
          );
        },
        code({ node, children: codeChildren, ...props }) {
          const isBlock = node?.position?.start?.line !== node?.position?.end?.line
            || node?.parent?.tagName === 'pre';
          if (!isBlock) {
            return (
              <code
                className="bg-gray-100 text-indigo-700 px-1.5 py-0.5 rounded text-sm font-mono"
                {...props}
              >
                {codeChildren}
              </code>
            );
          }
          return <code {...props}>{codeChildren}</code>;
        },
        p({ children: pChildren }) {
          return <span className="inline">{pChildren}</span>;
        },
        a({ href, children: aChildren }) {
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 underline hover:text-indigo-800"
            >
              {aChildren}
            </a>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function QuizForm({ quiz, fileName, onResult }) {
  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [shuffleKey, setShuffleKey] = useState(0);

  const shuffledOptions = useMemo(
    () => shuffleArray(quiz.options),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [quiz.options, shuffleKey]
  );

  const isMultiple = quiz.allowMultiple;

  function handleSelect(optionId) {
    if (submitted) return;

    if (isMultiple) {
      setSelected((prev) => ({
        ...prev,
        [optionId]: !prev[optionId],
      }));
    } else {
      setSelected({ [optionId]: true });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);

    const cc = quiz.options.filter((o) => o.isCorrect).length;
    const sc = quiz.options.filter((o) => o.isCorrect && selected[o.id]).length;
    const sw = quiz.options.filter((o) => !o.isCorrect && selected[o.id]).length;
    const isAllCorrect = sc === cc && sw === 0;

    if (onResult) {
      onResult(quiz.id, isAllCorrect);
    }
  }

  function handleReset() {
    setSelected({});
    setSubmitted(false);
    setShuffleKey((k) => k + 1);
    if (onResult) {
      onResult(quiz.id, null);
    }
  }

  const hasSelection = Object.values(selected).some(Boolean);

  const correctCount = quiz.options.filter((o) => o.isCorrect).length;
  const selectedCorrect = quiz.options.filter(
    (o) => o.isCorrect && selected[o.id]
  ).length;
  const selectedWrong = quiz.options.filter(
    (o) => !o.isCorrect && selected[o.id]
  ).length;
  const allCorrect =
    submitted && selectedCorrect === correctCount && selectedWrong === 0;

  const someCorrectMissed = isMultiple && selectedCorrect < correctCount;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
          {fileName}
        </span>
        {isMultiple && (
          <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
            Select all that apply
          </span>
        )}
        {quiz.tags?.map((tag) => (
          <span
            key={tag}
            className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="text-lg font-semibold text-gray-900 mb-4">
        <Md>{quiz.prompt}</Md>
      </div>

      <div className="space-y-3 mb-6">
        {shuffledOptions.map((option, idx) => {
          const isSelected = !!selected[option.id];
          const displayLetter = String.fromCharCode(65 + idx);
          const isMissedCorrect = submitted && someCorrectMissed && option.isCorrect && !isSelected;

          let borderColor = 'border-gray-200 hover:border-indigo-300';
          let bgColor = 'bg-white';
          let ringStyle = '';

          if (isSelected && !submitted) {
            borderColor = 'border-indigo-500';
            bgColor = 'bg-indigo-50';
            ringStyle = 'ring-2 ring-indigo-200';
          }

          if (submitted) {
            if (isMissedCorrect) {
              borderColor = 'border-red-500';
              bgColor = 'bg-red-50';
              ringStyle = '';
            } else if (option.isCorrect) {
              borderColor = 'border-emerald-500';
              bgColor = 'bg-emerald-50';
              ringStyle = isSelected ? 'ring-2 ring-emerald-200' : '';
            } else if (isSelected && !option.isCorrect) {
              borderColor = 'border-red-500';
              bgColor = 'bg-red-50';
              ringStyle = 'ring-2 ring-red-200';
            } else {
              borderColor = 'border-gray-200';
              bgColor = 'bg-white';
            }
          }

          return (
            <div key={option.id}>
              <button
                type="button"
                onClick={() => handleSelect(option.id)}
                disabled={submitted}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${borderColor} ${bgColor} ${ringStyle} ${
                  submitted ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                      isSelected
                        ? submitted
                          ? option.isCorrect
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'bg-red-500 border-red-500 text-white'
                          : 'bg-indigo-500 border-indigo-500 text-white'
                        : submitted
                        ? isMissedCorrect
                          ? 'border-red-500 text-red-600'
                          : option.isCorrect
                          ? 'border-emerald-500 text-emerald-600'
                          : 'border-gray-300 text-gray-400'
                        : 'border-gray-300 text-gray-400'
                    }`}
                  >
                    {submitted ? (
                      isSelected ? (
                        option.isCorrect ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )
                      ) : isMissedCorrect ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      ) : option.isCorrect ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        displayLetter
                      )
                    ) : (
                      displayLetter
                    )}
                  </span>
                  <span className="text-gray-800 font-medium">
                    <Md>{option.text}</Md>
                  </span>
                </div>
              </button>

              {submitted && (
                <div
                  className={`mt-1.5 ml-10 text-sm px-3 py-2 rounded-lg ${
                    isMissedCorrect
                      ? 'text-red-700 bg-red-50'
                      : option.isCorrect
                      ? 'text-emerald-700 bg-emerald-50'
                      : isSelected
                      ? 'text-red-700 bg-red-50'
                      : 'text-gray-500'
                  }`}
                >
                  {isMissedCorrect && <strong>Incorrect — you missed this answer. </strong>}
                  <Md>{option.feedback}</Md>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {submitted && (
        <div
          className={`mb-4 p-4 rounded-xl text-center font-semibold text-lg ${
            allCorrect
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {allCorrect
            ? `Correct! You got ${selectedCorrect}/${correctCount} right.`
            : `Incorrect. You got ${selectedCorrect}/${correctCount} correct and ${selectedWrong} wrong.`}
        </div>
      )}

      <div className="flex gap-3">
        {!submitted ? (
          <button
            type="submit"
            disabled={!hasSelection}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Submit Answer
          </button>
        ) : (
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </form>
  );
}
