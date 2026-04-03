const STORAGE_KEY_PREFIX = 'quiz_stats_';

export function getQuizStats(quizId) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PREFIX + quizId);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore parse errors */ }
  return { attempts: 0, maxScore: null, latestScore: null };
}

export function saveQuizAttempt(quizId, score) {
  const stats = getQuizStats(quizId);
  stats.attempts += 1;
  stats.latestScore = score;

  if (
    !stats.maxScore ||
    score.correct > stats.maxScore.correct ||
    (score.correct === stats.maxScore.correct && score.wrong < stats.maxScore.wrong)
  ) {
    stats.maxScore = score;
  }

  localStorage.setItem(STORAGE_KEY_PREFIX + quizId, JSON.stringify(stats));
  return stats;
}
