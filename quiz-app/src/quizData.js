const quizModules = import.meta.glob(['./quiz/*.json', './quiz/**/*.json'], { eager: true });

function buildQuizData() {
  const sections = {};

  for (const [path, module] of Object.entries(quizModules)) {
    const parts = path.replace('./quiz/', '').split('/');
    let sectionName, fileName;

    if (parts.length > 1) {
      // Subdirectory structure: ./quiz/chapter3/3_01.json
      sectionName = parts[0];
      fileName = parts[parts.length - 1].replace('.json', '');
    } else {
      // Flat structure: ./quiz/3_01.json
      fileName = parts[0].replace('.json', '');
      const chapterNum = fileName.split('_')[0];
      sectionName = `chapter${chapterNum}`;
    }

    // Skip sample or non-quiz files
    if (fileName === 'sample') continue;

    const raw = module.default || module;
    const questions = Array.isArray(raw) ? raw : [raw];

    // Skip files without proper question structure
    if (!questions[0]?.tags) continue;

    // Extract title from first tag of first question
    const title = questions[0].tags[0] || fileName;
    // Extract quizId from second tag of first question
    const quizId = questions[0].tags[1] || fileName;

    if (!sections[sectionName]) {
      sections[sectionName] = [];
    }

    sections[sectionName].push({
      quizId,
      title,
      fileName,
      questions,
    });
  }

  // Sort quizzes within each section by quizId
  for (const section of Object.values(sections)) {
    section.sort((a, b) => a.quizId.localeCompare(b.quizId, undefined, { numeric: true }));
  }

  return sections;
}

export const quizSections = buildQuizData();
