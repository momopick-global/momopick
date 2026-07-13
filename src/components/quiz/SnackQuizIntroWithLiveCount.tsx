"use client";

import { getQuizUiStrings, type QuizUiLocale } from "@/i18n/quiz-ui";
import { useQuizParticipantCount } from "@/hooks/useQuizParticipantCount";
import { QuizPackTags } from "./QuizPackTags";
import { QuizResultShare } from "./QuizResultShare";
import type { SnackQuizText } from "./types";

type Props = {
  quizId: string;
  locale: QuizUiLocale;
  questionTotal: number;
  onStarted: () => void;
  tags?: SnackQuizText[];
  shareText: string;
  shareImageUrl?: string;
};

/**
 * Supabase `quiz_stats` 연동 인트로 — 훅은 이 컴포넌트 안에서만 호출(조건부 훅 방지).
 */
export function SnackQuizIntroWithLiveCount({
  quizId,
  locale,
  questionTotal,
  onStarted,
  tags,
  shareText,
  shareImageUrl,
}: Props) {
  const ui = getQuizUiStrings(locale);
  const { count: participantCount, registerStart } = useQuizParticipantCount(quizId);

  return (
    <div className="quiz-intro">
      <div className="quiz-intro-actions">
        <button
          type="button"
          className="btn primary quiz-intro-start"
          onClick={() => {
            // 집계는 fire-and-forget — 네트워크 지연이 시작을 막지 않게
            void registerStart();
            onStarted();
          }}
        >
          {ui.startTest}
        </button>
      </div>
      <hr className="quiz-divider" />
      <QuizPackTags tags={tags} locale={locale} className="quiz-intro-tags" />
      <p className="quiz-intro-body">{ui.quizIntroBody(questionTotal)}</p>
      <div className="quiz-share-wrap quiz-share-wrap--intro">
        <QuizResultShare ui={ui} shareText={shareText} shareImageUrl={shareImageUrl} />
      </div>
      {participantCount === 0 ? null : (
        // 집계 행이 없어 0인 퀴즈는 "0명 참여"를 숨긴다 (역효과 방지)
        <p id="user-count" className="quiz-intro-participants" aria-live="polite">
          {ui.formatLiveParticipantLine(participantCount)}
        </p>
      )}
    </div>
  );
}
