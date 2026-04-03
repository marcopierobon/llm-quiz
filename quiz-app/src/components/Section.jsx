import QuizForm from './QuizForm';

function formatSectionName(name) {
  // "chapter3" -> "Chapter 3", "my_section" -> "My Section"
  return name
    .replace(/([a-z])(\d)/g, '$1 $2')
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Section({ name, quizzes }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <span className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center text-lg font-bold">
          {name.replace(/\D/g, '') || name[0]?.toUpperCase()}
        </span>
        {formatSectionName(name)}
      </h2>
      <div className="space-y-6">
        {quizzes.map((quiz) => (
          <QuizForm key={quiz.fileName} quiz={quiz.data} fileName={quiz.fileName} />
        ))}
      </div>
    </section>
  );
}
