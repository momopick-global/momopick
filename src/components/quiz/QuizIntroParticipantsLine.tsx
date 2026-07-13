"use client";

import { useEffect, useState } from "react";
import type { QuizUiStrings } from "@/i18n/quiz-ui";
import { initQuizCount } from "@/lib/quizStatsSupabase";

/**
 * 참여 수 표시 전용 라인 — 인트로가 없는 화면(원픽·퍼센트형 인트로)용.
 * 집계 행이 아직 없거나 0이면 렌더하지 않는다("0명 참여" 노출 방지).
 */
export function QuizIntroParticipantsLine({
  quizId,
  ui,
  className,
}: {
  quizId: string;
  ui: QuizUiStrings;
  className?: string;
}) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    void initQuizCount(quizId, (n) => {
      if (!cancelled) setCount(n);
    });
    return () => {
      cancelled = true;
    };
  }, [quizId]);

  if (count === null || count <= 0) return null;

  return (
    <p
      className={`quiz-intro-participants${className ? ` ${className}` : ""}`}
      aria-live="polite"
    >
      {ui.formatLiveParticipantLine(count)}
    </p>
  );
}
