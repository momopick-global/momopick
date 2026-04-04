"use client";

import { useCallback, useMemo, useState } from "react";
import { getQuizUiStrings, type QuizUiLocale } from "@/i18n/quiz-ui";
import type { SnackQuizDefinition } from "./types";

function emptyCounts(keys: string[]): Record<string, number> {
  return Object.fromEntries(keys.map((k) => [k, 0]));
}

export function SnackQuiz({
  definition,
  locale = "ko",
}: {
  definition: SnackQuizDefinition;
  /** 고정 UI(다시 하기·질문 n/t) 언어. 라우트 세그먼트와 맞출 것 */
  locale?: QuizUiLocale;
}) {
  const ui = getQuizUiStrings(locale);
  const { resultKeys, results, blend, questions, footnote } = definition;

  const [step, setStep] = useState(0);
  const [counts, setCounts] = useState<Record<string, number>>(() => emptyCounts(resultKeys));
  const [done, setDone] = useState(false);

  const total = questions.length;
  const progress = useMemo(
    () => (done ? 100 : Math.round((step / total) * 100)),
    [done, step, total],
  );

  const pick = useCallback(
    (key: string) => {
      if (!resultKeys.includes(key)) return;
      const nextCounts = { ...counts, [key]: (counts[key] ?? 0) + 1 };
      if (step >= total - 1) {
        setCounts(nextCounts);
        setDone(true);
        return;
      }
      setCounts(nextCounts);
      setStep((s) => s + 1);
    },
    [counts, resultKeys, step, total],
  );

  const restart = useCallback(() => {
    setStep(0);
    setCounts(emptyCounts(resultKeys));
    setDone(false);
  }, [resultKeys]);

  if (done) {
    const maxScore = Math.max(...resultKeys.map((k) => counts[k] ?? 0));
    const leaders = resultKeys.filter((k) => (counts[k] ?? 0) === maxScore);
    const isBlend = leaders.length > 1;
    const singleKey = !isBlend && leaders[0] ? leaders[0] : null;
    const single = singleKey ? results[singleKey] : null;

    return (
      <div className="quiz-shell">
        <div className="quiz-result-card">
          <p className="quiz-result-emoji" aria-hidden="true">
            {isBlend ? blend.emoji : single?.emoji}
          </p>
          <h2 className="quiz-result-title">{isBlend ? blend.title : single?.title}</h2>
          <p className="quiz-result-tagline">
            {isBlend ? blend.tagline : single?.tagline}
          </p>
          <p className="quiz-result-body">{isBlend ? blend.body : single?.body}</p>
          <div className="quiz-result-actions">
            <button type="button" className="btn primary sm" onClick={restart}>
              {ui.restart}
            </button>
          </div>
          <p className="quiz-footnote">{footnote}</p>
        </div>
      </div>
    );
  }

  const q = questions[step];
  return (
    <div className="quiz-shell">
      <div className="quiz-progress-wrap" aria-hidden="true">
        <div className="quiz-progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <p className="quiz-step-label">{ui.formatQuestionStep(step + 1, total)}</p>
      <h2 className="quiz-q">{q.prompt}</h2>
      <ul className="quiz-options" role="list">
        {q.options.map((o) => (
          <li key={o.label}>
            <button type="button" className="quiz-opt" onClick={() => pick(o.key)}>
              {o.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
