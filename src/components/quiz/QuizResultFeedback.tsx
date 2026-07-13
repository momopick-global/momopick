"use client";

import { useEffect, useState } from "react";
import type { QuizUiStrings } from "@/i18n/quiz-ui";
import { increaseQuizCount } from "@/lib/quizStatsSupabase";

/** localStorage — 퀴즈별 결과 만족도 투표 기록 (재투표 방지) */
const FEEDBACK_STORAGE_KEY = "momopick:quiz-feedback:v1";

type FeedbackVote = "fit" | "miss";

function readVotes(): Record<string, FeedbackVote> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(FEEDBACK_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object") {
      return parsed as Record<string, FeedbackVote>;
    }
  } catch {
    /* 무시 — 손상된 값은 새로 시작 */
  }
  return {};
}

function writeVote(quizSlug: string, vote: FeedbackVote): void {
  if (typeof window === "undefined") return;
  try {
    const votes = readVotes();
    votes[quizSlug] = vote;
    window.localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(votes));
  } catch {
    /* 저장 실패는 치명적이지 않음 */
  }
}

/**
 * 결과 만족도 위젯 — "잘 맞아요 / 안 맞아요".
 * 집계는 기존 `quiz_stats` 테이블을 재사용해 `{slug}__fb_fit` / `{slug}__fb_miss` 행에
 * best-effort로 +1 한다(실패해도 UI는 정상 동작). 퀴즈당 1회만 투표(localStorage).
 */
export function QuizResultFeedback({
  quizSlug,
  ui,
}: {
  quizSlug: string;
  ui: QuizUiStrings;
}) {
  const [vote, setVote] = useState<FeedbackVote | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setVote(readVotes()[quizSlug] ?? null);
    setHydrated(true);
  }, [quizSlug]);

  const cast = (v: FeedbackVote) => {
    if (vote) return;
    setVote(v);
    writeVote(quizSlug, v);
    // Supabase 집계는 결과 화면을 막지 않도록 fire-and-forget
    void increaseQuizCount(`${quizSlug}__fb_${v}`).catch(() => {});
  };

  // 하이드레이션 전에는 자리만 유지 (깜빡임 방지)
  if (!hydrated) {
    return <div className="quiz-result-feedback" aria-hidden="true" />;
  }

  return (
    <div className="quiz-result-feedback" role="group" aria-label={ui.feedbackPrompt}>
      {vote ? (
        <p className="quiz-result-feedback__thanks">{ui.feedbackThanks}</p>
      ) : (
        <>
          <p className="quiz-result-feedback__prompt">{ui.feedbackPrompt}</p>
          <div className="quiz-result-feedback__row">
            <button
              type="button"
              className="quiz-result-feedback__btn quiz-result-feedback__btn--fit"
              onClick={() => cast("fit")}
            >
              👍 {ui.feedbackFit}
            </button>
            <button
              type="button"
              className="quiz-result-feedback__btn quiz-result-feedback__btn--miss"
              onClick={() => cast("miss")}
            >
              🤔 {ui.feedbackMiss}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
