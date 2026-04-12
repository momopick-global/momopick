"use client";

import type { QuizUiStrings } from "@/i18n/quiz-ui";

export function QuizResultLoadingScreen({ ui }: { ui: QuizUiStrings }) {
  return (
    <div
      className="quiz-shell quiz-shell--result-loading"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="quiz-result-loading">
        <div className="quiz-result-loading-spinner" aria-hidden="true" />
        <p className="quiz-result-loading-title">{ui.quizResultLoadingTitle}</p>
      </div>
    </div>
  );
}
